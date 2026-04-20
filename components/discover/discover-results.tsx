import Link from "next/link";
import type { MarketplaceProduct } from "@/lib/mock/products";
import { formatPrice } from "@/components/home/feed-utils";

type DiscoverResultsProps = {
  categoryId: string;
  products: MarketplaceProduct[];
};

export function DiscoverResults({ categoryId, products }: DiscoverResultsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.25em] text-white/45">Products</p>
        <Link className="text-sm font-semibold text-brand-accent" href={`/home?category=${categoryId}`}>
          Open in Feed
        </Link>
      </div>
      <div className="space-y-3">
        {products.slice(0, 3).map((product) => (
          <Link
            key={product.id}
            className="block rounded-[1.4rem] border border-white/8 bg-white/5 p-4 transition hover:bg-white/8"
            href={`/home?category=${categoryId}`}
          >
            <p className="font-semibold text-white">{product.productName}</p>
            <p className="mt-1 text-sm text-brand-accent">{formatPrice(product.price)}</p>
            <p className="mt-1 text-sm text-brand-muted">{product.creator.handle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
