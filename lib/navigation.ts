import {
  Bell,
  Compass,
  House,
  MessageSquare,
  PlusSquare,
  type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  note?: string;
};

export const appNavItems: AppNavItem[] = [
  { label: "Home", href: "/home", icon: House },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Create", icon: PlusSquare, note: "Create post tools are next." },
  { label: "Inbox", icon: MessageSquare, note: "Inbox is coming next." },
  { label: "Alerts", icon: Bell, note: "Activity alerts are coming next." },
];
