import { ResourcesHubExperience } from "@/components/resources/ResourcesHubExperience";
import {
  coerceResourceHubPageQueryParam,
  coerceResourceHubTypeQueryParam,
  coerceResourceHubTypesQueryParam,
  fetchResourcesHubBundle,
  parseResourceHubKindsFilter,
  parseResourceHubPageParam,
} from "@/lib/resources-hub";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

interface ResourcesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string | string[];
    type?: string | string[];
    types?: string | string[];
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ResourcesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Resources & Insights | SoftCo",
    fallbackDescription: "Articles, whitepapers, and videos on P2P and AP automation.",
    locale,
    path: "resources",
  });
}

export default async function ResourcesPage({ params, searchParams }: ResourcesPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "us";
  const search = await searchParams;
  const kindsFilter = parseResourceHubKindsFilter(
    coerceResourceHubTypeQueryParam(search.type),
    coerceResourceHubTypesQueryParam(search.types),
  );
  const gridPage = parseResourceHubPageParam(coerceResourceHubPageQueryParam(search.page));

  const bundle = await fetchResourcesHubBundle(locale);

  return (
    <ResourcesHubExperience
      bundle={bundle}
      locale={locale}
      initialKindsFilter={kindsFilter}
      initialPage={gridPage}
    />
  );
}
