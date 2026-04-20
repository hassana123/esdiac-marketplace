"use client";

import { useState } from "react";
import type { MarketplaceProduct } from "@/lib/mock/products";

type FeedEditModalProps = {
  onClose: () => void;
  onSave: (updates: { caption: string; price: number; productName: string }) => void;
  open: boolean;
  post: MarketplaceProduct;
};

export function FeedEditModal({ onClose, onSave, open, post }: FeedEditModalProps) {
  const [form, setForm] = useState({
    caption: post.creator.caption,
    price: String(post.price),
    productName: post.productName,
  });

  if (!open) return null;

  return (
    <>
      <button aria-label="Close edit post" className="fixed inset-0 z-40 bg-black/45" onClick={onClose} type="button" />
      <div className="fixed inset-x-4 top-14 z-50 mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-[#091127] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl font-semibold text-white">Edit Post</h2>
        <div className="mt-5 space-y-4">
          <input className="field-input" onChange={(e) => setForm((c) => ({ ...c, productName: e.target.value }))} value={form.productName} />
          <input className="field-input" onChange={(e) => setForm((c) => ({ ...c, price: e.target.value }))} type="number" value={form.price} />
          <textarea className="field-input min-h-32" onChange={(e) => setForm((c) => ({ ...c, caption: e.target.value }))} value={form.caption} />
          <div className="flex gap-3">
            <button className="flex-1 rounded-full border border-white/12 px-5 py-3 text-white" onClick={onClose} type="button">Cancel</button>
            <button className="flex-1 rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" onClick={() => onSave({ caption: form.caption, price: Number(form.price), productName: form.productName })} type="button">Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
