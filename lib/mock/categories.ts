export type DiscoverCategory = {
  id: string;
  title: string;
  image: string;
  tag?: string;
};

export const discoverCategories: DiscoverCategory[] = [
  { id: "summer-fashion", title: "Summer Fashion", tag: "TRENDING", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80" },
  { id: "latest-tech", title: "Latest in Tech", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80" },
  { id: "home-decor", title: "Home Decor", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80" },
  { id: "beauty-essentials", title: "Beauty Essentials", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80" },
  { id: "gaming-setup", title: "Gaming Setup", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80" },
  { id: "wellness-living", title: "Wellness Living", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80" },
];
