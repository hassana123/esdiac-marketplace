import { DiscoveryGrid } from "@/components/landing/discovery-grid";
import type { DiscoveryCard } from "@/lib/mock/onboarding";

type DiscoveryShowcaseProps = {
  eyebrow: string;
  cards: DiscoveryCard[];
};

export function DiscoveryShowcase({
  eyebrow,
  cards,
}: DiscoveryShowcaseProps) {
  return (
    <div className="phone-float lg:w-full w-[70vw]  rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(16,24,52,0.96),_rgba(8,13,33,0.98))] p-5 shadow-[0_35px_100px_rgba(2,8,24,0.55)] sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.35em] text-white/55">
          {eyebrow}
        </span>
        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/65">
          Discover live drops
        </span>
      </div>
      <DiscoveryGrid cards={cards} />
    </div>
  );
}
