"use client";

import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { ChevronRightIcon } from "@/components/atoms/Icon";

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
}: OutcomesSectionProps) {
  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-32 md:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-[160px] lg:items-start">
          {/* Left column — 50px gap between each item, aligned to start */}
          <div className="flex w-full flex-col items-start text-left">
            <Overline className="text-brand-orange">{overline}</Overline>
            <h2 className="mt-[50px] font-heading font-semibold text-[60px] leading-[64px] tracking-[0] text-white">
              {title}
            </h2>
            <Paragraph className="mt-[50px] leading-[1.6] text-white">
              {body}
            </Paragraph>
            <div className="mt-[50px]">
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
                className="py-[90px] first:pt-0 last:pb-0"
              >
                <span
                  className="font-body font-bold text-[60px] leading-[48px] tracking-[0] text-brand-orange"
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
