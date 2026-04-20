"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FeedActions } from "@/components/home/feed-actions";
import { FeedComments } from "@/components/home/feed-comments";
import { FeedEditModal } from "@/components/home/feed-edit-modal";
import { FeedEmptyState } from "@/components/home/feed-empty-state";
import { FeedPostPanel } from "@/components/home/feed-post-panel";
import { FeedTopControls } from "@/components/home/feed-top-controls";
import { useMarketplace } from "@/components/marketplace/marketplace-context";
import { sessionToHandle } from "@/lib/profile-utils";

type FeedStageProps = { initialCategory?: string };

export function FeedStage({ initialCategory = "all" }: FeedStageProps) {
  const router = useRouter();
  const {
    addComment,
    addToCart,
    bookmarks,
    categories,
    comments,
    deleteProduct,
    follows,
    likes,
    products,
    shareProduct,
    shares,
    toggleBookmark,
    toggleFollow,
    toggleLike,
    updateProduct,
  } = useMarketplace();
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("Use the down button or your trackpad to browse posts.");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const ownHandle = typeof document === "undefined" ? "" : sessionToHandle(document.body.dataset.userName || "");
  const filteredPosts = products.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.categoryIds.includes(activeCategory);
    const matchesTab = activeTab === "for-you" || follows[item.creator.handle];
    return matchesCategory && matchesTab;
  });
  const post = filteredPosts[index % Math.max(filteredPosts.length, 1)];

  function nextPost() {
    if (!filteredPosts.length) return;
    setCommentsOpen(false);
    setIndex((current) => (current + 1) % filteredPosts.length);
  }

  function handleWheel(event: React.WheelEvent<HTMLElement>) { if (event.deltaY > 20) nextPost(); }

  if (!post) {
    return <FeedEmptyState activeTab={activeTab} onDiscover={() => router.push("/discover")} onTabChange={setActiveTab} />;
  }

  return (
    <section
      className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-brand-panel"
      onWheel={handleWheel}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${post.image})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,12,24,0.18),_rgba(10,13,24,0.72)_66%,_rgba(8,11,20,0.95))]" />
      <div className="relative flex h-full min-h-[620px] flex-col justify-between p-5 sm:p-7">
        <FeedTopControls
          activeCategory={activeCategory}
          activeTab={activeTab}
          categories={categories}
          onCategoryChange={(categoryId) => {
            setActiveCategory(categoryId);
            setIndex(0);
          }}
          onDiscover={() => router.push("/discover")}
          onNext={nextPost}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIndex(0);
          }}
        />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FeedPostPanel
            categoryLabel={categories.find((item) => item.id === post.categoryIds[0])?.title ?? "Featured"}
            following={Boolean(follows[post.creator.handle])}
            isOwner={post.creator.handle === ownHandle}
            message={message}
            onBuy={() => {
              addToCart(post.id);
              setMessage(`Added ${post.productName} to your cart.`);
            }}
            onDelete={() => {
              deleteProduct(post.id);
              setMessage(`${post.productName} deleted.`);
            }}
            onEdit={() => setEditOpen(true)}
            onToggleFollow={() => {
              toggleFollow(post.creator.handle);
              setMessage(`${follows[post.creator.handle] ? "Unfollowed" : "Following"} ${post.creator.handle}.`);
            }}
            post={post}
          />
          <FeedActions
            bookmarked={Boolean(bookmarks[post.id])}
            comments={(comments[post.id] ?? []).length}
            liked={Boolean(likes[post.id])}
            likes={post.stats.likes + (likes[post.id] ? 1 : 0)}
            onBookmark={() => {
              toggleBookmark(post.id);
              setMessage(`${bookmarks[post.id] ? "Removed" : "Saved"} ${post.productName}.`);
            }}
            onComment={() => setCommentsOpen((current) => !current)}
            onLike={() => toggleLike(post.id)}
            onShare={async () => {
              const response = await shareProduct(post.id);
              setMessage(response);
            }}
            shares={post.stats.shares + (shares[post.id] ?? 0)}
          />
        </div>
        <FeedComments
          author="You"
          comments={comments[post.id] ?? []}
          onClose={() => setCommentsOpen(false)}
          onSubmit={(text) => {
            addComment(post.id, "You", text);
            setMessage(`Comment posted on ${post.productName}.`);
          }}
          open={commentsOpen}
        />
        <FeedEditModal
          onClose={() => setEditOpen(false)}
          onSave={(updates) => {
            updateProduct(post.id, updates);
            setMessage(`${updates.productName} updated.`);
            setEditOpen(false);
          }}
          open={editOpen}
          post={post}
        />
      </div>
    </section>
  );
}
