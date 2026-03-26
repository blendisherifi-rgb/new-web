"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface MatchingChallengeFormSectionProps {
  /** Top-left eyebrow, e.g. "MATCHING CHALLENGE". */
  overline: string;
  /** Headline before the orange word (e.g. "Take our matching "). */
  headingBefore: string;
  /** Highlight segment in brand orange (e.g. "challenge"). */
  headingHighlight: string;
  /** Optional text after the highlight. */
  headingAfter?: string;
  /**
   * Screenshot of the form until HubSpot is embedded — replace `<Image />` with the embed later.
   */
  formPlaceholderImageSrc: string;
  formPlaceholderImageAlt: string;
}

/** Full-width light rule on `brand-blue` with vertical ticks at left, centre, and right. */
function TagRuleOnBlue() {
  const tickColor = "bg-white/[0.22]";
  return (
    <div className={`relative mt-3 h-px w-full ${tickColor}`} aria-hidden>
      <span
        className={`pointer-events-none absolute left-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${tickColor}`}
      />
      <span
        className={`pointer-events-none absolute left-1/2 top-1/2 block h-[10px] w-px -translate-x-1/2 -translate-y-1/2 ${tickColor}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${tickColor}`}
      />
    </div>
  );
}

/**
 * Brand-blue section: full-width tag (overline + rule + ticks), then two columns — H2 left,
 * form placeholder right; vertical divider on desktop.
 */
export function MatchingChallengeFormSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  formPlaceholderImageSrc,
  formPlaceholderImageAlt,
}: MatchingChallengeFormSectionProps) {
  return (
    <section className="w-full bg-brand-blue">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-10 tablet-down:py-24">
        {/* Full-width tag — same width as section container, not the left column */}
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <TagRuleOnBlue />
        </div>

        <div className="mt-10 flex flex-col gap-12 tablet-down:mt-12 tablet-down:flex-row tablet-down:items-stretch tablet-down:gap-0">
          <div className="shrink-0 border-b border-white/20 pb-12 text-left tablet-down:flex-1 tablet-down:border-b-0 tablet-down:border-r tablet-down:border-white/30 tablet-down:pb-0 tablet-down:pr-12">
            <Heading
              level={2}
              className="max-w-[min(100%,42rem)] font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance text-white tablet-down:text-[80px] tablet-down:leading-[84px]"
            >
              {headingBefore}
              <span className="text-brand-orange">{headingHighlight}</span>
              {headingAfter ?? ""}
            </Heading>
          </div>

          <div className="min-w-0 flex-1 tablet-down:pl-12">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={formPlaceholderImageSrc}
                alt={formPlaceholderImageAlt}
                width={720}
                height={820}
                className="h-auto w-full object-contain object-top"
                sizes="(max-width: 992px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
