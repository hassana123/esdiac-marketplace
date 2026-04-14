import { formatPrice } from "@/components/home/feed-utils";

type FeedProductCardProps = {
  productName: string;
  price: number;
  onBuy: () => void;
};

export function FeedProductCard({
  productName,
  price,
  onBuy,
}: FeedProductCardProps) {
  return (
    <div className="flex max-w-sm items-center justify-between rounded-[1.6rem] bg-[#2f3340]/92 p-3 backdrop-blur">
      <div>
        <p className="font-semibold text-white">{productName}</p>
        <p className="text-brand-accent">{formatPrice(price)}</p>
      </div>
      <button
        className="rounded-[1rem] bg-brand-accent px-5 py-3 font-semibold text-slate-950 transition hover:brightness-105"
        onClick={onBuy}
        type="button"
      >
        Buy Now
      </button>
    </div>
  );
}
