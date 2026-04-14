import { ScanSearch } from "lucide-react";

type DiscoverHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onToggleAll: () => void;
  onHotPick: () => void;
  showAll: boolean;
};

export function DiscoverHeader(props: DiscoverHeaderProps) {
  const { search, onSearchChange, onToggleAll, onHotPick, showAll } = props;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Discover</h1>
        <button
          className="rounded-full border border-brand-accent/25 bg-brand-accent/10 p-3 text-brand-accent transition hover:bg-brand-accent/20"
          onClick={onHotPick}
          type="button"
        >
          <ScanSearch className="size-5" />
        </button>
      </div>
      <input
        className="w-full rounded-full border border-white/8 bg-[#161d47] px-5 py-4 text-white outline-none placeholder:text-white/38 focus:border-brand-accent"
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search products, brands, creators..."
        value={search}
      />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Shopping Categories</h2>
        <button
          className="text-sm font-semibold text-brand-accent"
          onClick={onToggleAll}
          type="button"
        >
          {showAll ? "Show Less" : "See All"}
        </button>
      </div>
    </div>
  );
}
