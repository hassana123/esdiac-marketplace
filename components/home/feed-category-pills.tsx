type FeedCategoryPillsProps = {
  activeCategory: string;
  categories: { id: string; title: string }[];
  onSelect: (categoryId: string) => void;
};

export function FeedCategoryPills({
  activeCategory,
  categories,
  onSelect,
}: FeedCategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`rounded-full px-4 py-2 text-sm font-medium ${activeCategory === "all" ? "bg-brand-accent text-slate-950" : "bg-white/8 text-white/75"}`}
        onClick={() => onSelect("all")}
        type="button"
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`rounded-full px-4 py-2 text-sm font-medium ${activeCategory === category.id ? "bg-brand-accent text-slate-950" : "bg-white/8 text-white/75"}`}
          onClick={() => onSelect(category.id)}
          type="button"
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
