type CreatePreviewProps = {
  caption: string;
  creator: string;
  image: string;
  price: string;
  title: string;
};

export function CreatePreview(props: CreatePreviewProps) {
  const { caption, creator, image, price, title } = props;

  return (
    <section className="relative min-h-[560px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-brand-panel shadow-[0_28px_80px_rgba(1,6,20,0.45)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,12,24,0.08),_rgba(8,11,20,0.9))]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(10,245,134,0.25),transparent_60%)]" />
      <div className="relative flex min-h-[560px] flex-col justify-between gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="w-fit rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur">
            Live Preview
          </div>
          <div className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs text-white/72">
            Web feed layout
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[1.5rem] bg-white/8 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              Creator
            </p>
            <p className="mt-2 text-base font-semibold text-white">{creator}</p>
          </div>
        <div>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            {title || "Your product title"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-7 text-white/75">
            {caption ||
              "Your caption will appear here so you can preview how the post will feel in the live feed."}
          </p>
        </div>
        <div className="flex max-w-sm items-center justify-between rounded-[1.6rem] bg-[#2f3340]/92 p-3 backdrop-blur">
          <div>
            <p className="font-semibold text-white">{title || "Product Name"}</p>
            <p className="text-brand-accent">
              {price ? `$${Number(price || 0).toFixed(2)}` : "$0.00"}
            </p>
          </div>
          <div className="rounded-[1rem] bg-brand-accent px-5 py-3 font-semibold text-slate-950">
            Buy Now
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
