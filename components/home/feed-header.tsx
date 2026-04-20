import { ChevronDown, Search } from "lucide-react";

type FeedHeaderProps = {
  activeTab: "for-you" | "following";
  onTabChange: (tab: "for-you" | "following") => void;
  onNext: () => void;
  onDiscover: () => void;
};

export function FeedHeader(props: FeedHeaderProps) {
  const { activeTab, onDiscover, onNext, onTabChange } = props;

  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex gap-5 text-lg font-semibold">
        <button className={activeTab === "for-you" ? "" : "text-white/55"} onClick={() => onTabChange("for-you")} type="button">
          For You
        </button>
        <button className={activeTab === "following" ? "" : "text-white/55"} onClick={() => onTabChange("following")} type="button">
          Following
        </button>
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
