import { HomepageWithPreloader } from "@/components/home/HomepageWithPreloader";
import { SectionRenderer } from "@/components/templates";
import { fetchPageData } from "@/lib/pages";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const pageData = await fetchPageData("/", locale);
  return buildMetadataFromYoast({
    seo: pageData?.seo,
    fallbackTitle: "SoftCo",
    fallbackDescription: "AI-powered P2P & AP automation, tailored to perfection.",
    locale,
    path: "",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const pageData = await fetchPageData("/", locale);

  if (!pageData) {
    return null;
  }

  return (
    <HomepageWithPreloader>
      <SectionRenderer sections={pageData.sections} />
    </HomepageWithPreloader>
  );
}
