import { HeroShell } from "@/components/landing/hero-shell";
import { getOnboardingContent } from "@/lib/api/onboarding";

export default async function Home() {
  const content = await getOnboardingContent();

  return <HeroShell content={content} />;
}
