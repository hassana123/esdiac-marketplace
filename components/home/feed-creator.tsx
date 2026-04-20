import Link from "next/link";
import { useState } from "react";
import { handleToSlug } from "@/lib/profile-utils";

type FeedCreatorProps = {
  name: string;
  handle: string;
  caption: string;
  avatar: string;
  following: boolean;
  isOwner?: boolean;
  onToggleFollow: () => void;
};

export function FeedCreator({
  name,
  handle,
  caption,
  avatar,
  following,
  isOwner,
  onToggleFollow,
}: FeedCreatorProps) {
  const [expanded, setExpanded] = useState(false);
  const words = caption.split(" ");
  const shortCaption =
    words.length > 10 ? `${words.slice(0, 10).join(" ")}...` : caption;

  return (
    <div className="flex items-center gap-3">
      <Link
        aria-label={name}
        className="size-12 rounded-full border-2 border-brand-accent bg-cover bg-center"
        href={`/profile/${handleToSlug(handle)}`}
        style={{ backgroundImage: `url(${avatar})` }}
      />
      <div>
        <p className="font-semibold text-white">{handle}</p>
        <p className="text-sm text-white/75">
          {expanded ? caption : shortCaption}{" "}
          {words.length > 10 ? (
            <button
              className="font-semibold text-brand-accent"
              onClick={() => setExpanded((current) => !current)}
              type="button"
            >
              {expanded ? "show less" : "show more"}
            </button>
          ) : null}
        </p>
      </div>
      {!isOwner ? (
        <button
          className={`ml-auto rounded-full px-4 py-2 text-sm font-semibold ${following ? "bg-white/12 text-white" : "bg-brand-accent text-slate-950"}`}
          onClick={onToggleFollow}
          type="button"
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      ) : null}
    </div>
  );
}
