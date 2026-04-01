import { notFound } from "next/navigation";
import { ResourcesHubEntryPage } from "@/components/resources/ResourcesHubEntryPage";
import {
  fetchResourceHubEntryBySlug,
  resourceHubEntryDisplayTitle,
} from "@/lib/resources-hub-detail";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, localePath } from "@/lib/i18n";
import { stripNewsHtml } from "@/lib/news";

interface WebinarPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: WebinarPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "webinar");
  if (!item) return {};
  const title = resourceHubEntryDisplayTitle(item);
  const short = item.webcast?.shortDescription?.trim();
  const fallbackDescription =
    short && short.length > 0
      ? stripNewsHtml(short)
      : item.excerpt
        ? stripNewsHtml(item.excerpt)
        : undefined;
  return buildMetadataFromYoast({
    seo: item.seo,
    fallbackTitle: `${title} | SoftCo`,
    fallbackDescription,
    locale,
    path: `webinars/${slug}`,
  });
}

export default async function WebinarPage({ params }: WebinarPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceHubEntryBySlug(slug, locale, "webinar");
  if (!item) notFound();

  return (
    <ResourcesHubEntryPage
      item={item}
      backHref={localePath("/resources", locale)}
      backLabel="← Back to Resources"
    />
  );
}
