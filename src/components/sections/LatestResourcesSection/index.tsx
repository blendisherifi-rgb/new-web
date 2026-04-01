"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NextImage from "next/image";
import { ArrowRightIcon } from "@/components/atoms/Icon";
import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import {
  NewsAndEventsFeaturedCard,
  type NewsAndEventsFeaturedCardProps,
} from "@/components/sections/NewsAndEventsSection";
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n";
import { DEFAULT_NEWS_AND_EVENTS_PROPS } from "@/lib/news-and-events-defaults";
import {
  formatNewsFeaturedMetaLine,
  newsUrl,
  stripNewsHtml,
} from "@/lib/news";
import { DEFAULT_RESOURCES_HUB_HERO_PROPS } from "@/lib/resources-hub-defaults";
import type { ResourceHubKind } from "@/lib/resources-hub";
import { formatResourceHubFeaturedMetaLineClient } from "@/lib/resources-hub-view";

/** Featured latest-resource split backdrop (replaces pale/grey `#E8F2FD` on homepage only). */
const FEATURED_LATEST_SPLIT_BLUE = "#1583E1";
/** Top image band on the three white cards below (not the full section background). */
const COMPACT_CARD_IMAGE_BLUE = "#007CE4";

const TYPE_PILL_CLASS =
  "inline-flex w-max items-center rounded-full bg-[#E8F2FD] px-4 py-2.5 font-body text-[11px] font-extrabold leading-none tracking-[0.08em] text-brand-dark tablet-down:px-5 tablet-down:py-3 tablet-down:text-[12px]";

export interface LatestResourceItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  kind: ResourceHubKind | "news";
  tags: string[];
  readTimeLabel: string | null;
}

function resourceUrl(item: LatestResourceItem, locale: Locale): string {
  if (item.kind === "news") return newsUrl(item.slug, locale);
  switch (item.kind) {
    case "blog":
      return localePath(`/blog/${item.slug}`, locale);
    case "guide":
      return localePath(`/guides/${item.slug}`, locale);
    case "webinar":
      return localePath(`/webinars/${item.slug}`, locale);
    default:
      return localePath("/resources", locale);
  }
}

function compactCardTypeLabel(kind: LatestResourceItem["kind"]): string {
  switch (kind) {
    case "news":
      return "NEWS";
    case "blog":
      return "BLOG";
    case "guide":
      return "GUIDE";
    case "webinar":
      return "WEBINAR";
    default:
      return "RESOURCE";
  }
}

function buildFeaturedCardProps(
  item: LatestResourceItem,
  locale: Locale,
): NewsAndEventsFeaturedCardProps {
  const excerpt = stripNewsHtml(item.excerpt ?? "");
  const baseOverlap = {
    overlapHero: false as const,
    splitFillColor: FEATURED_LATEST_SPLIT_BLUE,
  };

  if (item.kind === "news") {
    return {
      ...baseOverlap,
      cardOverline: "MEET US AT THE NEXT EVENT",
      cardTitle: item.title,
      cardMeta: formatNewsFeaturedMetaLine(item.date, locale),
      cardImageSrc:
        item.featuredImage?.sourceUrl ?? DEFAULT_NEWS_AND_EVENTS_PROPS.cardImageSrc,
      cardImageAlt: item.featuredImage?.altText?.trim() || item.title,
      cardBody: excerpt || DEFAULT_NEWS_AND_EVENTS_PROPS.cardBody,
      cardCtaLabel: "MEET US THERE",
      cardCtaHref: newsUrl(item.slug, locale),
    };
  }

  const k = item.kind;
  return {
    ...baseOverlap,
    cardOverline: "FEATURED RESOURCE",
    cardTitle: item.title,
    cardMeta: formatResourceHubFeaturedMetaLineClient(item.date, k, locale),
    cardImageSrc:
      item.featuredImage?.sourceUrl ?? DEFAULT_RESOURCES_HUB_HERO_PROPS.cardImageSrc,
    cardImageAlt: item.featuredImage?.altText?.trim() || item.title,
    cardBody: excerpt || DEFAULT_RESOURCES_HUB_HERO_PROPS.cardBody,
    cardCtaLabel: "READ MORE",
    cardCtaHref: resourceUrl(item, locale),
  };
}

