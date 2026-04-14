import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function SignupPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (session) redirect("/home");
  return (
    <AuthShell
      title="Create your Esdiac account."
      subtitle="Join a marketplace built for discovery-first commerce, creator storytelling, and instant shopping."
      footerLabel="Already have an account?"
      footerHref="/login"
      footerLinkLabel="Log in"
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
