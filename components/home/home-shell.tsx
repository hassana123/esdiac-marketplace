import type { AuthSession } from "@/lib/auth";
import type { FeedPost } from "@/lib/mock/feed";
import { AppSidebar } from "@/components/app/app-sidebar";
import { FeedStage } from "@/components/home/feed-stage";

type HomeShellProps = {
  posts: FeedPost[];
  session: AuthSession;
};

export function HomeShell({ posts, session }: HomeShellProps) {
  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <FeedStage posts={posts} />
      </div>
    </section>
  );
}
