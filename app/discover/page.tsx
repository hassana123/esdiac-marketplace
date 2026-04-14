import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DiscoverShell } from "@/components/discover/discover-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";
import { getDiscoverCategories } from "@/lib/api/discover";

export default async function DiscoverPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  const categories = await getDiscoverCategories();
  return <DiscoverShell categories={categories} session={session} />;
}
