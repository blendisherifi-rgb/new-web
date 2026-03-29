import { NextRequest, NextResponse } from "next/server";
import { searchContent, SEARCH_PAGE_SIZE } from "@/lib/search";
import { isLocale } from "@/lib/i18n";
import type { SearchResultType } from "@/lib/search";

/**
 * JSON search — WordPress REST `/wp/v2/search` + GraphQL fallback (see `lib/search.ts`).
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const localeParam = req.nextUrl.searchParams.get("locale") ?? "us";
  const pageParam = req.nextUrl.searchParams.get("page");
  const perParam = req.nextUrl.searchParams.get("per_page");
  const typeParam = req.nextUrl.searchParams.get("type");

  if (!isLocale(localeParam)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  if (q.length <= 3) {
    return NextResponse.json({
      results: [],
      hasMore: false,
      page: 1,
      totalPages: 1,
    });
  }

  const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);
  const perPage = Math.min(
    50,
    Math.max(1, parseInt(perParam || String(SEARCH_PAGE_SIZE), 10) || SEARCH_PAGE_SIZE),
  );

  const typeFilter =
    typeParam && ["page", "post", "case_study", "resource", "news"].includes(typeParam)
      ? ([typeParam] as SearchResultType[])
      : undefined;

  const { results, hasMore, page: outPage, totalPages } = await searchContent(q, localeParam, {
    page,
    perPage,
    contentTypes: typeFilter,
  });

  return NextResponse.json({ results, hasMore, page: outPage, totalPages });
}
