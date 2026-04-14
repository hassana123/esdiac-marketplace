"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import type { AuthSession } from "@/lib/auth";
import { AppNav } from "@/components/app/app-nav";
import { Button } from "@/components/ui/button";

type AppSidebarProps = {
  session: AuthSession;
};

export function AppSidebar({ session }: AppSidebarProps) {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-5">
        <p className="text-xs tracking-[0.4em] text-white/45">ESDIAC</p>
        <p className="mt-4 text-xl font-semibold text-white">{session.name}</p>
        <p className="text-sm text-brand-muted">{session.email}</p>
      </div>
      <AppNav />
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
