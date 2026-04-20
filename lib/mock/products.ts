export type ProductComment = { id: string; author: string; text: string };

export type MarketplaceOrder = {
  id: string;
  buyerEmail: string;
  buyerName: string;
  placedAt: string;
  productId: string;
  quantity: number;
  status: "Pending" | "Paid" | "Shipped" | "Delivered";
  total: number;
};

export type MarketplaceProduct = {
  id: string;
  productName: string;
  price: number;
  image: string;
  categoryIds: string[];
  creator: { handle: string; name: string; avatar: string; caption: string; isFollowing: boolean };
  stats: { likes: number; shares: number };
  comments: ProductComment[];
};

export const marketplaceProducts: MarketplaceProduct[] = [
  { id: "holdall", productName: "Premium Leather Holdall", price: 249, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=80", categoryIds: ["summer-fashion"], creator: { handle: "@style_maven", name: "Style Maven", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", caption: "Styling the new summer collection with travel-ready essentials.", isFollowing: true }, stats: { likes: 124000, shares: 850 }, comments: [{ id: "c1", author: "Lydia", text: "That bag texture looks incredible." }, { id: "c2", author: "Marcus", text: "Perfect carry-on size." }] },
  { id: "headphones", productName: "Studio Wireless Headset", price: 120, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80", categoryIds: ["latest-tech", "gaming-setup"], creator: { handle: "@techguru", name: "Tech Guru", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", caption: "Testing all-day comfort and clean sound for desk setups.", isFollowing: true }, stats: { likes: 8200, shares: 162 }, comments: [{ id: "c3", author: "Zara", text: "Need the battery life details." }] },
  { id: "runners", productName: "Velocity Red Runners", price: 89, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=80", categoryIds: ["summer-fashion", "wellness-living"], creator: { handle: "@fitdrop", name: "Fit Drop", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", caption: "Fast, light, and bold enough to carry an entire look.", isFollowing: false }, stats: { likes: 45000, shares: 501 }, comments: [{ id: "c4", author: "Alex", text: "These would go crazy for running days." }] },
  { id: "watch", productName: "Classic Minimal Watch", price: 49, image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1400&q=80", categoryIds: ["summer-fashion"], creator: { handle: "@dailyedit", name: "Daily Edit", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80", caption: "A clean accessory pick that works from workday to dinner.", isFollowing: false }, stats: { likes: 12400, shares: 190 }, comments: [{ id: "c5", author: "Amara", text: "Simple and clean." }] },
  { id: "lamp", productName: "Aura Table Lamp", price: 74, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80", categoryIds: ["home-decor"], creator: { handle: "@nestnotes", name: "Nest Notes", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", caption: "Soft ambient lighting for modern corners and work nooks.", isFollowing: true }, stats: { likes: 6200, shares: 88 }, comments: [{ id: "c6", author: "Zuri", text: "Love this warm tone." }] },
  { id: "serum", productName: "Glow Daily Serum", price: 35, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80", categoryIds: ["beauty-essentials"], creator: { handle: "@skinloop", name: "Skin Loop", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=300&q=80", caption: "Morning skincare in under five minutes.", isFollowing: false }, stats: { likes: 15800, shares: 220 }, comments: [{ id: "c7", author: "Rita", text: "Adding this to my routine." }] },
  { id: "monitor", productName: "Neon Dual Monitor Kit", price: 399, image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=80", categoryIds: ["gaming-setup", "latest-tech"], creator: { handle: "@framebyte", name: "Frame Byte", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80", caption: "Desk upgrades that actually change your workflow.", isFollowing: true }, stats: { likes: 27800, shares: 401 }, comments: [{ id: "c8", author: "Ken", text: "This setup is elite." }] },
  { id: "mat", productName: "Balance Yoga Mat", price: 42, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80", categoryIds: ["wellness-living"], creator: { handle: "@calmcore", name: "Calm Core", avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=300&q=80", caption: "Low-impact movement essentials for everyday routines.", isFollowing: false }, stats: { likes: 9100, shares: 140 }, comments: [{ id: "c9", author: "Mia", text: "The color is so clean." }] },
  { id: "sunglasses", productName: "Noir Frame Sunglasses", price: 58, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1400&q=80", categoryIds: ["summer-fashion"], creator: { handle: "@shadeedit", name: "Shade Edit", avatar: "https://images.unsplash.com/photo-1542204625-de293a2f8ff4?auto=format&fit=crop&w=300&q=80", caption: "Sharp frames for bright-day outfits and weekend travel edits.", isFollowing: false }, stats: { likes: 11100, shares: 166 }, comments: [{ id: "c10", author: "Nia", text: "These frames look expensive." }] },
  { id: "espresso", productName: "Barista Mini Espresso", price: 215, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1400&q=80", categoryIds: ["wellness-living"], creator: { handle: "@kitchenpulse", name: "Kitchen Pulse", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", caption: "Countertop coffee gear with a sleek morning ritual feel.", isFollowing: true }, stats: { likes: 6800, shares: 102 }, comments: [{ id: "c11", author: "Jae", text: "This belongs in my kitchen immediately." }] },
  { id: "keyboard", productName: "Tactile Creator Keyboard", price: 139, image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1400&q=80", categoryIds: ["gaming-setup", "latest-tech"], creator: { handle: "@deskcraft", name: "Desk Craft", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", caption: "Mechanical feel, soft backlight, and a cleaner workflow.", isFollowing: false }, stats: { likes: 14900, shares: 244 }, comments: [{ id: "c12", author: "Tobi", text: "That desk setup is ridiculously clean." }] },
];

export const marketplaceOrders: MarketplaceOrder[] = [
  { id: "ord-1001", buyerEmail: "hassan@example.com", buyerName: "Hassan", placedAt: "Apr 12, 2026", productId: "holdall", quantity: 1, status: "Delivered", total: 249 },
  { id: "ord-1002", buyerEmail: "maya@example.com", buyerName: "Maya Scott", placedAt: "Apr 13, 2026", productId: "monitor", quantity: 1, status: "Shipped", total: 399 },
  { id: "ord-1003", buyerEmail: "leo@example.com", buyerName: "Leo Grant", placedAt: "Apr 14, 2026", productId: "keyboard", quantity: 2, status: "Paid", total: 278 },
  { id: "ord-1004", buyerEmail: "nina@example.com", buyerName: "Nina Wells", placedAt: "Apr 14, 2026", productId: "lamp", quantity: 1, status: "Delivered", total: 74 },
  { id: "ord-1005", buyerEmail: "hassan@example.com", buyerName: "Hassan", placedAt: "Apr 15, 2026", productId: "serum", quantity: 2, status: "Paid", total: 70 },
  { id: "ord-1006", buyerEmail: "omar@example.com", buyerName: "Omar Lane", placedAt: "Apr 15, 2026", productId: "headphones", quantity: 1, status: "Pending", total: 120 },
];
