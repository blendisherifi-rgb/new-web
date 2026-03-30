import { CaseStudyArchiveGrid } from "@/components/case-studies/CaseStudyArchiveGrid";
import { CaseStudiesHeroSection } from "@/components/sections/CaseStudiesHeroSection";
import Link from "next/link";
import { DEFAULT_CASE_STUDIES_HERO_PROPS } from "@/lib/case-studies-hero-defaults";
import { fetchCaseStudiesArchive } from "@/lib/case-studies";
import { RESOURCE_HUB_PAGE_SIZE } from "@/lib/resources-hub";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string | string[];
    solution?: string | string[];
    industry?: string | string[];
  }>;
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

export default async function CaseStudiesPage({ params, searchParams }: CaseStudiesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const search = await searchParams;
  const rawPage = Array.isArray(search.page) ? search.page[0] : search.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const solution = Array.isArray(search.solution) ? search.solution[0] : search.solution;
  const industry = Array.isArray(search.industry) ? search.industry[0] : search.industry;

  const { items, hasMore } = await fetchCaseStudiesArchive(locale, {
    perPage: 500,
  });
  const totalGridPages =
    items.length === 0 ? 0 : Math.ceil(items.length / RESOURCE_HUB_PAGE_SIZE);
  const safePage =
    totalGridPages === 0 ? 1 : Math.min(Math.max(1, page), totalGridPages);
  const start = (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
  const pagedItems = items.slice(start, start + RESOURCE_HUB_PAGE_SIZE);
  const linkClass =
    "font-body text-[15px] font-semibold text-brand-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";
  const disabledClass = "font-body text-[15px] font-medium text-brand-dark-40";
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (solution) params.set("solution", solution);
    if (industry) params.set("industry", industry);
    if (nextPage > 1) params.set("page", String(nextPage));
    const q = params.toString();
    return q ? `?${q}` : ".";
  };

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
            <CaseStudyArchiveGrid items={pagedItems} locale={locale} />
          )}

          {totalGridPages > 1 ? (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
              aria-label="Case studies list pages"
            >
              {safePage > 1 ? (
                <Link href={pageHref(safePage - 1)} className={linkClass}>
                  Previous
                </Link>
              ) : (
                <span className={disabledClass}>Previous</span>
              )}
              <span className="font-body text-[15px] text-brand-dark-60">
                Page {safePage} of {totalGridPages}
              </span>
              {safePage < totalGridPages ? (
                <Link href={pageHref(safePage + 1)} className={linkClass}>
                  Next
                </Link>
              ) : (
                <span className={disabledClass}>Next</span>
              )}
            </nav>
          ) : null}

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
