export type CreatorProfile = {
  handle: string;
  displayName: string;
  avatar: string;
  bio: string;
};

export const creatorProfiles: CreatorProfile[] = [
  { handle: "@style_maven", displayName: "Style Maven", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", bio: "Styling standout wardrobe picks and travel-ready accessories." },
  { handle: "@techguru", displayName: "Tech Guru", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", bio: "Testing the gadgets, gear, and creator desks worth your attention." },
  { handle: "@fitdrop", displayName: "Fit Drop", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", bio: "Curating bold training essentials, runners, and healthy routines." },
  { handle: "@dailyedit", displayName: "Daily Edit", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80", bio: "Minimal accessories, daily upgrades, and clean everyday looks." },
];
