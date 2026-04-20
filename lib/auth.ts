export type AuthSession = {
  email: string;
  name: string;
};

export const SESSION_COOKIE = "esdiac-session";

export function serializeSession(session: AuthSession) {
  return encodeURIComponent(JSON.stringify(session));
}

export function parseSession(value?: string) {
  if (!value) return null;
  try {
    return JSON.parse(decodeURIComponent(value)) as AuthSession;
  } catch {
    return null;
  }
}

export function getSessionUserId(session: AuthSession | null) {
  return session?.email?.toLowerCase() || "guest";
}
