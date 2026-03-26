"use client";

import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon } from "@/components/atoms/Icon";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import {
  ChallengeIllustration,
  type ChallengeIconId,
} from "./illustrations";

export interface ChallengeColumn {
  /** Matches illustration set in `illustrations.tsx`. */
  icon: ChallengeIconId;
  /** First line of the sub-head (brand blue, Erode). */
  titleLineBlue: string;
  /** Second line (brand dark, Erode). */
  titleLineDark: string;
  /** Supporting copy. */
  body: string;
  /** When true, renders the orange CTA below the copy (typically one column). */
  showCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}

interface ChallengeSectionProps {
  /** Eyebrow, e.g. "THE CHALLENGE". */
  overline: string;
  /** First phrase in brand blue (via HeadlineWithHighlight). */
  headingHighlight: string;
  /** Remainder of the headline in brand dark. */
  headingAfter: string;
  /** Intro paragraph (centered, muted). */
  intro: string;
  /** Three columns with icons and optional CTA (exactly three). */
  columns: ChallengeColumn[];
}

/**
 * "The Challenge" section — white canvas, overline + rule, centered headline,
 * three columns with vertical dividers, spot illustrations, optional mid-column CTA.
 */
export function ChallengeSection({
  overline,
  headingHighlight,
  headingAfter,
  intro,
  columns,
}: ChallengeSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        {/* Overline left + full-width rule */}
        <div>
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="mt-4 h-px w-full bg-brand-grey"
            aria-hidden
          />
        </div>

        {/* Centered headline + intro */}
        <div className="mx-auto mt-12 max-w-[900px] text-center tablet-down:mt-16">
          <HeadlineWithHighlight
            headingBefore=""
            headingHighlight={headingHighlight}
            headingAfter={headingAfter}
            level={2}
            className="text-brand-dark"
          />
          <Paragraph
            size="lg"
            className="mx-auto mt-6 max-w-[960px] text-brand-dark-60"
          >
            {intro}
          </Paragraph>
        </div>

        {/* Three columns — subtle vertical dividers on desktop */}
        <div className="mt-16 grid grid-cols-1 divide-y divide-brand-grey tablet-down:mt-20 tablet-down:grid-cols-3 tablet-down:divide-x tablet-down:divide-y-0">
          {columns.map((col, i) => (
            <div
              key={`${col.titleLineBlue}-${i}`}
              className="flex flex-col items-center px-4 py-12 text-center tablet-down:px-8 tablet-down:py-16"
            >
              <ChallengeIllustration id={col.icon} />
              <h3 className="mt-8 font-heading text-[28px] font-semibold leading-[1.15] tracking-[-0.01em] text-brand-dark tablet-down:text-[32px] tablet-down:leading-[1.2]">
                <span className="block text-brand-blue">{col.titleLineBlue}</span>
                <span className="mt-1 block text-brand-dark">{col.titleLineDark}</span>
              </h3>
              <Paragraph
                size="sm"
                className="mt-4 max-w-[320px] text-brand-dark-60"
              >
                {col.body}
              </Paragraph>
              {col.showCta && col.ctaLabel && col.ctaHref ? (
                <div className="mt-8">
                  <Button
                    variant="orange"
                    href={col.ctaHref}
                    iconAfter={<ChevronDownIcon size="sm" />}
                  >
                    {col.ctaLabel}
                  </Button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
