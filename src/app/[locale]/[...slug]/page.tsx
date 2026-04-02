import { notFound } from "next/navigation";
import { SafeSectionRenderer } from "@/components/templates/SafeSectionRenderer";
import { fetchPageData } from "@/lib/pages";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface SlugPageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateMetadata({ params }: SlugPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const path = slug?.join("/") ?? "";
  const pageData = await fetchPageData(path, locale);
  if (!pageData) return {};
  return buildMetadataFromYoast({
    seo: pageData.seo,
    fallbackTitle: pageData.title,
    fallbackDescription: "AI-powered P2P & AP automation, tailored to perfection.",
    locale,
    path,
  });
}

/**
 * Catch-all for inner pages (e.g. /us/about, /ie/contact).
 * Fetches page data from WP by slug and renders via SectionRenderer.
 */
export default async function SlugPage({ params }: SlugPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const path = slug?.join("/") ?? "";

  const pageData = await fetchPageData(path, locale);

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <SafeSectionRenderer sections={pageData.sections} />
    </>
  );
}
