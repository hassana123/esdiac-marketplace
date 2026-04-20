export type ProfileTab = "posts" | "saved" | "purchases" | "sales";

type ProfileTabsProps = {
  active: ProfileTab;
  tabs: { id: ProfileTab; label: string }[];
  onChange: (tab: ProfileTab) => void;
};

export function ProfileTabs({ active, onChange, tabs }: ProfileTabsProps) {
  return (
    <div className="flex items-center gap-3 overflow-auto border-b border-white/8 pb-3">
      {tabs.map((tab) => (
        <button key={tab.id} className={`rounded-full px-4 py-2 text-sm font-semibold ${active === tab.id ? "bg-brand-accent text-slate-950" : "bg-white/8 text-white/65"}`} onClick={() => onChange(tab.id)} type="button">{tab.label}</button>
      ))}
    </div>
  );
}
