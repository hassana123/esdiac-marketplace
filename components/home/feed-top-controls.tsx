import { FeedCategoryPills } from "@/components/home/feed-category-pills";
import { FeedHeader } from "@/components/home/feed-header";

type FeedTopControlsProps = {
  activeCategory: string;
  activeTab: "for-you" | "following";
  categories: { id: string; title: string }[];
  onCategoryChange: (categoryId: string) => void;
  onDiscover: () => void;
  onNext: () => void;
  onTabChange: (tab: "for-you" | "following") => void;
};

export function FeedTopControls(props: FeedTopControlsProps) {
  const {
    activeCategory,
    activeTab,
    categories,
    onCategoryChange,
    onDiscover,
    onNext,
    onTabChange,
  } = props;

  return (
    <div className="space-y-4">
      <FeedHeader
        activeTab={activeTab}
        onDiscover={onDiscover}
        onNext={onNext}
        onTabChange={onTabChange}
      />
      <div className="hidden lg:block">
        <FeedCategoryPills
          activeCategory={activeCategory}
          categories={categories}
          onSelect={onCategoryChange}
        />
      </div>
    </div>
  );
}
