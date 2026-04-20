"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import type { AuthSession } from "@/lib/auth";
import { AppSidebar } from "@/components/app/app-sidebar";
import { useMarketplace } from "@/components/marketplace/marketplace-context";
import { ProfileEditor } from "@/components/profile/profile-editor";
import { ProfileHeader } from "@/components/profile/profile-header";
import { attachProductsToOrders, ProfileOrderList } from "@/components/profile/profile-order-list";
import { ProfileProductGrid } from "@/components/profile/profile-product-grid";
import { ProfileTabs, type ProfileTab } from "@/components/profile/profile-tabs";
import { marketplaceOrders } from "@/lib/mock/products";
import { creatorProfiles } from "@/lib/mock/profiles";
import { readOwnProfile, writeOwnProfile, type OwnProfileDraft } from "@/lib/profile-storage";
import { handleToSlug, sessionToHandle, slugToHandle } from "@/lib/profile-utils";

type ProfileShellProps = { profileSlug?: string; session: AuthSession };
const emptySubscribe = () => () => {};

export function ProfileShell({ profileSlug, session }: ProfileShellProps) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const initialOwnProfile = isClient ? readOwnProfile() ?? buildDefaultOwnProfile(session.name) : buildDefaultOwnProfile(session.name);

  return (
    <ProfileShellInner
      key={`${profileSlug ?? "own"}-${isClient ? "client" : "server"}`}
      initialOwnProfile={initialOwnProfile}
      profileSlug={profileSlug}
      session={session}
    />
  );
}

function ProfileShellInner({
  initialOwnProfile,
  profileSlug,
  session,
}: ProfileShellProps & { initialOwnProfile: OwnProfileDraft }) {
  const router = useRouter();
  const { bookmarks, cart, follows, products, toggleFollow } = useMarketplace();
  const ownHandle = sessionToHandle(session.name);
  const targetHandle = profileSlug ? slugToHandle(profileSlug) : ownHandle;
  const canEdit = targetHandle === ownHandle;
  const defaultOwn = useMemo(() => buildDefaultOwnProfile(session.name), [session.name]);
  const [ownProfile, setOwnProfile] = useState<OwnProfileDraft>(initialOwnProfile);
  const [tab, setTab] = useState<ProfileTab>("posts");
  const [editorOpen, setEditorOpen] = useState(false);
  const posts = products.filter((product) => product.creator.handle === targetHandle);
  const fallback = creatorProfiles.find((profile) => profile.handle === targetHandle);
  const derivedCreator = posts[0]?.creator;
  const profile = canEdit
    ? { handle: ownHandle, ...ownProfile }
    : {
        handle: targetHandle,
        displayName:
          fallback?.displayName ??
          derivedCreator?.name ??
          targetHandle.replace("@", ""),
        avatar: fallback?.avatar ?? derivedCreator?.avatar ?? defaultOwn.avatar,
        bio:
          fallback?.bio ??
          derivedCreator?.caption ??
          "Creator on Esdiac Marketplace.",
      };
  const saved = products.filter((product) => bookmarks[product.id]);
  const purchasedOrders = useMemo(
    () =>
      attachProductsToOrders(
        [
          ...marketplaceOrders.filter(
            (order) => order.buyerEmail.toLowerCase() === session.email.toLowerCase(),
          ),
          ...products
            .filter((product) => cart[product.id])
            .map((product) => ({
              id: `cart-${product.id}`,
              buyerEmail: session.email,
              buyerName: session.name,
              placedAt: "In cart",
              productId: product.id,
              quantity: cart[product.id],
              status: "Pending" as const,
              total: product.price * cart[product.id],
            })),
        ],
        products,
      ),
    [cart, products, session.email, session.name],
  );
  const sellerOrders = useMemo(() => {
    const seeded = marketplaceOrders.filter(
      (order) =>
        posts.some((product) => product.id === order.productId) &&
        order.buyerEmail.toLowerCase() !== session.email.toLowerCase(),
    );
    const generated = posts
      .filter((product) => !seeded.some((order) => order.productId === product.id))
      .slice(0, 6)
      .map((product, index) => ({
        id: `sale-${product.id}`,
        buyerEmail: `customer${index + 1}@example.com`,
        buyerName: ["Avery Cole", "Jordan Moss", "Taylor Reed", "Sam Gray", "Nova Stone", "Kai Brooks"][index % 6],
        placedAt: `Apr ${10 + index}, 2026`,
        productId: product.id,
        quantity: (index % 2) + 1,
        status: (index % 3 === 0 ? "Paid" : index % 3 === 1 ? "Shipped" : "Delivered") as const,
        total: product.price * ((index % 2) + 1),
      }));
    return attachProductsToOrders([...seeded, ...generated], products);
  }, [posts, products, session.email]);
  const tabs = canEdit
    ? [
        { id: "posts" as const, label: "My Posts" },
        { id: "saved" as const, label: "Saved" },
        { id: "purchases" as const, label: "My Orders" },
        { id: "sales" as const, label: "Customer Orders" },
      ]
    : [{ id: "posts" as const, label: "Posts" }];
  const followers = `${(posts.length * 7 + 38).toFixed(1)}K`;
  const following = `${(posts.length + 1) * 120}`;
  const totalLikes = `${Math.max(12, posts.reduce((sum, item) => sum + item.stats.likes, 0) / 1000).toFixed(1)}K`;

  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[94rem] gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]"><AppSidebar session={session} /></div>
        <div className="space-y-4">
          <ProfileHeader avatar={profile.avatar} bio={profile.bio} canEdit={canEdit} displayName={profile.displayName} followers={followers} following={following} followingCreator={Boolean(follows[targetHandle])} handle={targetHandle} likes={totalLikes} onCreatePost={() => router.push("/create")} onEdit={() => setEditorOpen(true)} onShare={async () => { const url = `/profile/${handleToSlug(targetHandle)}`; if (navigator.share) await navigator.share({ title: profile.displayName, text: `View ${profile.displayName}'s profile on Esdiac`, url }); else if (navigator.clipboard) await navigator.clipboard.writeText(url); }} onToggleFollow={() => toggleFollow(targetHandle)} />
          <section className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-6 sm:p-7">
            <ProfileTabs active={tab} onChange={setTab} tabs={tabs} />
            <div className="mt-5">
              {tab === "posts" ? <ProfileProductGrid empty="No posts yet." products={posts} /> : null}
              {tab === "saved" ? <ProfileProductGrid empty="No saved items yet." products={saved} /> : null}
              {tab === "purchases" ? <ProfileOrderList empty="No orders yet." orders={purchasedOrders} title="ORDER YOU MADE" /> : null}
              {tab === "sales" ? <ProfileOrderList empty="No customer orders on your products yet." orders={sellerOrders} title="ORDER ON YOUR PRODUCT" /> : null}
            </div>
          </section>
        </div>
      </div>
      {canEdit ? <ProfileEditor initial={ownProfile} onClose={() => setEditorOpen(false)} onSave={(next) => { setOwnProfile(next); writeOwnProfile(next); setEditorOpen(false); }} open={editorOpen} /> : null}
    </section>
  );
}

function buildDefaultOwnProfile(name: string): OwnProfileDraft {
  return {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    bio: "Digital creator and commerce curator building the future of discovery-led shopping.",
    displayName: name,
  };
}
