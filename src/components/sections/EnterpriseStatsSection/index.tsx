"use client";

import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface EnterpriseStat {
  /** Image for the stat card. */
  imageSrc: string;
  /** Alt text for the image. */
  imageAlt: string;
  /** Title below the image (e.g. "retention rate"). */
  title: string;
}

interface EnterpriseStatsSectionProps {
  /** Centered title. */
  title: string;
  /** Optional full-width image above the stats. */
  imageSrc?: string;
  imageAlt?: string;
  /** Stats with image and title. */
  stats: EnterpriseStat[];
}

/**
 * Enterprise stats section.
 *
 * White background, centered title, optional image, grid of stat cards
 * each with an image and title below.
 *
 * Section title: Plus Jakarta Sans, 400, 40px, 56px, center
 * Card titles: Erode, 600, 32px, 36px, center
 */
export function EnterpriseStatsSection({
  title,
  imageSrc,
  imageAlt,
  stats,
}: EnterpriseStatsSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-32">
        {/* Centered title */}
        <h2
          className="mx-auto max-w-3xl text-center font-body text-[40px] font-normal leading-[56px] tracking-[0] text-brand-dark"
          style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
        >
          {title}
        </h2>

        {/* Optional full-width image */}
        {imageSrc && (
          <div className="relative mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}

        {/* Stats grid: image, title below */}
        <div className="mt-10 grid grid-cols-1 gap-y-8 tablet-down:mt-20 tablet-down:grid-cols-4 tablet-down:gap-x-0 tablet-down:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center border-b border-brand-grey pb-8 last:border-b-0 last:pb-0 tablet-down:border-b-0 tablet-down:border-l tablet-down:border-brand-grey tablet-down:pb-0 tablet-down:px-8 first:tablet-down:border-l-0 first:tablet-down:pl-0 last:tablet-down:pr-0"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-brand-grey tablet-down:max-w-[200px]">
                <Image
                  src={stat.imageSrc}
                  alt={stat.imageAlt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <Heading level={5} className="mt-4 w-full text-center tablet-down:max-w-[200px]">
                {stat.title}
              </Heading>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
