"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

export interface SmartMatchingChallengeSectionProps {
  /** Centered eyebrow, e.g. "AI SMART MATCHING CHALLENGE". */
  overline: string;
  /** First line of the main title (Erode, white). */
  headingLine1: string;
  /** Second line of the main title. */
  headingLine2: string;
  /** Single composite screenshot (e.g. dashboard + callout in one asset). */
  imageSrc: string;
  imageAlt: string;
  /** Body copy (narrower column, centered). */
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Dark section: centered orange overline, two-line Erode headline (80px / 88px desktop),
 * one hero image, intro paragraph, orange CTA with chevron-down.
 *
 * Spacing: pt-10 (40px) from section top, 50px below headline.
 */
export function SmartMatchingChallengeSection({
  overline,
  headingLine1,
  headingLine2,
  imageSrc,
  imageAlt,
  body,
  ctaLabel,
  ctaHref,
}: SmartMatchingChallengeSectionProps) {
  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 tablet-down:px-6 tablet-down:pb-32">
        {/* Centered eyebrow — orange overline only, no chip background */}
        <div className="flex justify-center">
          <Overline className="text-brand-orange">{overline}</Overline>
        </div>

        {/* Headline — Erode 600, 80px / 88px / 0 tracking on large; 50px margin below */}
        <Heading
          level={2}
          className="mx-auto mb-[50px] mt-8 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-white tablet-down:mt-10 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block">{headingLine1}</span>
          <span className="mt-2 block tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        {/* Single composite screenshot */}
        <div className="mx-auto mt-2 w-full max-w-[1100px]">
          <div className="overflow-hidden rounded-xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1100}
              height={620}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </div>

        <Paragraph
          size="lg"
          className="mx-auto mt-10 max-w-[min(100%,42rem)] text-center text-white/[0.92] tablet-down:mt-12 tablet-down:max-w-[min(100%,38rem)]"
        >
          {body}
        </Paragraph>

        <div className="mt-10 flex justify-center tablet-down:mt-12">
          <Button
            variant="orange"
            href={ctaHref}
            iconAfter={<ChevronDownIcon size="sm" />}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
