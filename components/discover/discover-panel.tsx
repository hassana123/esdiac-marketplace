import { ArrowRight } from "lucide-react";
import type { DiscoverCategory } from "@/lib/mock/discover";

type DiscoverPanelProps = {
  category: DiscoverCategory;
  onExplore: () => void;
};

export function DiscoverPanel({ category, onExplore }: DiscoverPanelProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-6">
      <p className="text-xs tracking-[0.35em] text-white/45">CURATED PICK</p>
      <h3 className="mt-4 text-2xl font-semibold text-white">{category.title}</h3>
      <p className="mt-3 text-sm leading-7 text-brand-muted">
        Browse creator-led drops, trend-driven edits, and shoppable stories in{" "}
        {category.title.toLowerCase()}.
      </p>
      <div
        className="mt-6 h-56 rounded-[1.6rem] bg-cover bg-center"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <button
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950"
        onClick={onExplore}
        type="button"
      >
        Explore Collection
        <ArrowRight className="size-4" />
      </button>
    </aside>
  );
}
