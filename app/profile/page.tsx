import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileShell } from "@/components/profile/profile-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function OwnProfilePage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login");
  return <ProfileShell session={session} />;
}
