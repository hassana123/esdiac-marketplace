import type { DiscoverCategory } from "@/lib/mock/discover";

type DiscoverCardProps = {
  category: DiscoverCategory;
  active: boolean;
  onSelect: (id: string) => void;
};

export function DiscoverCard({ category, active, onSelect }: DiscoverCardProps) {
  return (
    <button
      className={`group relative min-h-72 overflow-hidden rounded-[1.8rem] border text-left transition ${active ? "border-brand-accent shadow-[0_16px_40px_rgba(10,245,134,0.15)]" : "border-white/8"}`}
      onClick={() => onSelect(category.id)}
      type="button"
    >
      <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${category.image})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,12,24,0.08),_rgba(8,11,20,0.88))]" />
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex justify-end">
          <span className="rounded-full bg-white/12 px-2 py-1 text-[0.65rem] text-white/78">open</span>
        </div>
        <div>
          {category.tag ? (
            <span className="mb-3 inline-flex rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-slate-950">
              {category.tag}
            </span>
          ) : null}
          <p className="max-w-[10ch] text-3xl font-semibold leading-tight text-white">
            {category.title}
          </p>
        </div>
      </div>
    </button>
  );
}
