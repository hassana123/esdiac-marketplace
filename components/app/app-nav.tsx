"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { appNavItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppNav() {
  const pathname = usePathname();
  const [note, setNote] = useState("");

  return (
    <div className="space-y-3">
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[#0c1430]/90 px-3 py-2 backdrop-blur-xl lg:flex-col lg:items-stretch lg:rounded-[2rem] lg:p-4">
        {appNavItems.map(({ label, href, icon: Icon, note: itemNote }) =>
          href ? (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-white/58 transition hover:bg-white/6 hover:text-white lg:flex-row lg:px-4 lg:py-3",
                pathname === href &&
                  "bg-brand-accent text-slate-950 shadow-[0_12px_30px_rgba(10,245,134,0.28)]",
              )}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </Link>
          ) : (
            <button
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-white/58 transition hover:bg-white/6 hover:text-white lg:flex-row lg:px-4 lg:py-3"
              onClick={() => setNote(itemNote ?? "")}
              type="button"
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </button>
          ),
        )}
      </nav>
      {note ? (
        <p className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-brand-muted">
          {note}
        </p>
      ) : null}
    </div>
  );
}
