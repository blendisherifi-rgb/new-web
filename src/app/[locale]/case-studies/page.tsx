import { CaseStudyArchiveGrid } from "@/components/case-studies/CaseStudyArchiveGrid";
import { CaseStudiesHeroSection } from "@/components/sections/CaseStudiesHeroSection";
import { DEFAULT_CASE_STUDIES_HERO_PROPS } from "@/lib/case-studies-hero-defaults";
import { fetchCaseStudiesArchive } from "@/lib/case-studies";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; solution?: string; industry?: string }>;
}

export async function generateMetadata({ params }: CaseStudiesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Case Studies | SoftCo",
    fallbackDescription: "See how SoftCo helps enterprises automate P2P and AP in complex environments.",
    locale,
    path: "case-studies",
  });
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const { items, hasMore } = await fetchCaseStudiesArchive(locale, {
    perPage: 500,
  });

  return (
    <>
      <CaseStudiesHeroSection {...DEFAULT_CASE_STUDIES_HERO_PROPS} />

      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
          {items.length === 0 ? (
            <p className="text-center font-body text-brand-dark-60">
              No case studies yet. Check back soon.
            </p>
          ) : (
            <CaseStudyArchiveGrid items={items} locale={locale} />
          )}

          {hasMore ? (
            <p className="mt-10 text-center font-body text-sm text-brand-dark-60">
              More than 500 case studies are published — contact us to extend this list.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
