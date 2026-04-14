import { NextResponse } from "next/server";
import { homeFeed } from "@/lib/mock/feed";

export async function GET() {
  return NextResponse.json(homeFeed);
}
