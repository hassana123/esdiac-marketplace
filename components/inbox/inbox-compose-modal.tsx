"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { InboxCreator } from "@/lib/mock/inbox";

type InboxComposeModalProps = {
  creators: InboxCreator[];
  open: boolean;
  onClose: () => void;
  onSend: (creatorId: string, message: string) => void;
};

export function InboxComposeModal(props: InboxComposeModalProps) {
  const { creators, open, onClose, onSend } = props;
  const [search, setSearch] = useState("");
  const [creatorId, setCreatorId] = useState(creators[0]?.id ?? "");
  const [message, setMessage] = useState("");
  const filtered = creators.filter((creator) =>
    `${creator.name} ${creator.handle}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (!open) return null;

  return (
    <>
      <button aria-label="Close compose" className="fixed inset-0 z-40 bg-black/45" onClick={onClose} type="button" />
      <div className="fixed inset-x-4 top-16 z-50 mx-auto max-w-lg rounded-[2rem] border border-white/10 bg-[#091127] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl font-semibold text-white">New Message</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
            <Search className="size-4 text-white/40" />
            <input className="w-full bg-transparent text-white outline-none placeholder:text-white/30" onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts" value={search} />
          </div>
          <div className="max-h-52 space-y-2 overflow-auto">
            {filtered.map((creator) => (
              <button
                key={creator.id}
                className={`flex w-full items-center gap-3 rounded-[1.4rem] px-3 py-3 text-left ${creatorId === creator.id ? "bg-brand-accent text-slate-950" : "bg-white/6 text-white"}`}
                onClick={() => setCreatorId(creator.id)}
                type="button"
              >
                <div className="size-11 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${creator.avatar})` }} />
                <div>
                  <p className="font-semibold">{creator.name}</p>
                  <p className={`text-sm ${creatorId === creator.id ? "text-slate-800/70" : "text-white/45"}`}>{creator.handle}</p>
                </div>
              </button>
            ))}
          </div>
          <textarea className="field-input min-h-32" onChange={(e) => setMessage(e.target.value)} placeholder="Send a message..." value={message} />
          <div className="flex gap-3">
            <button className="flex-1 rounded-full border border-white/12 px-5 py-3 text-white" onClick={onClose} type="button">Cancel</button>
            <button
              className="flex-1 rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950"
              onClick={() => {
                if (!message.trim()) return;
                onSend(creatorId, message.trim());
                setMessage("");
                onClose();
              }}
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
