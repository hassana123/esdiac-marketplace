import { ChevronDown, Search } from "lucide-react";

type FeedHeaderProps = {
  onNext: () => void;
  onDiscover: () => void;
};

export function FeedHeader({ onNext, onDiscover }: FeedHeaderProps) {
  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex gap-5 text-lg font-semibold">
        <span>For You</span>
        <span className="text-white/55">Following</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-full bg-white/14 p-3 backdrop-blur transition hover:bg-white/22"
          onClick={onDiscover}
          type="button"
        >
          <Search className="size-5" />
        </button>
        <button
          className="rounded-full bg-white/14 p-3 backdrop-blur transition hover:bg-white/22"
          onClick={onNext}
          type="button"
        >
          <ChevronDown className="size-5" />
        </button>
      </div>
    </div>
  );
}
