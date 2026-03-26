"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { Image } from "@/components/atoms/Image";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface CfoSeriesSectionProps {
  /** Orange eyebrow, e.g. "THE CFO SERIES". */
  overline: string;
  /** First line of the main headline (white, Erode). */
  headingLine1: string;
  /** Second line of the main headline. */
  headingLine2: string;
  /** Hero image (rooftop / venue). */
  imageSrc: string;
  imageAlt: string;
  /** Event meta — e.g. date, time, venue (Erode 28/34, centered, no panel). */
  eventDetails: string;
  /** Body copy under the event line. */
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Decorative rails — thin vertical line + mid tick (slider / print reference). */
function ImageSideOrnament({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 bottom-0 hidden w-px bg-white/35 tablet-down:block ${
        side === "left" ? "-left-1 tablet-down:-left-2" : "-right-1 tablet-down:-right-2"
      }`}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-white/35 tablet-down:w-7" />
    </div>
  );
}

/**
 * “CFO Series” style hero: vibrant blue (#1D80D1) with soft geometric overlays, centered
 * orange overline, two-line Erode headline (wide), 659×443 image with side ornaments, event line
 * (no background), body, orange CTA + chevron in circle.
 */
export function CfoSeriesSection({
  overline,
  headingLine1,
  headingLine2,
  imageSrc,
  imageAlt,
  eventDetails,
  body,
  ctaLabel,
  ctaHref,
}: CfoSeriesSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#1D80D1]">
      {/* Large-scale geometric depth — wide V / diagonal washes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(168deg,rgba(255,255,255,0.09)_0%,transparent_42%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(-35deg,transparent_30%,rgba(0,45,100,0.18)_48%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_58%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 py-16 text-center tablet-down:px-8 tablet-down:py-24">
        <div className="flex justify-center">
          <Overline className="text-brand-orange">{overline}</Overline>
        </div>

        <Heading
          level={2}
          className="mx-auto mt-8 max-w-[min(100%,88rem)] font-heading font-semibold text-[46px] leading-[1.08] tracking-[0] text-balance text-white tablet-down:mt-10 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block">{headingLine1}</span>
          <span className="mt-2 block tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        <div className="relative mx-auto mt-10 w-full max-w-[min(100%,720px)] px-6 tablet-down:mt-14 tablet-down:px-12">
          <ImageSideOrnament side="left" />
          <ImageSideOrnament side="right" />
          <div className="relative mx-auto w-full max-w-[659px] overflow-hidden rounded-xl shadow-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={659}
              height={443}
              className="h-auto w-full max-w-[659px] object-cover"
              sizes="(max-width: 659px) 100vw, 659px"
            />
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[min(100%,48rem)] text-center font-heading text-[28px] font-semibold leading-[34px] tracking-[-0.01em] text-brand-dark tablet-down:mt-10">
          {eventDetails}
        </p>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,38rem)] text-center text-white/95 tablet-down:mt-10"
        >
          {body}
        </Paragraph>

        <div className="mt-10 flex justify-center tablet-down:mt-14">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon size="sm" strokeWidth={2.5} />}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
