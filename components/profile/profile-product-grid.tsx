import Link from "next/link";
import type { MarketplaceProduct } from "@/lib/mock/products";

type ProfileProductGridProps = {
  empty: string;
  products: MarketplaceProduct[];
};

export function ProfileProductGrid({ empty, products }: ProfileProductGridProps) {
  if (!products.length) return <div className="rounded-[1.8rem] border border-dashed border-white/12 px-6 py-16 text-center text-brand-muted">{empty}</div>;
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} className="group overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0c1430]/92" href={`/home?category=${product.categoryIds[0]}`}>
          <div className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${product.image})` }} />
          <div className="flex items-center justify-between p-4">
            <div className="min-w-0">
              <p className="break-words font-semibold text-white">{product.productName}</p>
              <p className="text-sm text-brand-accent">${product.price.toFixed(2)}</p>
            </div>
            <span className="ml-3 shrink-0 rounded-full bg-white/8 px-3 py-1 text-xs text-white/55">{product.stats.likes}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
