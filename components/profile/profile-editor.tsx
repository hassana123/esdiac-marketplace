"use client";

import { useState } from "react";
import type { OwnProfileDraft } from "@/lib/profile-storage";

type ProfileEditorProps = {
  initial: OwnProfileDraft;
  open: boolean;
  onClose: () => void;
  onSave: (profile: OwnProfileDraft) => void;
};

export function ProfileEditor({ initial, open, onClose, onSave }: ProfileEditorProps) {
  const [form, setForm] = useState(initial);
  if (!open) return null;

  return (
    <>
      <button aria-label="Close profile editor" className="fixed inset-0 z-40 bg-black/45" onClick={onClose} type="button" />
      <div className="fixed inset-x-4 top-14 z-50 mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-[#091127] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>
        <div className="mt-5 space-y-4">
          <input className="field-input" onChange={(e) => setForm((c) => ({ ...c, displayName: e.target.value }))} placeholder="Display name" value={form.displayName} />
          <input className="field-input" onChange={(e) => setForm((c) => ({ ...c, avatar: e.target.value }))} placeholder="Avatar URL" value={form.avatar} />
          <textarea className="field-input min-h-32" onChange={(e) => setForm((c) => ({ ...c, bio: e.target.value }))} placeholder="Bio" value={form.bio} />
          <div className="flex gap-3">
            <button className="flex-1 rounded-full border border-white/12 px-5 py-3 text-white" onClick={onClose} type="button">Cancel</button>
            <button className="flex-1 rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" onClick={() => onSave(form)} type="button">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
