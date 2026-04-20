import { FeedHeader } from "@/components/home/feed-header";

type FeedEmptyStateProps = {
  activeTab: "for-you" | "following";
  onDiscover: () => void;
  onTabChange: (tab: "for-you" | "following") => void;
};

export function FeedEmptyState(props: FeedEmptyStateProps) {
  const { activeTab, onDiscover, onTabChange } = props;

  return (
    <section className="rounded-[2rem] border border-white/10 bg-brand-panel p-10 text-white">
      <FeedHeader
        activeTab={activeTab}
        onDiscover={onDiscover}
        onNext={() => {}}
        onTabChange={onTabChange}
      />
      <p className="mt-8 text-brand-muted">
        No posts match this feed yet. Try switching back to `For You` or another
        category.
      </p>
    </section>
  );
}
