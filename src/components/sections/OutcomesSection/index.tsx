"use client";

import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface OutcomesStat {
  /** Large number (e.g. "80%", "1M+"). */
  value: string;
  /** Description text (e.g. "reduction in processing costs"). */
  label: string;
}

interface OutcomesSectionProps {
  /** Overline text (e.g. "AUDITABLE OUTCOMES"). */
  overline: string;
  /** Main title. */
  title: string;
  /** Body paragraph. */
  body: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Stats for the right column. */
  stats: OutcomesStat[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Outcomes section.
 *
 * Dark background (#060D2E), two-column layout:
 * - Left: overline, title, body, button (50px gap between each)
 * - Right: stats with orange numbers and white labels, separated by dividers
 *
 * Title: Erode, 600, 60px, 64px line-height
 * Numbers: Plus Jakarta Sans, 700, 60px, 48px line-height, orange
 * Stat labels: Erode, 600, 32px, 36px line-height, white
 */
export function OutcomesSection({
  overline,
  title,
  body,
  ctaLabel,
  ctaHref,
  stats,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: OutcomesSectionProps) {
  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-40">
        <div className="grid grid-cols-1 gap-10 tablet-down:grid-cols-2 tablet-down:gap-[160px] tablet-down:items-start">
          {/* Left column — 50px gap between each item, aligned to start */}
          <div className="flex w-full flex-col items-start text-left">
            <Overline className="text-brand-orange">{overline}</Overline>
            <Heading level={sectionTitleLevel} className="mt-6 text-white tablet-down:mt-[50px]">
              {title}
            </Heading>
            <Paragraph className="mt-6 tablet-down:mt-[50px] leading-[1.6] text-white">
              {body}
            </Paragraph>
            <div className="mt-6 tablet-down:mt-[50px]">
              <Button
                variant="orange"
                href={ctaHref}
                iconAfter={<ChevronRightIcon />}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Right column — stats with dividers */}
          <div className="divide-y divide-white/20">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="py-10 tablet-down:py-[90px] first:pt-0 last:pb-0"
              >
                <span
                  className="font-body font-bold text-[40px] leading-[1.1] tracking-[0] text-brand-orange tablet-down:text-[60px] tablet-down:leading-[48px]"
                >
                  {stat.value}
                </span>
                <p className="mt-2 font-heading font-semibold text-[32px] leading-[36px] tracking-[0] text-white">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
