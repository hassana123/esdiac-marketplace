"use client";

import { useRouter } from "next/navigation";
import { LogOut, ShoppingBag } from "lucide-react";
import type { AuthSession } from "@/lib/auth";
import { AppNav } from "@/components/app/app-nav";
import { useMarketplace } from "@/components/marketplace/marketplace-context";
import { Button } from "@/components/ui/button";

type AppSidebarProps = {
  session: AuthSession;
};

export function AppSidebar({ session }: AppSidebarProps) {
  const router = useRouter();
  const { cart, openCart } = useMarketplace();
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="flex h-full min-w-0 flex-col gap-4">
      <div className="min-w-0 rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-5 sm:p-6">
        <p className="text-xs tracking-[0.4em] text-white/45">ESDIAC</p>
        <p className="mt-4 break-words text-lg font-semibold leading-tight text-white sm:text-xl">
          {session.name}
        </p>
        <p className="mt-2 break-all text-sm text-brand-muted">{session.email}</p>
      </div>
      <AppNav />
      <Button variant="secondary" className="w-full justify-between gap-3 overflow-hidden" onClick={openCart}>
        <span className="flex items-center gap-2">
          <ShoppingBag className="size-4" />
          Cart
        </span>
        <span className="shrink-0">{cartCount}</span>
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          router.push("/login");
          router.refresh();
        }}
      >
        <LogOut className="size-4" />
        Log out
      </Button>
    </div>
  );
}
