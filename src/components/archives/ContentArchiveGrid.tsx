"use client";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { ArrowRightIcon } from "@/components/atoms/Icon";

export interface ContentArchiveGridItem {
  id: string;
  slug: string;
  title: string;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  tags?: string[];
  clientLogoOverlay?: { sourceUrl?: string; altText?: string } | null;
  /** Shown when `tags` is empty (e.g. formatted date for news). */
  metaLine?: string | null;
}

interface ContentArchiveGridProps {
  items: ContentArchiveGridItem[];
  locale: Locale;
  hrefForSlug: (slug: string) => string;
  /** Noun for aria-label, e.g. "case study" or "news article". */
  readMoreAriaNoun: string;
}

const tagPillClass =
  "inline-flex items-center rounded-[4px] bg-[#E8F2FD] px-3 py-1.5 font-body text-[20px] font-medium leading-[28px] tracking-normal text-brand-dark-60";

/**
 * Bordered 3-column archive grid (1 col mobile): image, optional logo, tags or meta line, title, orange CTA.
 */
export function ContentArchiveGrid({
  items,
  hrefForSlug,
  readMoreAriaNoun,
}: ContentArchiveGridProps) {
  if (items.length === 0) return null;

  return (
    <div className="border-l border-t border-brand-grey">
      <div className="grid grid-cols-1 tablet-down:grid-cols-3">
        {items.map((item) => {
          const href = hrefForSlug(item.slug);
          const tags = item.tags?.length ? item.tags : [];
          const img = item.featuredImage?.sourceUrl;
          const imgAlt = item.featuredImage?.altText ?? item.title;
          const logo = item.clientLogoOverlay?.sourceUrl;

          return (
            <article
              key={item.id}
              className="flex min-w-0 flex-col border-b border-r border-brand-grey p-6 tablet-down:p-6 lg:p-8"
            >
              {img ? (
                <div className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={imgAlt}
                    width={720}
                    height={540}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {logo ? (
                    <div className="pointer-events-none absolute left-4 top-4 max-w-[45%]">
                      <Image
                        src={logo}
                        alt={item.clientLogoOverlay?.altText ?? ""}
                        width={160}
                        height={48}
                        className="h-8 w-auto max-w-full object-contain object-left drop-shadow-sm"
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg bg-brand-grey/30 font-body text-sm text-brand-dark-40">
                  No image
                </div>
              )}

              {tags.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                  {tags.map((t) => (
                    <span key={t} className={tagPillClass}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : item.metaLine ? (
                <p className="mt-5 font-body text-[15px] font-medium leading-6 tracking-normal text-brand-dark-60">
                  {item.metaLine}
                </p>
              ) : null}

              <Heading
                level={3}
                className="mt-4 !font-heading !font-semibold !text-[20px] !leading-[1.25] tracking-[-0.01em] text-brand-dark tablet-down:mt-4 tablet-down:!text-[22px] tablet-down:!leading-[1.2]"
              >
                <Link
                  href={href}
                  className="text-inherit no-underline transition-colors hover:text-brand-blue focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  {item.title}
                </Link>
              </Heading>

              <Link
                href={href}
                className="mt-6 inline-flex w-max flex-col items-start gap-2 text-brand-orange no-underline transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                aria-label={`Read ${readMoreAriaNoun}: ${item.title}`}
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
    </div>
  );
}
