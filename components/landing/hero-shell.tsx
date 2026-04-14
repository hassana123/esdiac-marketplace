import { DiscoveryShowcase } from "@/components/landing/discovery-showcase";
import { HeroCopy } from "@/components/landing/hero-copy";
import type { OnboardingContent } from "@/lib/mock/onboarding";

type HeroShellProps = {
  content: OnboardingContent;
};

export function HeroShell({ content }: HeroShellProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg -[radial-gradient(circle_at_top,_rgba(10,245,134,0.12),_transparent_30%),linear-gradient(180deg,_#0e1730,_#060b1d)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] opacity-20" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between items-center gap-10 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="order-2 flex-1 lg:order-1">
          <div className="rounded-[2rem] border border-white/8 bg-white/4 p-6 backdrop-blur-xl sm:p-8">
            <HeroCopy {...content} />
          </div>
        </div>
        <div className="order-1 flex flex-1 justify-center lg:order-2 lg:justify-end">
          <DiscoveryShowcase eyebrow={content.eyebrow} cards={content.cards} />
        </div>
      </div>
    </section>
  );
}
