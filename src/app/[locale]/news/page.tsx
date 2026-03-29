import { NewsArchiveGrid } from "@/components/news/NewsArchiveGrid";
import { NewsAndEventsSection } from "@/components/sections/NewsAndEventsSection";
import type { NewsAndEventsSectionProps } from "@/components/sections/NewsAndEventsSection";
import type { NewsListItem } from "@/lib/news";
import {
  fetchNewsArchive,
  formatNewsFeaturedMetaLine,
  newsUrl,
  stripNewsHtml,
} from "@/lib/news";
import { DEFAULT_NEWS_AND_EVENTS_PROPS } from "@/lib/news-and-events-defaults";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
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

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const { items, hasMore } = await fetchNewsArchive(locale, {
    perPage: 500,
  });

  const byNewestFirst = [...items].sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });
  const latest = byNewestFirst[0];
  const gridItems = latest ? byNewestFirst.slice(1) : [];

  const featuredProps = buildNewsFeaturedSectionProps(latest, locale);

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
