"use client";

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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
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
        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-x-0 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center md:border-l md:border-brand-grey md:px-8 first:md:border-l-0 first:md:pl-0 last:md:pr-0 ${
                i < 2 ? "border-b border-brand-grey pb-12 md:border-b-0 md:pb-0" : "pt-12 md:pt-0"
              }`}
            >
              <div className="relative aspect-square w-full max-w-[200px] overflow-hidden bg-brand-grey">
                <Image
                  src={stat.imageSrc}
                  alt={stat.imageAlt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <h3 className="mt-4 max-w-[200px] text-center font-heading text-[32px] font-semibold leading-[36px] tracking-[0] text-brand-dark">
                {stat.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
