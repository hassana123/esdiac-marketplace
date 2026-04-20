"use client";

import { useEffect, useMemo, useState } from "react";
import { PenSquare } from "lucide-react";
import type { AuthSession } from "@/lib/auth";
import { readInboxThreads, writeInboxThreads } from "@/lib/inbox-storage";
import { inboxCreators, inboxThreads, type InboxThread } from "@/lib/mock/inbox";
import { AppSidebar } from "@/components/app/app-sidebar";
import { InboxComposeModal } from "@/components/inbox/inbox-compose-modal";
import { InboxCreatorStrip } from "@/components/inbox/inbox-creator-strip";
import { InboxTabs } from "@/components/inbox/inbox-tabs";
import { InboxThreadList } from "@/components/inbox/inbox-thread-list";
import { InboxThreadView } from "@/components/inbox/inbox-thread-view";

type InboxShellProps = { session: AuthSession };

export function InboxShell({ session }: InboxShellProps) {
  const [threads, setThreads] = useState<InboxThread[]>(() => readInboxThreads() ?? inboxThreads);
  const [tab, setTab] = useState<"all" | "messages" | "activities">("all");
  const [creatorId, setCreatorId] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const filtered = useMemo(
    () =>
      threads.filter((thread) => {
        const matchesTab = tab === "all" || (tab === "messages" ? thread.kind === "message" : thread.kind === "activity");
        const matchesCreator = !creatorId || thread.creatorId === creatorId;
        return matchesTab && matchesCreator;
      }),
    [creatorId, tab, threads],
  );
  const [activeId, setActiveId] = useState(filtered[0]?.id ?? threads[0]?.id ?? "");
  const activeThread = filtered.find((thread) => thread.id === activeId) ?? filtered[0] ?? threads[0];

  useEffect(() => writeInboxThreads(threads), [threads]);

  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[96rem] gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_400px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <section className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-white">Inbox</h1>
            <button className="rounded-full border border-brand-accent/25 bg-brand-accent/10 p-3 text-brand-accent" onClick={() => setComposeOpen(true)} type="button">
              <PenSquare className="size-5" />
            </button>
          </div>
          <div className="mt-6 space-y-5">
            <InboxTabs active={tab} onChange={setTab} />
            <InboxCreatorStrip creators={inboxCreators} onSelect={setCreatorId} selectedId={creatorId} />
            <InboxThreadList
              activeId={activeThread?.id ?? ""}
              onSelect={(id) => {
                setActiveId(id);
                setThreads((current) =>
                  current.map((thread) =>
                    thread.id === id ? { ...thread, unread: 0 } : thread,
                  ),
                );
              }}
              threads={filtered}
            />
          </div>
        </section>
        {activeThread ? (
          <InboxThreadView
            thread={activeThread}
            onReply={(text) =>
              setThreads((current) =>
                current.map((thread) =>
                  thread.id === activeThread.id
                    ? {
                        ...thread,
                        preview: text,
                        timestamp: "now",
                        messages: [...thread.messages, { id: `msg-${Date.now()}`, author: session.name, body: text, timestamp: "now", mine: true }],
                      }
                    : thread,
                ),
              )
            }
          />
        ) : null}
      </div>
      <InboxComposeModal
        creators={inboxCreators}
        onClose={() => setComposeOpen(false)}
        onSend={(newCreatorId, message) => {
          const creator = inboxCreators.find((item) => item.id === newCreatorId);
          const threadId = creator?.handle ?? `thread-${Date.now()}`;
          setThreads((current) => {
            const existing = current.find((thread) => thread.creatorId === newCreatorId);
            if (existing) {
              return current.map((thread) =>
                thread.id === existing.id
                  ? {
                      ...thread,
                      preview: message,
                      timestamp: "now",
                      messages: [...thread.messages, { id: `msg-${Date.now()}`, author: session.name, body: message, timestamp: "now", mine: true }],
                    }
                  : thread,
              );
            }
            return [
              {
                id: threadId,
                creatorId: newCreatorId,
                title: creator?.name ?? "New Thread",
                preview: message,
                timestamp: "now",
                kind: "message",
                unread: 0,
                messages: [{ id: `msg-${Date.now()}`, author: session.name, body: message, timestamp: "now", mine: true }],
              },
              ...current,
            ];
          });
          setActiveId(threadId);
        }}
        open={composeOpen}
      />
    </section>
  );
}
