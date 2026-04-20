import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AlertsShell } from "@/components/alerts/alerts-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function AlertsPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  return <AlertsShell session={session} />;
}
