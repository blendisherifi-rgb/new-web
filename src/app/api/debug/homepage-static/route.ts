import { NextResponse } from "next/server";
import { fetchPageData } from "@/lib/pages";

/**
 * Temporary debug endpoint for static homepage payload.
 * Useful while iterating on section content without ACF/WP updates.
 */
export async function GET() {
  const pageData = await fetchPageData("/", "us");
  return NextResponse.json(pageData ?? { title: "SoftCo", sections: [] });
}

