import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { InboxShell } from "@/components/inbox/inbox-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function InboxPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  return <InboxShell session={session} />;
}
