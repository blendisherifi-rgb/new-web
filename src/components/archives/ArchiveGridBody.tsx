"use client";

import type { ContentArchiveGridItem } from "@/components/archives/ContentArchiveGridTypes";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { ArrowRightIcon } from "@/components/atoms/Icon";

export type ArchiveGridResolvedItem = ContentArchiveGridItem & { href: string };

const tagPillClass =
  "inline-flex items-center rounded-[4px] bg-[#E8F2FD] px-3 py-1.5 font-body text-[20px] font-medium leading-[28px] tracking-normal text-brand-dark-60 tablet-down:text-[12px] tablet-down:leading-[16px]";

interface ArchiveGridBodyProps {
  items: ArchiveGridResolvedItem[];
  readMoreAriaNoun: string;
  columnCount?: 2 | 3;
  /** First card spans full row on tablet+ (same card UI, resources / latest strip). */
  firstItemFullWidth?: boolean;
  /** Erode 500, 36px / 44px, −1% — latest resources strip bottom row. */
  largeCardTitles?: boolean;
  /** Light-blue pill + dark-blue text on image (latest resources mockup). */
  softImageTypeBadge?: boolean;
}

/** Client grid: each item must include `href` (resolved server-side or in the client shell). */
const titleClassDefault =
  "mt-4 !font-heading !font-semibold !text-[20px] !leading-[1.25] tracking-[-0.01em] text-brand-dark tablet-down:mt-4 tablet-down:!text-[22px] tablet-down:!leading-[1.2]";
const titleClassLarge =
  "mt-4 !font-heading !font-medium !text-[28px] !leading-[34px] tracking-[-0.01em] text-brand-dark tablet-down:mt-4 tablet-down:!text-[36px] tablet-down:!leading-[44px]";

export function ArchiveGridBody({
  items,
  readMoreAriaNoun,
  columnCount = 3,
  firstItemFullWidth = false,
  largeCardTitles = false,
  softImageTypeBadge = false,
}: ArchiveGridBodyProps) {
  if (items.length === 0) return null;

  const imageBadgeClass = softImageTypeBadge
    ? "pointer-events-none absolute right-3 top-3 z-[1] rounded-[4px] bg-[#E8F2FD] px-3 py-1.5 font-body text-[11px] font-extrabold uppercase leading-none tracking-[0.08em] text-brand-blue"
    : "pointer-events-none absolute right-3 top-3 z-[1] rounded bg-brand-blue px-2.5 py-1 font-body text-[10px] font-extrabold uppercase leading-none tracking-wider text-white";

  const gridCols =
    columnCount === 2
      ? "grid grid-cols-1 tablet-down:grid-cols-2"
      : "grid grid-cols-1 tablet-down:grid-cols-3";
  const imageSizes =
    columnCount === 2
      ? "(max-width: 768px) 100vw, 50vw"
      : "(max-width: 768px) 100vw, 33vw";

  return (
    <div className="border-l border-t border-brand-grey">
      <div className={gridCols}>
        {items.map((item, index) => {
          const href = item.href;
          const tags = item.tags?.length ? item.tags : [];
          const img = item.featuredImage?.sourceUrl;
          const imgAlt = item.featuredImage?.altText ?? item.title;
          const logo = item.clientLogoOverlay?.sourceUrl;
          const badge = item.typeBadge?.trim();

          const spanFirst =
            firstItemFullWidth && index === 0 && columnCount === 3
              ? "tablet-down:col-span-3"
              : "";

          return (
            <article
              key={item.id}
              className={`flex min-w-0 flex-col border-b border-r border-brand-grey p-6 tablet-down:p-6 lg:p-8 ${spanFirst}`}
            >
              {img ? (
                <div className="relative w-full overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={imgAlt}
                    width={720}
                    height={540}
                    className="h-auto w-full object-cover"
                    sizes={
                      firstItemFullWidth && index === 0
                        ? "(max-width: 768px) 100vw, min(1200px, 90vw)"
                        : imageSizes
                    }
                  />
                  {badge ? <span className={imageBadgeClass}>{badge}</span> : null}
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
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-brand-grey/30 font-body text-sm text-brand-dark-40">
                  {badge ? <span className={imageBadgeClass}>{badge}</span> : null}
                  No image
                </div>
              )}

              {tags.length > 0 || item.readTimeLabel ? (
                <div className="mt-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="flex min-w-0 flex-wrap gap-x-3 gap-y-2">
                    {tags.map((t) => (
                      <span key={t} className={tagPillClass}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {item.readTimeLabel ? (
                    <span className="shrink-0 font-body text-[12px] font-extrabold uppercase leading-none tracking-wide text-brand-orange">
                      {item.readTimeLabel}
                    </span>
                  ) : null}
                </div>
              ) : item.metaLine ? (
                <p className="mt-5 font-body text-[15px] font-medium leading-6 tracking-normal text-brand-dark-60">
                  {item.metaLine}
                </p>
              ) : null}

              <Heading
                level={3}
                className={largeCardTitles ? titleClassLarge : titleClassDefault}
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
