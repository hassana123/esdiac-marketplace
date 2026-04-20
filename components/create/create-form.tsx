"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import type { AuthSession } from "@/lib/auth";
import type { DiscoverCategory } from "@/lib/mock/categories";
import { CreateField } from "@/components/create/create-field";
import { CreateImageInput } from "@/components/create/create-image-input";
import type { PreviewState } from "@/components/create/create-types";
import { useMarketplace } from "@/components/marketplace/marketplace-context";
import { Button } from "@/components/ui/button";

type CreateFormProps = {
  categories: DiscoverCategory[];
  onPreviewChange: (preview: PreviewState) => void;
  session: AuthSession;
};

const sampleImage =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80";

export function CreateForm({ categories, onPreviewChange, session }: CreateFormProps) {
  const router = useRouter();
  const { createProduct } = useMarketplace();
  const [form, setForm] = useState({
    title: "",
    price: "",
    caption: "",
    image: sampleImage,
    categoryId: categories[0]?.id ?? "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    const next = { ...form, [key]: value };
    setForm(next);
    onPreviewChange({
      caption: next.caption,
      creator: `@${session.name.toLowerCase().replace(/\s+/g, "_")}`,
      image: next.image,
      price: next.price,
      title: next.title,
    });
  }

  return (
    <form
      className="space-y-6 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,27,58,0.96),rgba(9,15,34,0.96))] p-6 shadow-[0_28px_80px_rgba(1,6,20,0.45)] sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(() => {
          const product = createProduct({
            caption: form.caption,
            categoryId: form.categoryId,
            creatorName: session.name,
            handle: `@${session.name.toLowerCase().replace(/\s+/g, "_")}`,
            image: form.image,
            price: Number(form.price),
            productName: form.title,
          });
          router.push(`/home?category=${product.categoryIds[0]}`);
          router.refresh();
        });
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/45">CREATE POST</p>
          <h1 className="mt-4 max-w-xl text-3xl font-semibold text-white sm:text-4xl">
            Build a product story that feels native to the feed.
          </h1>
        </div>
        <div className="rounded-full border border-brand-accent/20 bg-brand-accent/10 px-4 py-2 text-sm text-brand-accent">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="size-4" />
            Creator Composer
          </span>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <CreateImageInput image={form.image} onChange={(value) => update("image", value)} />
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
            <CreateField hint="Keep it punchy" label="Product title">
              <input
                className="field-input bg-white/10"
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </CreateField>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <CreateField hint="USD" label="Price">
              <input
                className="field-input bg-white/10"
                min="1"
                required
                step="0.01"
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
              />
            </CreateField>
          </div>
        </div>
        <div className="space-y-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
          <CreateField hint="Where it appears" label="Category">
            <select
              className="field-input bg-white/10"
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
            >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
            </select>
          </CreateField>
          <CreateField hint="This drives the preview" label="Caption">
            <textarea
              className="field-input min-h-40 bg-white/10"
              required
              value={form.caption}
              onChange={(e) => update("caption", e.target.value)}
            />
          </CreateField>
          <div className="grid gap-3 rounded-[1.5rem] bg-[#0c1430]/88 p-4 text-sm text-white/72">
            <p>Upload from your device, drag an image in, or paste directly from clipboard.</p>
            <p>Posts are instantly added to the live marketplace feed after publishing.</p>
          </div>
        </div>
      </div>
      <Button className="w-full">Post Product</Button>
    </form>
  );
}
