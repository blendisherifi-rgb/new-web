"use client";

import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";

export interface AutomationMetric {
  /** Metric value, e.g. "-84%" or "9.9/10". */
  value: string;
  /** Label below the metric. */
  label: string;
}

interface AutomationEngineSectionProps {
  /** Small label above the main heading (e.g. "AUTOMATION FOR FINANCE"). */
  overline: string;
  /** Main heading text (Erode / H1). */
  heading: string;
  /** Hero image below the headline (e.g. photography). */
  imageSrc: string;
  imageAlt: string;
  /** Supporting body copy below the image; kept narrower than the image for readability. */
  body: string;
  /** CTA button label + href. */
  ctaLabel: string;
  ctaHref: string;
  /** Four stats in a row with dividers (desktop). */
  metrics: AutomationMetric[];
  /** Optional logo strip below the stats. */
  logos?: LogoItem[];
}

/**
 * Automation / finance hero section.
 *
 * Full-width brand blue, subtle geometric depth, centered stack:
 * overline → H1 → image → body → orange CTA → metrics row with vertical dividers.
 *
 * Spacing (styleguide, desktop):
 * - 80px heading size (Heading level 1)
 * - 60px gap between heading and image row
 * - 110px gap between left image and right content
 * - 150px gap between image row and metrics
 * - Metric value: Plus Jakarta Sans 800, 48px / 48px, brand orange (#F7931E); label: 20px
 */
export function AutomationEngineSection({
  overline = "",
  heading = "",
  imageSrc = "",
  imageAlt = "",
  body = "",
  ctaLabel = "",
  ctaHref = "#",
  metrics = [],
  logos = [],
}: AutomationEngineSectionProps) {
  const safeMetrics = Array.isArray(metrics) ? metrics : [];
  const safeLogos = Array.isArray(logos) ? logos : [];

  return (
    <section className="relative w-full overflow-hidden bg-brand-blue">
      {/* Subtle darker triangles / depth — low contrast on blue */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-[20%] -top-[10%] h-[70%] w-[65%] rotate-[12deg] bg-gradient-to-br from-brand-dark/20 to-transparent"
        />
        <div
          className="absolute -bottom-[15%] -right-[25%] h-[65%] w-[55%] -rotate-[8deg] bg-gradient-to-tl from-brand-dark/15 to-transparent"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 text-center text-white tablet-down:px-6 tablet-down:py-24">
        <Overline className="text-brand-orange">{overline}</Overline>

        <Heading
          level={1}
          className="mx-auto mt-6 max-w-[920px] text-white tablet-down:mt-8"
        >
          {heading}
        </Heading>

        {/* Hero image — rounded, max width ~860px like ESG collage */}
        <div className="mx-auto mt-10 flex w-full max-w-[860px] justify-center tablet-down:mt-[60px]">
          <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={860}
              height={540}
              className="h-auto w-full object-cover"
              sizes="(max-width: 992px) 100vw, 860px"
            />
          </div>
        </div>

        {/* Body — narrower than image */}
        <Paragraph
          size="base"
          className="mx-auto mt-10 max-w-[660px] text-white/90 tablet-down:mt-[60px]"
        >
          {body}
        </Paragraph>

        <div className="mt-10 flex justify-center tablet-down:mt-[60px]">
          <Button
            variant="orange"
            href={ctaHref}
            iconAfter={<ChevronRightIcon size="sm" />}
          >
            {ctaLabel}
          </Button>
        </div>

        {/* Metrics row — top rule + dividers between cells (pale blue on brand blue) */}
        {safeMetrics.length > 0 && (
          <div className="mt-16 border-t border-brand-pale-blue/35 tablet-down:mt-[150px]">
            <div className="grid grid-cols-1 divide-y divide-brand-pale-blue/30 tablet-down:grid-cols-4 tablet-down:divide-x tablet-down:divide-y-0">
              {safeMetrics.map((metric, index) => (
                <div
                  key={`${metric.value}-${index}`}
                  className="flex flex-col items-center justify-center px-4 py-8 tablet-down:py-10"
                >
                  <span className="font-body text-[40px] font-extrabold leading-[48px] tracking-normal text-brand-orange tablet-down:text-[48px] tablet-down:leading-[48px]">
                    {metric.value}
                  </span>
                  <p className="mt-3 max-w-[240px] font-body text-[16px] leading-[24px] text-white/90 tablet-down:text-[20px] tablet-down:leading-[28px]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {safeLogos.length > 0 && (
          <div className="mt-16 tablet-down:mt-20">
            <LogoMarquee logos={safeLogos} duration={25} light />
          </div>
        )}
      </div>
    </section>
  );
}
