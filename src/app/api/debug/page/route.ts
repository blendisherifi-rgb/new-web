/**
 * Dev-only API to inspect raw GraphQL response for a page.
 * GET /api/debug/page?slug=contact-us
 * GET /api/debug/page?id=<wpNodeId>
 * GET /api/debug/page?introspect=PageContentSectionsSectionsAiEngineSectionLayout
 * Shows the full raw field values returned by WP for each section.
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/wordpress";
import { PAGE_SECTIONS_FRAGMENT } from "@/lib/graphql/page-sections-query";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 404 });
  }

  // Introspect a specific type to discover its available fields
  const introspectType = req.nextUrl.searchParams.get("introspect");
  if (introspectType) {
    try {
      const data = await fetchGraphQL<{ __type?: { fields?: Array<{ name: string; type: { name?: string; kind: string; ofType?: { name?: string } } }> } }>(`
        query IntrospectType {
          __type(name: "${introspectType}") {
            fields {
              name
              type { name kind ofType { name } }
            }
          }
        }
      `);
      return NextResponse.json({ type: introspectType, fields: data.__type?.fields ?? [] });
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : String(err) });
    }
  }

  const slug = req.nextUrl.searchParams.get("slug") ?? "contact-us";
  const idParam = req.nextUrl.searchParams.get("id"); // optional WP node ID
  const uriVariants = idParam ? [idParam] : [`/${slug}`, slug, `${slug}/`];
  const idType = idParam ? "ID" : "URI";

  const query = `
    query DebugPageFull($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        language { code }
        translations { id language { code } }
        pageContentSections {
          sections {
            __typename
            ... on PageContentSectionsSectionsAiEngineSectionLayout {
              overline
              aiEngineTabs { label title body }
            }
            ... on PageContentSectionsSectionsTrustBarSectionLayout {
              heading
              trustBarLogos { imageAlt image { node { sourceUrl } } }
            }
          }
        }
      }
    }
  `;

  const results: Array<{ id: string; data: unknown; error?: string }> = [];

  for (const id of uriVariants) {
    try {
      const data = await fetchGraphQL<{ page?: unknown }>(query, {
        variables: { id, idType },
      });
      results.push({ id, data });
      const page = (data as { page?: { id?: string } }).page;
      if (page) break;
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
    idType,
    urisTried: uriVariants,
    results,
    note: "Add ?id=<wpNodeId> to fetch a specific page by its WP node ID (e.g. from translations[].id).",
  });
}
