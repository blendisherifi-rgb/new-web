import { notFound } from "next/navigation";
import { ResourcesHubEntryPage } from "@/components/resources/ResourcesHubEntryPage";
import { fetchResourceHubEntryBySlug } from "@/lib/resources-hub-detail";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, localePath } from "@/lib/i18n";

interface NewsItemPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: NewsItemPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "news");
  if (!item) return {};
  return buildMetadataFromYoast({
    seo: item.seo,
    fallbackTitle: `${item.title} | SoftCo`,
    fallbackDescription: item.excerpt ?? undefined,
    locale,
    path: `news/${slug}`,
  });
}

export default async function NewsItemPage({ params }: NewsItemPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "news");
  if (!item) notFound();

  return (
    <ResourcesHubEntryPage
      item={item}
      backHref={localePath("/news", locale)}
      backLabel="← Back to News"
    />
  );
}
