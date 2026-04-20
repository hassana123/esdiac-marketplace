import Link from "next/link";
import { handleToSlug } from "@/lib/profile-utils";
import type { InboxCreator } from "@/lib/mock/inbox";

type InboxCreatorStripProps = {
  creators: InboxCreator[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export function InboxCreatorStrip(props: InboxCreatorStripProps) {
  const { creators, selectedId, onSelect } = props;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
        New Creators
      </p>
      <div className="flex gap-4 overflow-auto pb-1">
        <button
          className={`w-18 h-18 p-8 rounded-full flex justify-center items-center text-sm ${selectedId === null ? "bg-brand-accent text-slate-950" : "bg-white/8 text-white/70"}`}
          onClick={() => onSelect(null)}
          type="button"
        >
          All
        </button>
        {creators.map((creator) => (
          <div key={creator.id} className="shrink-0 text-center">
            <div className="relative mx-auto w-fit">
              <Link
                aria-label={creator.name}
                className={`relative mx-auto block size-16 rounded-full border-2 ${selectedId === creator.id ? "border-brand-accent" : "border-white/12"} bg-cover bg-center`}
                href={`/profile/${handleToSlug(creator.handle)}`}
                style={{ backgroundImage: `url(${creator.avatar})` }}
              />
              {creator.online ? <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#0c1430] bg-brand-accent" /> : null}
            </div>
            <p className="mt-2 text-xs font-medium text-white/78">{creator.name}</p>
            <button className={`mt-2 rounded-full px-3 py-1 text-[0.7rem] ${selectedId === creator.id ? "bg-brand-accent text-slate-950" : "bg-white/8 text-white/65"}`} onClick={() => onSelect(creator.id)} type="button">
              Filter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
