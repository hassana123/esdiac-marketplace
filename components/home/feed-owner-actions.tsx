"use client";

import { Pencil, Trash2 } from "lucide-react";

type FeedOwnerActionsProps = {
  onDelete: () => void;
  onEdit: () => void;
};

export function FeedOwnerActions({ onDelete, onEdit }: FeedOwnerActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-full bg-white/10 p-3 text-white/80" onClick={onEdit} type="button">
        <Pencil className="size-4" />
      </button>
      <button className="rounded-full bg-white/10 p-3 text-white/80" onClick={onDelete} type="button">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
