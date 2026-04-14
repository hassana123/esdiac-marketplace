export type DiscoveryCard = {
  id: string;
  city: string;
  image: string;
  title?: string;
  badge?: string;
};

export type OnboardingContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  secondaryLabel: string;
  cards: DiscoveryCard[];
};

export const onboardingContent: OnboardingContent = {
  eyebrow: "ESDIAC",
  title: "Esdiac: Endless Discovery,",
  highlight: "Instant Shopping",
  description:
    "Dive into a vast universe of short, shoppable videos from creators worldwide. Your curated feed awaits.",
  ctaLabel: "Get Started",
  secondaryLabel: "Already have an account? Log In",
  cards: [
    {
      id: "nyc",
      city: "NYC",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "live",
      city: "LIVE",
      badge: "LIVE",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      title: "Streetwear",
    },
    {
      id: "berlin",
      city: "BERLIN",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "paris",
      city: "PARIS",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "seoul",
      city: "SEOUL",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "tokyo",
      city: "TOKYO",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    },
  ],
};
