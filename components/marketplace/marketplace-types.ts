import { discoverCategories } from "@/lib/mock/categories";
import type { MarketplaceProduct, ProductComment } from "@/lib/mock/products";

export type CartRecord = Record<string, number>;
export type CommentsRecord = Record<string, ProductComment[]>;
export type FollowRecord = Record<string, boolean>;
export type CreateProductInput = {
  caption: string;
  categoryId: string;
  creatorName: string;
  handle: string;
  image: string;
  price: number;
  productName: string;
};

export type MarketplaceContextValue = {
  products: MarketplaceProduct[];
  categories: typeof discoverCategories;
  bookmarks: Record<string, boolean>;
  cart: CartRecord;
  cartOpen: boolean;
  comments: CommentsRecord;
  follows: FollowRecord;
  likes: Record<string, boolean>;
  shares: Record<string, number>;
  addComment: (productId: string, author: string, text: string) => void;
  addToCart: (productId: string) => void;
  createProduct: (input: CreateProductInput) => MarketplaceProduct;
  closeCart: () => void;
  deleteProduct: (productId: string) => void;
  openCart: () => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  shareProduct: (productId: string) => Promise<string>;
  toggleBookmark: (productId: string) => void;
  toggleFollow: (handle: string) => void;
  toggleLike: (productId: string) => void;
  updateProduct: (
    productId: string,
    updates: { caption: string; price: number; productName: string },
  ) => void;
};
