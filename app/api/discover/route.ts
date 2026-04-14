import { NextResponse } from "next/server";
import { discoverCategories } from "@/lib/mock/discover";

export async function GET() {
  return NextResponse.json(discoverCategories);
}
