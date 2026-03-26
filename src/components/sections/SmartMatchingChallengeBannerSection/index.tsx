"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon } from "@/components/atoms/Icon";

export interface SmartMatchingChallengeBannerSectionProps {
  /** Centered orange eyebrow, e.g. "AI SMART MATCHING CHALLENGE". */
  overline: string;
  /** First line of the headline (white, Erode). */
  headingLine1: string;
  headingLine2: string;
  /** Centered body (Plus Jakarta). */
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Vertical line with horizontal tick at vertical center — decorative rail. */
function SideOrnament({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 bottom-0 hidden w-px bg-white/30 tablet-down:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/30 tablet-down:w-8" />
    </div>
  );
}

/**
 * Blue CTA band: centered overline, two-line serif headline, body, orange button
 * (label underlined) + chevron-down; thin vertical rails with mid ticks left/right.
 */
export function SmartMatchingChallengeBannerSection({
  overline,
  headingLine1,
  headingLine2,
  body,
  ctaLabel,
  ctaHref,
}: SmartMatchingChallengeBannerSectionProps) {
  return (
    <section className="w-full bg-brand-blue">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 tablet-down:px-10 tablet-down:py-24">
        <div className="relative mx-auto max-w-[min(100%,900px)] px-6 tablet-down:px-16">
          <SideOrnament side="left" />
          <SideOrnament side="right" />

          <div className="flex justify-center">
            <Overline className="text-center text-brand-orange">{overline}</Overline>
          </div>

          <Heading
            level={2}
            className="mx-auto mt-8 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-white tablet-down:mt-10 tablet-down:text-[80px] tablet-down:leading-[88px]"
          >
            <span className="block">{headingLine1}</span>
            <span className="mt-2 block tablet-down:mt-3">{headingLine2}</span>
          </Heading>

          <Paragraph
            size="lg"
            className="mx-auto mt-8 max-w-[min(100%,40rem)] text-center text-white/90 tablet-down:mt-10"
          >
            {body}
          </Paragraph>

          <div className="mt-10 flex justify-center tablet-down:mt-12">
            <Button
              variant="orange"
              href={ctaHref}
              iconAfter={<ChevronDownIcon size="sm" />}
            >
              <span className="underline decoration-brand-dark decoration-2 underline-offset-[3px]">
                {ctaLabel}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
