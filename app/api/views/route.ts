import { NextRequest, NextResponse } from "next/server";
import { getPostStats, incrementViews } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });
  const stats = await getPostStats(slug);
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "missing slug" }, { status: 400 });
  const views = await incrementViews(slug);
  return NextResponse.json({ views });
}
