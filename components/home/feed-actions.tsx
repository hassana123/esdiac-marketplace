import { Heart, MessageCircle, Share2 } from "lucide-react";
import { formatCompactNumber } from "@/components/home/feed-utils";

type FeedActionsProps = {
  liked: boolean;
  likes: number;
  comments: number;
  shares: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
};

export function FeedActions(props: FeedActionsProps) {
  const { liked, likes, comments, shares, onLike, onComment, onShare } = props;

  return (
    <div className="flex gap-3 self-end lg:flex-col">
      <Action
        active={liked}
        icon={<Heart className={`size-5 ${liked ? "fill-current" : ""}`} />}
        label={formatCompactNumber(likes)}
        onClick={onLike}
      />
      <Action
        icon={<MessageCircle className="size-5" />}
        label={formatCompactNumber(comments)}
        onClick={onComment}
      />
      <Action
        icon={<Share2 className="size-5" />}
        label={formatCompactNumber(shares)}
        onClick={onShare}
      />
    </div>
  );
}

type ActionProps = {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

function Action({ active = false, icon, label, onClick }: ActionProps) {
  return (
    <button
      className={`flex min-w-20 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white backdrop-blur transition lg:min-w-0 lg:flex-col lg:rounded-[1.4rem] ${active ? "bg-brand-accent/90 text-slate-950" : "bg-white/12 hover:bg-white/18"}`}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
