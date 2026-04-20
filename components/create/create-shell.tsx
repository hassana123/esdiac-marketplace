"use client";

import { useState } from "react";
import type { AuthSession } from "@/lib/auth";
import { AppSidebar } from "@/components/app/app-sidebar";
import { CreateForm } from "@/components/create/create-form";
import { CreatePreview } from "@/components/create/create-preview";
import type { PreviewState } from "@/components/create/create-types";
import { useMarketplace } from "@/components/marketplace/marketplace-context";

type CreateShellProps = {
  session: AuthSession;
};

export function CreateShell({ session }: CreateShellProps) {
  const { categories } = useMarketplace();
  const [preview, setPreview] = useState<PreviewState>({
    caption:
      "Launch your next product with a full-bleed visual, creator identity, and a strong marketplace CTA.",
    creator: `@${session.name.toLowerCase().replace(/\s+/g, "_")}`,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
    price: "88",
    title: "Preview Product",
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,245,134,0.09),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(80,110,255,0.12),transparent_26%)]" />
      <div className="mx-auto grid max-w-[96rem] gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)_420px]">
        <div className="relative xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <div className="relative">
          <CreateForm
            categories={categories}
            onPreviewChange={setPreview}
            session={session}
          />
        </div>
        <div className="relative xl:col-span-2 2xl:col-span-1">
          <CreatePreview {...preview} />
        </div>
      </div>
    </section>
  );
}
