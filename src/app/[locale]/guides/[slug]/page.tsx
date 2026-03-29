import { notFound } from "next/navigation";
import { ResourcesHubEntryPage } from "@/components/resources/ResourcesHubEntryPage";
import { fetchResourceHubEntryBySlug } from "@/lib/resources-hub-detail";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, localePath } from "@/lib/i18n";

interface GuidePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "guide");
  if (!item) return {};
  return buildMetadataFromYoast({
    seo: item.seo,
    fallbackTitle: `${item.title} | SoftCo`,
    fallbackDescription: item.excerpt ?? undefined,
    locale,
    path: `guides/${slug}`,
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "guide");
  if (!item) notFound();

  return (
    <ResourcesHubEntryPage
      item={item}
      backHref={localePath("/resources", locale)}
      backLabel="← Back to Resources"
    />
  );
}