function LatestResourcesCompactCards({
  items,
  locale,
}: {
  items: LatestResourceItem[];
  locale: Locale;
}) {
  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 tablet-down:grid-cols-3 tablet-down:gap-8">
      {items.map((item) => {
        const href = resourceUrl(item, locale);
        const typeLabel = compactCardTypeLabel(item.kind);
        const img = item.featuredImage?.sourceUrl;
        const imgAlt = item.featuredImage?.altText ?? item.title;

        return (
          <article
            key={item.id}
            className="flex min-w-0 flex-col rounded-lg bg-white p-6 shadow-[0_8px_30px_-12px_rgba(0,26,51,0.18)] tablet-down:p-8"
          >
            <Link href={href} className="block min-w-0 no-underline">
              <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-lg"
                style={{ backgroundColor: COMPACT_CARD_IMAGE_BLUE }}
              >
                {img ? (
                  <NextImage
                    src={img}
                    alt={imgAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : null}
              </div>
              <span className={`${TYPE_PILL_CLASS} mt-5`}>{typeLabel}</span>
              <p className="mt-4 font-body text-[17px] font-bold leading-snug tracking-tight text-brand-dark tablet-down:text-[18px] tablet-down:leading-snug">
                {item.title}
              </p>
            </Link>
            <Link
              href={href}
              className="mt-6 inline-flex w-max flex-col items-start gap-2 text-brand-orange no-underline transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              aria-label={`Read: ${item.title}`}
            >
              <ArrowRightIcon
                className="text-brand-orange"
                size="md"
                strokeWidth={2}
                aria-hidden
              />
              <span className="block h-px w-12 bg-brand-orange" aria-hidden />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function LatestResourcesContent({
  locale,
  items,
  heading,
  viewAllLabel,
  viewAllHref,
}: {
  locale: Locale;
  items: LatestResourceItem[];
  heading?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}) {
  const [featured, ...rest] = items;
  const rowItems = rest.slice(0, 3);
  const featuredProps = buildFeaturedCardProps(featured, locale);
  const defaultResourcesHref = localePath("/resources", locale);
  const allHref =
    typeof viewAllHref === "string" && viewAllHref.trim() !== ""
      ? viewAllHref.startsWith("http")
        ? viewAllHref
        : localePath(viewAllHref.replace(/^\//, ""), locale)
      : defaultResourcesHref;

  const viewAllClass =
    "font-body text-[15px] font-semibold text-brand-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {heading ? (
        <div className="relative z-[2] mx-auto max-w-[1440px] px-4 pb-6 pt-14 text-center tablet-down:px-8 tablet-down:pt-16">
          <Heading
            level={2}
            className="!font-heading !font-semibold !text-[32px] !leading-[36px] !tracking-normal !text-brand-dark tablet-down:!text-[40px] tablet-down:!leading-[44px]"
          >
            {heading}
          </Heading>
        </div>
      ) : null}

      {/* Same featured card UI as `/news` + `/resources` (no blue hero); split fill is blue on homepage. */}
      <NewsAndEventsFeaturedCard {...featuredProps} />

      {rowItems.length > 0 ? (
        <div className="mx-auto max-w-[1440px] bg-white px-4 pb-20 pt-8 tablet-down:px-8 tablet-down:pb-24">
          <LatestResourcesCompactCards items={rowItems} locale={locale} />
        </div>
      ) : null}

      {viewAllLabel ? (
        <div className="mx-auto flex max-w-[1440px] justify-center px-4 pb-16 tablet-down:px-8">
          <Link href={allHref} className={viewAllClass}>
            {viewAllLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

export function LatestResourcesSection(props: Record<string, unknown>) {
  const params = useParams();
  const locParam = params?.locale;
  const locale: Locale =
    typeof locParam === "string" && isLocale(locParam) ? locParam : DEFAULT_LOCALE;

  const heading = typeof props.heading === "string" ? props.heading : undefined;
  const viewAllLabel = typeof props.viewAllLabel === "string" ? props.viewAllLabel : undefined;
  const viewAllHref = typeof props.viewAllHref === "string" ? props.viewAllHref : undefined;

  const [items, setItems] = useState<LatestResourceItem[] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch(
          `/api/resources/latest?locale=${encodeURIComponent(locale)}`,
          { cache: "no-store" },
        );
        const data = (await res.json()) as { items?: LatestResourceItem[] };
        if (!cancelled && Array.isArray(data.items)) {
          setItems(data.items);
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setReady(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (!ready) {
    return (
      <section
        className="w-full bg-white px-4 py-16 tablet-down:px-6"
        aria-busy="true"
        aria-label="Loading resources"
      >
        <div className="mx-auto max-w-[1440px] animate-pulse space-y-6">
          <div className="h-10 w-2/3 max-w-md rounded bg-brand-dark-10" />
          <div className="h-[280px] w-full rounded-xl bg-brand-dark-10" />
        </div>
      </section>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <LatestResourcesContent
      locale={locale}
      items={items}
      heading={heading}
      viewAllLabel={viewAllLabel}
      viewAllHref={viewAllHref}
    />
  );
}
