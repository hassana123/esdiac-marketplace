import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HomeShell } from "@/components/home/home-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";
import { getHomeFeed } from "@/lib/api/feed";

export default async function HomePage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  const posts = await getHomeFeed();
  return <HomeShell posts={posts} session={session} />;
}
