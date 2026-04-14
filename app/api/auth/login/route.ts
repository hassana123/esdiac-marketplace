import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, serializeSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  const name = email?.split("@")[0] ?? "esdiac_user";
  const session = { email, name };
  const response = NextResponse.json(session);
  response.cookies.set(SESSION_COOKIE, serializeSession(session), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  return response;
}
