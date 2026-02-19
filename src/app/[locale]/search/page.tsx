import { SearchPageContent } from "./SearchPageContent";
import { searchContent } from "@/lib/search";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";
import type { SearchResultType } from "@/lib/search";

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; type?: string }>;
}

export async function generateMetadata({ params }: SearchPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Search | SoftCo",
    fallbackDescription: "Search SoftCo for pages, case studies, resources, and news.",
    locale,
    path: "search",
  });
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const { q, type } = await searchParams;

  const typeFilter = type && ["page", "post", "case_study", "resource", "news"].includes(type)
    ? (type as SearchResultType)
    : undefined;

  const { results } = q?.trim()
    ? await searchContent(q.trim(), locale, { contentTypes: typeFilter ? [typeFilter] : undefined })
    : { results: [] };

  return (
    <SearchPageContent
      locale={locale}
      initialQuery={q ?? ""}
      initialType={type ?? ""}
      initialResults={results}
    />
  );
}

