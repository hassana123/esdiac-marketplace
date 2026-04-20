import { NextResponse } from "next/server";
import { discoverCategories } from "@/lib/mock/categories";

export async function GET() {
  return NextResponse.json(discoverCategories);
}
