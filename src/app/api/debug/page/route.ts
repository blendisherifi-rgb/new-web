/**
 * Dev-only API to inspect raw GraphQL response for a page.
 * GET /api/debug/page?slug=new-homepage
 * Helps diagnose when sections don't load (wrong path, type names, etc.).
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/wordpress";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 404 });
  }

  const slug = req.nextUrl.searchParams.get("slug") ?? "new-homepage";
  const uriVariants = [`/${slug}`, slug, `${slug}/`];

  const query = `
    query DebugPageMinimal($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        pageContentSections {
          sections {
            __typename
            fieldGroupName
          }
        }
      }
    }
  `;

  const results: Array<{ id: string; data: unknown }> = [];

  for (const id of uriVariants) {
    try {
      const data = await fetchGraphQL<{ page?: unknown }>(query, {
        variables: { id, idType: "URI" },
      });
      results.push({ id, data, error: null });
      const page = (data as { page?: { id?: string } }).page;
      if (page) break; // found a page
    } catch (err) {
      results.push({
        id,
        data: null,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return NextResponse.json({
    slug,
    urisTried: uriVariants,
    results,
    note: "Use __typename from sections to set ACF_LAYOUT_TYPE_PREFIX and ACF_LAYOUT_SUFFIX.",
  });
}
