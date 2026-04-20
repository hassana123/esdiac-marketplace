"use client";

import { useState } from "react";
import type { ProductComment } from "@/lib/mock/products";

type FeedCommentsProps = {
  author: string;
  comments: ProductComment[];
  open: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
};

export function FeedComments(props: FeedCommentsProps) {
  const { author, comments, open, onClose, onSubmit } = props;
  const [value, setValue] = useState("");

  if (!open) return null;

  return (
    <div className="absolute inset-x-4 bottom-4 z-20 rounded-[1.8rem] border border-white/10 bg-[#091127]/96 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur sm:inset-x-auto sm:right-6 sm:top-24 sm:w-[360px] sm:bottom-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Comments</h3>
        <button className="text-sm text-brand-accent" onClick={onClose} type="button">
          Close
        </button>
      </div>
      <div className="mt-4 max-h-64 space-y-3 overflow-auto pr-1">
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-2xl bg-white/6 p-3">
            <p className="text-sm font-semibold text-white">{comment.author}</p>
            <p className="mt-1 text-sm text-brand-muted">{comment.text}</p>
          </div>
        ))}
      </div>
      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (!value.trim()) return;
          onSubmit(value.trim());
          setValue("");
        }}
      >
        <textarea
          className="h-24 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand-accent"
          onChange={(event) => setValue(event.target.value)}
          placeholder={`Comment as ${author}`}
          value={value}
        />
        <button className="w-full rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" type="submit">
          Post Comment
        </button>
      </form>
    </div>
  );
}
