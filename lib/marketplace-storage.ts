import { readUserSlice, writeUserSlice } from "@/lib/app-state-storage";
import type { MarketplaceProduct, ProductComment } from "@/lib/mock/products";

export type MarketplaceSnapshot = {
  bookmarks: Record<string, boolean>;
  cart: Record<string, number>;
  comments: Record<string, ProductComment[]>;
  follows: Record<string, boolean>;
  likes: Record<string, boolean>;
  products: MarketplaceProduct[];
  shares: Record<string, number>;
};

export function readMarketplaceSnapshot() {
  return readUserSlice<MarketplaceSnapshot>("marketplace") ?? null;
}

export function writeMarketplaceSnapshot(snapshot: MarketplaceSnapshot) {
  writeUserSlice("marketplace", snapshot);
}
