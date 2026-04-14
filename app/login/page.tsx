import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { parseSession, SESSION_COOKIE } from "@/lib/auth";

export default async function LoginPage() {
  const session = parseSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (session) redirect("/home");
  return (
    <AuthShell
      title="Log in to your social shopping world."
      subtitle="Pick up where you left off, explore trending products, and keep your storefront moving."
      footerLabel="New to Esdiac?"
      footerHref="/signup"
      footerLinkLabel="Create an account"
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
