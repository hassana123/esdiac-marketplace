"use client";
import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { discoverCategories } from "@/lib/mock/categories";
import type {
  CartRecord,
  CommentsRecord,
  FollowRecord,
  MarketplaceContextValue,
} from "@/components/marketplace/marketplace-types";
import { readMarketplaceSnapshot, writeMarketplaceSnapshot } from "@/lib/marketplace-storage";
import { marketplaceProducts, type MarketplaceProduct } from "@/lib/mock/products";

type ProductRecord = Record<string, MarketplaceProduct>;

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

const initialComments = Object.fromEntries(marketplaceProducts.map((item) => [item.id, item.comments]));
const initialFollows = Object.fromEntries(marketplaceProducts.map((item) => [item.creator.handle, item.creator.isFollowing]));
const byId = Object.fromEntries(marketplaceProducts.map((item) => [item.id, item])) as ProductRecord;
const emptySubscribe = () => () => {};

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const initialSnapshot = isClient ? readMarketplaceSnapshot() : null;

  return (
    <MarketplaceProviderInner
      key={isClient ? "client" : "server"}
      initialSnapshot={initialSnapshot}
    >
      {children}
    </MarketplaceProviderInner>
  );
}

function MarketplaceProviderInner({
  children,
  initialSnapshot,
}: {
  children: React.ReactNode;
  initialSnapshot: ReturnType<typeof readMarketplaceSnapshot>;
}) {
  const [products, setProducts] = useState(initialSnapshot?.products ?? marketplaceProducts);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(initialSnapshot?.bookmarks ?? {});
  const [cart, setCart] = useState<CartRecord>(initialSnapshot?.cart ?? {});
  const [cartOpen, setCartOpen] = useState(false);
  const [comments, setComments] = useState<CommentsRecord>(initialSnapshot?.comments ?? initialComments);
  const [follows, setFollows] = useState<FollowRecord>(initialSnapshot?.follows ?? initialFollows);
  const [likes, setLikes] = useState<Record<string, boolean>>(initialSnapshot?.likes ?? {});
  const [shares, setShares] = useState<Record<string, number>>(initialSnapshot?.shares ?? {});

  useEffect(() => {
    writeMarketplaceSnapshot({
      bookmarks,
      cart,
      comments,
      follows,
      likes,
      products,
      shares,
    });
  }, [bookmarks, cart, comments, follows, likes, products, shares]);

  const value: MarketplaceContextValue = {
    products,
    categories: discoverCategories,
    bookmarks,
    cart,
    cartOpen,
    comments,
    follows,
    likes,
    shares,
    addComment: (productId, author, text) =>
      setComments((current) => ({ ...current, [productId]: [...(current[productId] ?? []), { id: `${productId}-${Date.now()}`, author, text }] })),
    addToCart: (productId) => {
      setCart((current) => ({ ...current, [productId]: (current[productId] ?? 0) + 1 }));
      setCartOpen(true);
    },
    createProduct: (input) => {
      const product = {
        id: `post-${Date.now()}`,
        productName: input.productName,
        price: input.price,
        image: input.image,
        categoryIds: [input.categoryId],
        creator: {
          handle: input.handle,
          name: input.creatorName,
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
          caption: input.caption,
          isFollowing: true,
        },
        stats: { likes: 0, shares: 0 },
        comments: [],
      } satisfies MarketplaceProduct;
      setProducts((current) => [product, ...current]);
      setComments((current) => ({ ...current, [product.id]: [] }));
      setFollows((current) => ({ ...current, [input.handle]: true }));
      return product;
    },
    closeCart: () => setCartOpen(false),
    deleteProduct: (productId) => {
      setProducts((current) => current.filter((item) => item.id !== productId));
      setComments((current) => {
        const next = { ...current };
        delete next[productId];
        return next;
      });
      setBookmarks((current) => ({ ...current, [productId]: false }));
      setLikes((current) => ({ ...current, [productId]: false }));
    },
    openCart: () => setCartOpen(true),
    setCartQuantity: (productId, quantity) =>
      setCart((current) => {
        if (quantity <= 0) {
          const rest = { ...current };
          delete rest[productId];
          return rest;
        }
        return { ...current, [productId]: quantity };
      }),
    shareProduct: async (productId) => {
      setShares((current) => ({ ...current, [productId]: (current[productId] ?? 0) + 1 }));
      const product =
        products.find((item) => item.id === productId) ?? byId[productId];
      const text = `Shared ${product.productName} from Esdiac Marketplace.`;
      if (navigator.share) await navigator.share({ title: product.productName, text });
      else if (navigator.clipboard) await navigator.clipboard.writeText(text);
      return text;
    },
    toggleBookmark: (productId) => setBookmarks((current) => ({ ...current, [productId]: !current[productId] })),
    toggleFollow: (handle) => setFollows((current) => ({ ...current, [handle]: !current[handle] })),
    toggleLike: (productId) => setLikes((current) => ({ ...current, [productId]: !current[productId] })),
    updateProduct: (productId, updates) =>
      setProducts((current) =>
        current.map((item) =>
          item.id === productId
            ? {
                ...item,
                price: updates.price,
                productName: updates.productName,
                creator: { ...item.creator, caption: updates.caption },
              }
            : item,
        ),
      ),
  };

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error("useMarketplace must be used inside MarketplaceProvider");
  return context;
}
