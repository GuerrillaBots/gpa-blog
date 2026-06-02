import { NextRequest, NextResponse } from "next/server";
import { addReaction } from "@/lib/redis";

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  const type = req.nextUrl.searchParams.get("type") as "up" | "down";
  if (!slug || !["up", "down"].includes(type)) {
    return NextResponse.json({ error: "invalid params" }, { status: 400 });
  }
  const count = await addReaction(slug, type);
  return NextResponse.json({ count });
}
