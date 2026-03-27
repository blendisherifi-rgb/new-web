import { NextResponse } from "next/server";
import { diagnoseCaseStudiesData } from "@/lib/case-studies";

/**
 * GET /api/debug/case-studies — development only.
 * Shows whether GraphQL + REST can see the Case Studies parent and child pages (no secrets).
 */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 404 });
  }

  try {
    const data = await diagnoseCaseStudiesData();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
