import { marketplaceProducts } from "@/lib/mock/products";

export async function getHomeFeed() {
  return marketplaceProducts;
}
