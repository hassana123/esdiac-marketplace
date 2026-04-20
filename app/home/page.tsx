import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HomeShell } from "@/components/home/home-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  const params = await searchParams;
  return <HomeShell initialCategory={params.category} session={session} />;
}
