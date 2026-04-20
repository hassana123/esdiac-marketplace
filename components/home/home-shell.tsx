import type { AuthSession } from "@/lib/auth";
import { AppSidebar } from "@/components/app/app-sidebar";
import { FeedStage } from "@/components/home/feed-stage";

type HomeShellProps = {
  initialCategory?: string;
  session: AuthSession;
};

export function HomeShell({ initialCategory, session }: HomeShellProps) {
  return (
    <section className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[94rem] gap-4 xl:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-4 xl:h-[calc(100vh-2rem)]">
          <AppSidebar session={session} />
        </div>
        <FeedStage initialCategory={initialCategory} />
      </div>
    </section>
  );
}
