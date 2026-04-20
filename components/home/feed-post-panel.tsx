import { FeedCreator } from "@/components/home/feed-creator";
import { FeedOwnerActions } from "@/components/home/feed-owner-actions";
import { FeedProductCard } from "@/components/home/feed-product-card";
import type { MarketplaceProduct } from "@/lib/mock/products";

type FeedPostPanelProps = {
  categoryLabel: string;
  following: boolean;
  isOwner: boolean;
  message: string;
  onBuy: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onToggleFollow: () => void;
  post: MarketplaceProduct;
};

export function FeedPostPanel(props: FeedPostPanelProps) {
  const { categoryLabel, following, isOwner, message, onBuy, onDelete, onEdit, onToggleFollow, post } = props;

  return (
    <div className="max-w-md space-y-4">
      <FeedCreator {...post.creator} following={following} isOwner={isOwner} onToggleFollow={onToggleFollow} />
      {isOwner ? <FeedOwnerActions onDelete={onDelete} onEdit={onEdit} /> : null}
      <FeedProductCard
        categoryLabel={categoryLabel}
        productName={post.productName}
        price={post.price}
        onBuy={onBuy}
      />
      <p className="rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/80 backdrop-blur">
        {message}
      </p>
    </div>
  );
}
