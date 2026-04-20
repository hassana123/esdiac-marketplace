import type { DiscoverCategory } from "@/lib/mock/categories";
import { DiscoverCard } from "@/components/discover/discover-card";

type DiscoverGridProps = {
  categories: DiscoverCategory[];
  getCount: (categoryId: string) => number;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function DiscoverGrid({
  categories,
  getCount,
  selectedId,
  onSelect,
}: DiscoverGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <DiscoverCard
          key={category.id}
          active={category.id === selectedId}
          category={category}
          productCount={getCount(category.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
