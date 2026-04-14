type FeedCreatorProps = {
  name: string;
  handle: string;
  caption: string;
  avatar: string;
};

export function FeedCreator({
  name,
  handle,
  caption,
  avatar,
}: FeedCreatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-label={name}
        className="size-12 rounded-full border-2 border-brand-accent bg-cover bg-center"
        role="img"
        style={{ backgroundImage: `url(${avatar})` }}
      />
      <div>
        <p className="font-semibold text-white">{handle}</p>
        <p className="text-sm text-white/75">{caption}</p>
      </div>
    </div>
  );
}
