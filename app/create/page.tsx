import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CreateShell } from "@/components/create/create-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function CreatePage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  return <CreateShell session={session} />;
}
