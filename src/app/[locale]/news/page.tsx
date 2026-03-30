import { NewsArchiveGrid } from "@/components/news/NewsArchiveGrid";
import { NewsAndEventsSection } from "@/components/sections/NewsAndEventsSection";
import type { NewsAndEventsSectionProps } from "@/components/sections/NewsAndEventsSection";
import Link from "next/link";
import type { NewsListItem } from "@/lib/news";
import {
  fetchNewsArchive,
  formatNewsFeaturedMetaLine,
  newsUrl,
  stripNewsHtml,
} from "@/lib/news";
import { DEFAULT_NEWS_AND_EVENTS_PROPS } from "@/lib/news-and-events-defaults";
import { RESOURCE_HUB_PAGE_SIZE } from "@/lib/resources-hub";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}

function buildNewsFeaturedSectionProps(
  latest: NewsListItem | undefined,
  locale: Locale,
): NewsAndEventsSectionProps | null {
  if (!latest) return null;
  const excerpt = stripNewsHtml(latest.excerpt ?? "");
  return {
    ...DEFAULT_NEWS_AND_EVENTS_PROPS,
    cardOverline: "MEET US AT THE NEXT EVENT",
    cardTitle: latest.title,
    cardMeta: formatNewsFeaturedMetaLine(latest.date, locale),
    cardImageSrc:
      latest.featuredImage?.sourceUrl ?? DEFAULT_NEWS_AND_EVENTS_PROPS.cardImageSrc,
    cardImageAlt: latest.featuredImage?.altText?.trim() || latest.title,
    cardBody: excerpt || DEFAULT_NEWS_AND_EVENTS_PROPS.cardBody,
    cardCtaLabel: "MEET US THERE",
    cardCtaHref: newsUrl(latest.slug, locale),
  };
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "News | SoftCo",
    fallbackDescription: "Latest news from SoftCo.",
    locale,
    path: "news",
  });
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const search = await searchParams;
  const rawPage = Array.isArray(search.page) ? search.page[0] : search.page;
  const parsedPage = Number.parseInt(rawPage ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const { items, hasMore } = await fetchNewsArchive(locale, {
    perPage: 500,
  });

  const byNewestFirst = [...items].sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });
  const latest = byNewestFirst[0];
  const allGridItems = latest ? byNewestFirst.slice(1) : [];
  const totalGridPages =
    allGridItems.length === 0 ? 0 : Math.ceil(allGridItems.length / RESOURCE_HUB_PAGE_SIZE);
  const safePage =
    totalGridPages === 0 ? 1 : Math.min(Math.max(1, page), totalGridPages);
  const start = (safePage - 1) * RESOURCE_HUB_PAGE_SIZE;
  const gridItems = allGridItems.slice(start, start + RESOURCE_HUB_PAGE_SIZE);

  const featuredProps = buildNewsFeaturedSectionProps(latest, locale);
  const linkClass =
    "font-body text-[15px] font-semibold text-brand-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";
  const disabledClass = "font-body text-[15px] font-medium text-brand-dark-40";
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    const q = params.toString();
    return q ? `?${q}` : ".";
  };

  return (
    <>
      {featuredProps ? <NewsAndEventsSection {...featuredProps} /> : null}

      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
          {items.length === 0 ? (
            <p className="text-center font-body text-brand-dark-60">
              No news yet. Check back soon.
            </p>
          ) : (
            <NewsArchiveGrid items={gridItems} locale={locale} />
          )}

          {totalGridPages > 1 ? (
            <nav
              className="mt-12 flex flex-wrap items-center justify-center gap-6"
              aria-label="News list pages"
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
              More than 500 news items are published — contact us to extend this list.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
