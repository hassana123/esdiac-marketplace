export type FeedPost = {
  id: string;
  productName: string;
  price: number;
  image: string;
  creator: {
    handle: string;
    name: string;
    avatar: string;
    caption: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
};

export const homeFeed: FeedPost[] = [
  {
    id: "holdall",
    productName: "Premium Leather Holdall",
    price: 249,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=80",
    creator: {
      handle: "@style_maven",
      name: "Style Maven",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      caption: "Styling the new summer collection with travel-ready essentials.",
    },
    stats: { likes: 124000, comments: 1200, shares: 850 },
  },
  {
    id: "headphones",
    productName: "Studio Wireless Headset",
    price: 120,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
    creator: {
      handle: "@techguru",
      name: "Tech Guru",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      caption: "Testing all-day comfort and clean sound for desk setups.",
    },
    stats: { likes: 8200, comments: 420, shares: 162 },
  },
  {
    id: "runners",
    productName: "Velocity Red Runners",
    price: 89,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80",
    creator: {
      handle: "@fitdrop",
      name: "Fit Drop",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      caption: "Fast, light, and bold enough to carry an entire look.",
    },
    stats: { likes: 45000, comments: 980, shares: 501 },
  },
  {
    id: "watch",
    productName: "Classic Minimal Watch",
    price: 49,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=80",
    creator: {
      handle: "@dailyedit",
      name: "Daily Edit",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      caption: "A clean accessory pick that works from workday to dinner.",
    },
    stats: { likes: 12400, comments: 250, shares: 190 },
  },
];
