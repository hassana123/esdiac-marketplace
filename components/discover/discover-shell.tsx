"use client";

import { startTransition, useDeferredValue, useState } from "react";
import type { AuthSession } from "@/lib/auth";
import type { DiscoverCategory } from "@/lib/mock/discover";
import { AppSidebar } from "@/components/app/app-sidebar";
import { DiscoverGrid } from "@/components/discover/discover-grid";
import { DiscoverHeader } from "@/components/discover/discover-header";
import { DiscoverPanel } from "@/components/discover/discover-panel";

type DiscoverShellProps = {
  categories: DiscoverCategory[];
  session: AuthSession;
};

export function DiscoverShell({ categories, session }: DiscoverShellProps) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [message, setMessage] = useState("Choose a category to explore curated drops.");
  const deferredSearch = useDeferredValue(search);
  const filtered = categories.filter((category) =>
    category.title.toLowerCase().includes(deferredSearch.toLowerCase()),
  );
  const visible = showAll ? filtered : filtered.slice(0, 6);
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const selected =
    visible.find((item) => item.id === selectedId) ??
    filtered.find((item) => item.id === selectedId) ??
    visible[0] ??
    categories[0];

  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[220px_minmax(0,1fr)_320px]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-[#0c1430]/66 p-5 sm:p-6">
          <DiscoverHeader
            onHotPick={() => {
              startTransition(() => setSearch("tech"));
              setMessage("Jumped to tech picks from the quick action.");
            }}
            onSearchChange={(value) => startTransition(() => setSearch(value))}
            onToggleAll={() => setShowAll((current) => !current)}
            search={search}
            showAll={showAll}
          />
          <p className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-brand-muted">
            {message}
          </p>
          {visible.length ? (
            <DiscoverGrid
              categories={visible}
              onSelect={(id) => {
                setSelectedId(id);
                const picked = categories.find((item) => item.id === id);
                setMessage(`Viewing ${picked?.title ?? "selected category"}.`);
              }}
              selectedId={selected?.id ?? ""}
            />
          ) : (
            <div className="rounded-[1.8rem] border border-dashed border-white/12 px-6 py-16 text-center text-brand-muted">
              No categories match your search yet.
            </div>
          )}
        </div>
        {selected ? (
          <DiscoverPanel
            category={selected}
            onExplore={() =>
              setMessage(`Exploring ${selected.title.toLowerCase()} collections.`)
            }
          />
        ) : null}
      </div>
    </section>
  );
}
