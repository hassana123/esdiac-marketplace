import { NextResponse } from "next/server";
import { marketplaceProducts } from "@/lib/mock/products";

export async function GET() {
  return NextResponse.json(marketplaceProducts);
}
