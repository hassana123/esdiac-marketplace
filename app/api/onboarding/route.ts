import { NextResponse } from "next/server";
import { onboardingContent } from "@/lib/mock/onboarding";

export async function GET() {
  return NextResponse.json(onboardingContent);
}
