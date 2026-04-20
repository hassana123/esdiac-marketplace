"use client";

import type { AuthSession } from "@/lib/auth";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AlertsItem } from "@/components/alerts/alerts-item";
import { useMarketplace } from "@/components/marketplace/marketplace-context";

type AlertsShellProps = { session: AuthSession };

export function AlertsShell({ session }: AlertsShellProps) {
  const { bookmarks, cart, comments, follows, likes, shares } = useMarketplace();
  const alerts = [
    { title: "Saved Products", detail: `You have ${Object.values(bookmarks).filter(Boolean).length} saved products ready to revisit.`, accent: "green" as const },
    { title: "Cart Activity", detail: `There are ${Object.values(cart).reduce((sum, qty) => sum + qty, 0)} items waiting in your cart.`, accent: "amber" as const },
    { title: "Creator Network", detail: `You are following ${Object.values(follows).filter(Boolean).length} creators across the marketplace.`, accent: "blue" as const },
    { title: "Engagement", detail: `You have liked ${Object.values(likes).filter(Boolean).length} posts and shared ${Object.values(shares).reduce((sum, count) => sum + count, 0)} products.`, accent: "green" as const },
    { title: "Comments", detail: `Conversation is active across ${Object.keys(comments).filter((key) => comments[key]?.length).length} product threads.`, accent: "blue" as const },
  ];

  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[94rem] gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <section className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-6 sm:p-7">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] text-white/45">ALERTS</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Marketplace activity at a glance.</h1>
            <p className="mt-3 text-base leading-8 text-brand-muted">
              A lightweight activity center for your saved items, follows, cart momentum, and creator engagement.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {alerts.map((alert) => (
              <AlertsItem key={alert.title} accent={alert.accent} detail={alert.detail} title={alert.title} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
