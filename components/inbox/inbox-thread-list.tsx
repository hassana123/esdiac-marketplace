import type { InboxThread } from "@/lib/mock/inbox";

type InboxThreadListProps = {
  activeId: string;
  threads: InboxThread[];
  onSelect: (id: string) => void;
};

export function InboxThreadList({ activeId, threads, onSelect }: InboxThreadListProps) {
  return (
    <div className="space-y-2">
      {threads.map((thread) => (
        <button
          key={thread.id}
          className={`flex w-full items-start justify-between rounded-[1.5rem] border p-4 text-left transition ${activeId === thread.id ? "border-brand-accent/40 bg-white/8" : "border-white/8 bg-white/4 hover:bg-white/6"}`}
          onClick={() => onSelect(thread.id)}
          type="button"
        >
          <div className="min-w-0">
            <p className="font-semibold text-white">{thread.title}</p>
            <p className="mt-1 truncate text-sm text-brand-muted">{thread.preview}</p>
          </div>
          <div className="ml-3 flex shrink-0 flex-col items-end gap-2">
            <span className="text-xs text-white/42">{thread.timestamp}</span>
            {thread.unread ? <span className="rounded-full bg-brand-accent px-2 py-0.5 text-[0.65rem] font-semibold text-slate-950">{thread.unread}</span> : null}
          </div>
        </button>
      ))}
    </div>
  );
}
