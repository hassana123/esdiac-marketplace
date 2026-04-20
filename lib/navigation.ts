import {
  Bell,
  Compass,
  House,
  MessageSquare,
  PlusSquare,
  UserRound,
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
  { label: "Create", href: "/create", icon: PlusSquare },
  { label: "Inbox", href: "/inbox", icon: MessageSquare },
  { label: "Profile", href: "/profile", icon: UserRound },
  { label: "Alerts", href: "/alerts", icon: Bell },
];
