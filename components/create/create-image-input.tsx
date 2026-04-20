"use client";

import { ImagePlus, Link2, Upload } from "lucide-react";
import { useRef } from "react";

type CreateImageInputProps = {
  image: string;
  onChange: (value: string) => void;
};

export function CreateImageInput({ image, onChange }: CreateImageInputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadFile(file?: File | null) {
    if (!file) return;
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    onChange(dataUrl);
  }

  return (
    <div className="space-y-3">
      <button
        className="group relative flex min-h-64 w-full items-end overflow-hidden rounded-[1.8rem] border border-dashed border-white/14 bg-[#10183a] p-4 text-left"
        onClick={() => fileRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void loadFile(event.dataTransfer.files?.[0]);
        }}
        onPaste={(event) => {
          const file = Array.from(event.clipboardData.items)
            .find((item) => item.type.startsWith("image/"))
            ?.getAsFile();
          void loadFile(file);
        }}
        type="button"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(8,11,20,0.12),_rgba(8,11,20,0.84))]" />
        <div className="relative flex w-full items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Product Cover</p>
            <p className="mt-1 text-sm text-white/68">
              Drag and drop, click to upload, or paste an image
            </p>
          </div>
          <span className="rounded-full bg-white/12 p-3 text-white backdrop-blur">
            <ImagePlus className="size-5" />
          </span>
        </div>
      </button>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
          <Link2 className="size-4 text-white/50" />
          <input
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            onChange={(event) => onChange(event.target.value)}
            placeholder="Or paste an image URL"
            value={image}
          />
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
          onClick={() => fileRef.current?.click()}
          type="button"
        >
          <Upload className="size-4" />
          Upload
        </button>
      </div>
      <input
        accept="image/*"
        className="hidden"
        onChange={(event) => void loadFile(event.target.files?.[0])}
        ref={fileRef}
        type="file"
      />
    </div>
  );
}
