type AlertsItemProps = {
  accent: "green" | "amber" | "blue";
  detail: string;
  title: string;
};

const accentStyles = {
  amber: "bg-amber-400/16 text-amber-300",
  blue: "bg-sky-400/16 text-sky-300",
  green: "bg-brand-accent/14 text-brand-accent",
};

export function AlertsItem({ accent, detail, title }: AlertsItemProps) {
  return (
    <article className="flex items-start gap-4 rounded-[1.6rem] border border-white/8 bg-white/5 p-4">
      <div className={`rounded-full px-3 py-2 text-xs font-semibold ${accentStyles[accent]}`}>
        New
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-7 text-brand-muted">{detail}</p>
      </div>
    </article>
  );
}
