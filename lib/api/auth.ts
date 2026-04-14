import type { AuthSession } from "@/lib/auth";

type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

async function submitAuth(path: string, payload: AuthPayload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Authentication failed");
  return (await response.json()) as AuthSession;
}

export function login(payload: AuthPayload) {
  return submitAuth("/api/auth/login", payload);
}

export function signup(payload: AuthPayload) {
  return submitAuth("/api/auth/signup", payload);
}
