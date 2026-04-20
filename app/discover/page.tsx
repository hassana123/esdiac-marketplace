import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DiscoverShell } from "@/components/discover/discover-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function DiscoverPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  return <DiscoverShell session={session} />;
}
