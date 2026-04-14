import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroCopyProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  secondaryLabel: string;
};

export function HeroCopy(props: HeroCopyProps) {
  const { eyebrow, title, highlight, description, ctaLabel, secondaryLabel } =
    props;

  return (
    <div className="flex max-w-xl flex-col gap-6 text-white">
      <p className="text-xs font-semibold tracking-[0.45em] text-white/52">
        {eyebrow}
      </p>
      <div className="space-y-4">
        <h1 className="max-w-lg text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {title} <span className="text-brand-accent">{highlight}</span>
        </h1>
        <p className="max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-9 rounded-full bg-brand-accent" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
      </div>
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <Button asChild className="min-w-44">
          <Link href="/signup">
          {ctaLabel}
          <ArrowRight className="size-4" />
          </Link>
        </Button>
        <p className="text-sm text-brand-muted">
          {secondaryLabel.split("Log In")[0]}
          <Link className="font-semibold text-brand-accent" href="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
