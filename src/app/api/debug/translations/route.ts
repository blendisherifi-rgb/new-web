/**
 * Dev-only API to inspect WPML translations for a page.
 * GET /api/debug/translations?slug=contact-us
 * Shows the raw language.code values returned by WPGraphQL WPML so you can
 * verify they match the LOCALE_TO_WPML map in src/lib/i18n.ts.
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchGraphQL } from "@/lib/wordpress";

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Only available in development" }, { status: 404 });
  }

  const slug = req.nextUrl.searchParams.get("slug") ?? "contact-us";

  const query = `
    query DebugTranslations($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        id
        title
        language { code }
        translations {
          id
          title
          language { code }
        }
      }
    }
  `;

  const uriVariants = [`/${slug}`, slug];
  let result: unknown = null;

  for (const id of uriVariants) {
    try {
      const data = await fetchGraphQL<{ page?: unknown }>(query, {
        variables: { id, idType: "URI" },
      });
      const page = (data as { page?: unknown }).page;
      if (page) {
        result = page;
        break;
      }
    } catch (err) {
      result = { error: err instanceof Error ? err.message : String(err) };
    }
  }

  return NextResponse.json({
    slug,
    page: result,
    note: "Check language.code on each translation — these must match LOCALE_TO_WPML values in src/lib/i18n.ts (case-insensitive).",
  });
}
