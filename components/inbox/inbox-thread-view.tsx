"use client";

import Link from "next/link";
import { useState } from "react";
import { inboxCreators, type InboxThread } from "@/lib/mock/inbox";
import { handleToSlug } from "@/lib/profile-utils";

type InboxThreadViewProps = {
  thread: InboxThread;
  onReply: (text: string) => void;
};

export function InboxThreadView({ thread, onReply }: InboxThreadViewProps) {
  const [reply, setReply] = useState("");
  const creator = inboxCreators.find((item) => item.id === thread.creatorId);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-5 sm:p-6">
      <div className="flex items-center gap-3 border-b border-white/8 pb-4">
        {creator ? (
          <Link
            className="size-12 rounded-full bg-cover bg-center"
            href={`/profile/${handleToSlug(creator.handle)}`}
            style={{ backgroundImage: `url(${creator.avatar})` }}
          />
        ) : null}
        <div>
        <h2 className="text-2xl font-semibold text-white">{thread.title}</h2>
        <p className="mt-1 text-sm text-brand-muted">{thread.preview}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {thread.messages.map((message) => (
          <div key={message.id} className={`max-w-[80%] rounded-[1.4rem] px-4 py-3 text-sm ${message.mine ? "ml-auto bg-brand-accent text-slate-950" : "bg-white/8 text-white"}`}>
            <p>{message.body}</p>
            <p className={`mt-2 text-[0.7rem] ${message.mine ? "text-slate-800/75" : "text-white/42"}`}>{message.timestamp}</p>
          </div>
        ))}
      </div>
      <form
        className="mt-5 flex gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!reply.trim()) return;
          onReply(reply.trim());
          setReply("");
        }}
      >
        <input
          className="field-input"
          onChange={(event) => setReply(event.target.value)}
          placeholder="Write a reply..."
          value={reply}
        />
        <button className="rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
