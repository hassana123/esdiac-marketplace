import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiscoveryCard as DiscoveryCardType } from "@/lib/mock/onboarding";

type DiscoveryCardProps = {
  card: DiscoveryCardType;
  className?: string;
};

export function DiscoveryCard({ card, className }: DiscoveryCardProps) {
  return (
    <article
      className={cn(
        "group w-full relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-brand-panel shadow-[0_18px_40px_rgba(3,8,27,0.36)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${card.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#081128]" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 text-[0.65rem] font-semibold tracking-[0.18em] text-white/72">
        <span>{card.city}</span>
        {card.badge ? (
          <span className="rounded-full bg-white/18 px-2 py-1 text-[0.55rem] tracking-[0.12em] text-white">
            {card.badge}
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
        <div>
          {card.title ? (
            <p className="text-sm font-semibold text-white">{card.title}</p>
          ) : null}
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-white/14 text-white/80 backdrop-blur">
          <Play className="size-3 fill-current" />
        </span>
      </div>
    </article>
  );
}
