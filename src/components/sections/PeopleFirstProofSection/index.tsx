"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";

export interface PeopleFirstProofSectionProps {
  /** Eyebrow, e.g. `THE "PEOPLE FIRST" PROOF`. */
  overline: string;
  /** Text before the blue highlight (e.g. "Serious about outcomes. "). */
  headingBefore: string;
  /** Highlight segment in `brand-blue` (e.g. "Human"). */
  headingHighlight: string;
  /** Text after the highlight (e.g. " about everything else"). */
  headingAfter: string;
  /** Intro paragraph under the headline. */
  body: string;
  /** Benefit lines — orange check + bold label (order preserved). */
  benefits: string[];
}

const ruleGrey = "bg-brand-grey";

/** Full-width light grey rule with vertical ticks at left and right (section top edge). */
function TagRuleLightDoubleTick() {
  return (
    <div className={`relative mt-3 h-px w-full ${ruleGrey}`} aria-hidden>
      <span
        className={`pointer-events-none absolute left-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${ruleGrey}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${ruleGrey}`}
      />
    </div>
  );
}

/** Same tick motif as the section rule, between benefit rows. */
function BenefitRowDividerTick() {
  return (
    <div className={`relative h-px w-full ${ruleGrey}`} aria-hidden>
      <span
        className={`pointer-events-none absolute left-0 top-1/2 block h-[8px] w-px -translate-y-1/2 ${ruleGrey}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 block h-[8px] w-px -translate-y-1/2 ${ruleGrey}`}
      />
    </div>
  );
}

/** Thin-stroke checkmark (orange), aligned with the reference list. */
function ThinCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 text-brand-orange ${className}`}
      aria-hidden
    >
      <path
        d="M4 10.5L8.2 14.5L16 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * White two-column band: orange overline + double-tick grey rule, left Erode headline
 * (navy + `brand-blue` highlight) + body, right stacked benefits with thin orange checks,
 * generous row padding, and light grey horizontal rules with end ticks between rows.
 */
export function PeopleFirstProofSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  benefits,
}: PeopleFirstProofSectionProps) {
  const items = benefits.filter(Boolean);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <TagRuleLightDoubleTick />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 tablet-down:mt-14 tablet-down:grid-cols-2 tablet-down:gap-x-16 tablet-down:gap-y-0 tablet-down:items-start">
          {/* Left — sticky on desktop */}
          <div className="tablet-down:sticky tablet-down:top-28 tablet-down:max-w-[min(100%,32rem)] tablet-down:self-start">
            <Heading
              level={2}
              className="text-left font-heading font-semibold text-[34px] leading-[1.12] tracking-[-0.02em] !text-brand-dark tablet-down:text-[48px] tablet-down:leading-[1.1] tablet-down:tracking-[0]"
            >
              <span className="text-brand-dark">{headingBefore}</span>
              <span className="text-brand-blue">{headingHighlight}</span>
              <span className="text-brand-dark">{headingAfter}</span>
            </Heading>
            <Paragraph
              size="lg"
              className="mt-6 text-left leading-[1.65] text-brand-dark-60 tablet-down:mt-8"
            >
              {body}
            </Paragraph>
          </div>

          {/* Right — benefit list (ruler ticks + thin checks) */}
          <ul className="list-none">
            {items.map((label, i) => (
              <li key={`people-first-benefit-${i}`}>
                <div className="flex items-start gap-4 py-5 tablet-down:gap-5 tablet-down:py-6">
                  <ThinCheckIcon className="mt-[2px]" />
                  <span className="font-body text-[16px] font-bold leading-[1.5] tracking-[-0.01em] text-brand-dark tablet-down:text-[17px] tablet-down:leading-[1.55]">
                    {label}
                  </span>
                </div>
                {i < items.length - 1 ? <BenefitRowDividerTick /> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
