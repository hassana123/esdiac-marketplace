import type { DiscoveryCard as DiscoveryCardType } from "@/lib/mock/onboarding";
import { DiscoveryCard } from "@/components/landing/discovery-card";

type DiscoveryGridProps = {
  cards: DiscoveryCardType[];
};

const cardHeights = [
  "h-40 sm:h-44",
  "h-52 sm:h-56",
  "h-36 sm:h-40",
  "h-44 sm:h-48",
  "h-36 sm:h-40",
  "h-44 sm:h-48",
];

export function DiscoveryGrid({ cards }: DiscoveryGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card, index) => (
        <DiscoveryCard
          key={card.id}
          card={card}
          className={cardHeights[index] ?? ""}
        />
      ))}
    </div>
  );
}
