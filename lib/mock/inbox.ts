export type InboxCreator = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  online?: boolean;
};

export type InboxMessage = {
  id: string;
  author: string;
  body: string;
  timestamp: string;
  mine?: boolean;
};

export type InboxThread = {
  id: string;
  creatorId?: string;
  title: string;
  preview: string;
  timestamp: string;
  kind: "message" | "activity";
  unread: number;
  accent?: "green" | "amber" | "blue";
  messages: InboxMessage[];
};

export const inboxCreators: InboxCreator[] = [
  { id: "lydia", name: "Lydia", handle: "@lydia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80", online: true },
  { id: "marcus", name: "Marcus", handle: "@marcus", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", online: true },
  { id: "techguru", name: "TechGuru", handle: "@techguru", avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80" },
  { id: "zara", name: "Zara_M", handle: "@zara_m", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
];

export const inboxThreads: InboxThread[] = [
  { id: "style-maven", creatorId: "lydia", title: "@style_maven", preview: "Check out the new collection. Just dropped another carry piece.", timestamp: "2m", kind: "message", unread: 1, messages: [{ id: "m1", author: "@style_maven", body: "Check out the new collection. Just dropped another carry piece.", timestamp: "2m" }] },
  { id: "support", title: "Esdiac Support", preview: "Your order #1234 has shipped. Tracking details are live now.", timestamp: "1h", kind: "activity", unread: 1, accent: "green", messages: [{ id: "m2", author: "Esdiac Support", body: "Your order #1234 has shipped. Tracking details are live now.", timestamp: "1h" }] },
  { id: "promotions", title: "Promotions", preview: "Flash sale on Tech Essentials starts now. Save up to 30%.", timestamp: "4h", kind: "activity", unread: 0, accent: "amber", messages: [{ id: "m3", author: "Promotions", body: "Flash sale on Tech Essentials starts now. Save up to 30%.", timestamp: "4h" }] },
  { id: "marcus-chen", creatorId: "marcus", title: "Marcus Chen", preview: "Did you see that keyboard review I sent?", timestamp: "Yesterday", kind: "message", unread: 0, messages: [{ id: "m4", author: "Marcus Chen", body: "Did you see that keyboard review I sent?", timestamp: "Yesterday" }] },
  { id: "marketplace", title: "Esdiac Marketplace", preview: "Your return for Order #0988 has been processed successfully.", timestamp: "2d", kind: "activity", unread: 0, accent: "blue", messages: [{ id: "m5", author: "Esdiac Marketplace", body: "Your return for Order #0988 has been processed successfully.", timestamp: "2d" }] },
  { id: "techguru", creatorId: "techguru", title: "@techguru", preview: "Hope you enjoy the headset rec. I added two more picks.", timestamp: "3d", kind: "message", unread: 1, messages: [{ id: "m6", author: "@techguru", body: "Hope you enjoy the headset rec. I added two more picks.", timestamp: "3d" }] },
];
