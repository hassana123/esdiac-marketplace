"use client";

import { Menu, Plus, Share2 } from "lucide-react";

type ProfileHeaderProps = {
  avatar: string;
  bio: string;
  canEdit: boolean;
  displayName: string;
  followingCreator?: boolean;
  followers: string;
  following: string;
  handle: string;
  likes: string;
  onCreatePost?: () => void;
  onEdit: () => void;
  onShare: () => void;
  onToggleFollow?: () => void;
};

export function ProfileHeader(props: ProfileHeaderProps) {
  const { avatar, bio, canEdit, displayName, followingCreator, followers, following, handle, likes, onCreatePost, onEdit, onShare, onToggleFollow } = props;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[#0c1430]/92 p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="break-all text-xl font-semibold text-white">{handle.replace("@", "")}</p>
        </div>
        <button className="rounded-full border border-white/10 p-3 text-white/75" type="button"><Menu className="size-5" /></button>
      </div>
      <div className="mt-6 flex flex-col items-center text-center">
        <div className="relative">
          <div className="size-28 rounded-full border-4 border-brand-accent bg-cover bg-center" style={{ backgroundImage: `url(${avatar})` }} />
          {canEdit ? (
            <button
              aria-label="Create post"
              className="absolute bottom-1 right-1 rounded-full bg-brand-accent p-2 text-slate-950 transition hover:scale-105"
              onClick={onCreatePost}
              type="button"
            >
              <Plus className="size-4" />
            </button>
          ) : null}
        </div>
        <h1 className="mt-5 break-words text-3xl font-semibold text-white sm:text-4xl">{displayName}</h1>
        <p className="mt-2 break-all text-lg text-white/55">{handle}</p>
        <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">{bio}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-center sm:gap-8">
          <Stat label="Following" value={following} />
          <Stat label="Followers" value={followers} />
          <Stat label="Likes" value={likes} />
        </div>
        <div className="mt-6 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
          {canEdit ? <button className="flex-1 rounded-full bg-white/10 px-5 py-3 font-semibold text-white" onClick={onEdit} type="button">Edit Profile</button> : null}
          {!canEdit ? <button className={`flex-1 rounded-full px-5 py-3 font-semibold ${followingCreator ? "bg-white/10 text-white" : "bg-brand-accent text-slate-950"}`} onClick={onToggleFollow} type="button">{followingCreator ? "Unfollow" : "Follow"}</button> : null}
          <button className="flex-1 rounded-full bg-brand-accent px-5 py-3 font-semibold text-slate-950" onClick={onShare} type="button"><span className="inline-flex items-center gap-2"><Share2 className="size-4" />Share Profile</span></button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="min-w-[88px]"><p className="text-3xl font-semibold text-white">{value}</p><p className="mt-1 text-sm text-brand-muted">{label}</p></div>;
}
