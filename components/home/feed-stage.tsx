"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FeedActions } from "@/components/home/feed-actions";
import { FeedCreator } from "@/components/home/feed-creator";
import { FeedHeader } from "@/components/home/feed-header";
import { FeedProductCard } from "@/components/home/feed-product-card";
import type { FeedPost } from "@/lib/mock/feed";

type FeedStageProps = {
  posts: FeedPost[];
};

export function FeedStage({ posts }: FeedStageProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [shareBoost, setShareBoost] = useState<Record<string, number>>({});
  const [message, setMessage] = useState("Use the down button or your trackpad to browse posts.");
  const post = posts[index % posts.length];

  function nextPost() {
    setIndex((current) => (current + 1) % posts.length);
  }

  function handleWheel(event: React.WheelEvent<HTMLElement>) {
    if (event.deltaY > 20) nextPost();
  }

  return (
    <section
      className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-brand-panel"
      onWheel={handleWheel}
    >
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${post.image})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(12,12,24,0.18),_rgba(10,13,24,0.72)_66%,_rgba(8,11,20,0.95))]" />
      <div className="relative flex h-full min-h-[620px] flex-col justify-between p-5 sm:p-7">
        <FeedHeader onDiscover={() => router.push("/discover")} onNext={nextPost} />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md space-y-4">
            <FeedCreator {...post.creator} />
            <FeedProductCard
              productName={post.productName}
              price={post.price}
              onBuy={() => setMessage(`Added ${post.productName} to your quick cart.`)}
            />
            <p className="rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/80 backdrop-blur">
              {message}
            </p>
          </div>
          <FeedActions
            comments={post.stats.comments}
            liked={Boolean(likedPosts[post.id])}
            likes={post.stats.likes + (likedPosts[post.id] ? 1 : 0)}
            onComment={() => setMessage(`Replying to ${post.creator.handle} opens next.`)}
            onLike={() =>
              setLikedPosts((current) => ({ ...current, [post.id]: !current[post.id] }))
            }
            onShare={() => {
              setShareBoost((current) => ({ ...current, [post.id]: (current[post.id] ?? 0) + 1 }));
              setMessage(`Shared ${post.productName}. Keeping the feed moving.`);
            }}
            shares={post.stats.shares + (shareBoost[post.id] ?? 0)}
          />
        </div>
      </div>
    </section>
  );
}
