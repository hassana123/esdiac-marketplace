type InboxTabsProps = {
  active: "all" | "messages" | "activities";
  onChange: (tab: "all" | "messages" | "activities") => void;
};

const tabs: InboxTabsProps["active"][] = ["all", "messages", "activities"];

export function InboxTabs({ active, onChange }: InboxTabsProps) {
  return (
    <div className="flex items-center gap-3 border-b border-white/8 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`border-b-2 px-1 pb-3 text-sm font-semibold capitalize ${active === tab ? "border-brand-accent text-brand-accent" : "border-transparent text-white/45"}`}
          onClick={() => onChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
