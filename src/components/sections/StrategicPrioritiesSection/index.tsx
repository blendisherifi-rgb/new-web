"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface StrategicPriorityRow {
  /** Left column — business priority (serif, white). */
  priority: string;
  /** Right column — what SoftCo delivers (sans, muted). */
  deliverable: string;
}

interface StrategicPrioritiesSectionProps {
  /** Eyebrow, e.g. "WHAT YOU GAIN". */
  overline: string;
  /** Main heading before highlighted word (line 1). */
  headingBefore?: string;
  /** Highlighted heading word (orange). */
  headingHighlight?: string;
  /** Main heading after highlighted word (line 1). */
  headingAfter?: string;
  /** Second heading line (subheading). */
  subheading?: string;
  /** Intro paragraph below the main title (muted on dark). */
  intro: string;
  /** Left tab label (orange tab, black text). */
  leftColumnLabel: string;
  /** Right tab label (blue tab, white text). */
  rightColumnLabel: string;
  /** Comparison rows. */
  rows: StrategicPriorityRow[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Single merged connector (dot · line · chevron) — one SVG so the three parts
 * stay optically aligned and scale together in the middle column.
 */
function RowConnector() {
  return (
    <svg
      width="100%"
      height="10"
      viewBox="0 0 120 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block max-w-[200px] tablet-down:max-w-none"
      aria-hidden
    >
      <circle cx="5" cy="5" r="2.5" fill="white" />
      <line
        x1="10"
        y1="5"
        x2="98"
        y2="5"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M102 2.5 112 5 102 7.5"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Dark “strategic priorities” comparison: overline + rule, centered H2 with orange
 * SoftCo wordmark, intro, interlocking YOUR PRIORITY / WHAT SOFTCO DELIVERS tabs,
 * and rows with connector graphic between priority and deliverable.
 */
export function StrategicPrioritiesSection({
  overline,
  headingBefore = "How ",
  headingHighlight = "SoftCo",
  headingAfter = " supports your",
  subheading = "strategic priorities",
  intro,
  leftColumnLabel,
  rightColumnLabel,
  rows,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: StrategicPrioritiesSectionProps) {
  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 tablet-down:px-6 tablet-down:pb-32">
        {/* Tag + rule: 40px from section top (pt-10); 50px below rule before heading */}
        <div className="text-left">
          <span className="inline-flex rounded-md bg-white/[0.04] px-3 py-2">
            <Overline className="text-brand-orange">{overline}</Overline>
          </span>
          <div
            className="relative mt-5 h-px w-full bg-white/[0.14] before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-white/[0.14] before:content-['']"
            aria-hidden
          />
        </div>

        {/* Title — wider max-width so first line stays one row (two lines total); 50px below rule */}
        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-[50px] max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-white tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block">
            {headingBefore}
            <span className="text-brand-orange">{headingHighlight}</span>
            {headingAfter}
          </span>
          <span className="mt-2 block tablet-down:mt-3">{subheading}</span>
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-[50px] max-w-[40rem] text-center text-white/[0.72]"
        >
          {intro}
        </Paragraph>

        {/* Interlocking tab headers — stack on small viewports */}
        <div className="mx-auto mt-14 w-full max-w-[1080px] tablet-down:mt-16">
          <div className="flex flex-col gap-2 tablet-down:flex-row tablet-down:gap-0">
            <div
              className="flex min-h-[52px] flex-1 items-center justify-center rounded-lg bg-brand-orange px-5 py-3 text-center font-body text-[11px] font-extrabold leading-snug tracking-[0.14em] text-brand-dark tablet-down:min-h-[56px] tablet-down:rounded-none tablet-down:px-8 tablet-down:py-4 tablet-down:text-[12px] tablet-down:tracking-[0.16em] tablet-down:[clip-path:polygon(0_0,calc(100%-28px)_0,100%_50%,calc(100%-28px)_100%,0_100%)]"
            >
              {leftColumnLabel}
            </div>
            <div
              className="flex min-h-[52px] flex-1 items-center justify-center rounded-lg bg-brand-blue px-5 py-3 text-center font-body text-[11px] font-extrabold leading-snug tracking-[0.14em] text-white tablet-down:-ml-px tablet-down:min-h-[56px] tablet-down:rounded-none tablet-down:px-8 tablet-down:py-4 tablet-down:text-[12px] tablet-down:tracking-[0.16em] tablet-down:[clip-path:polygon(28px_0,100%_0,100%_100%,28px_100%,0_50%)]"
            >
              {rightColumnLabel}
            </div>
          </div>

          {/* Rows — three-column grid on large viewports */}
          <div className="border-t border-white/10">
            {rows.map((row, i) => (
              <div
                key={`${row.priority}-${i}`}
                className="grid grid-cols-1 gap-6 border-b border-white/10 py-8 tablet-down:grid-cols-[minmax(0,0.88fr)_100px_minmax(0,1.12fr)] tablet-down:items-center tablet-down:gap-x-4 tablet-down:gap-y-0 tablet-down:py-9"
              >
                <p className="text-center font-heading text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-white tablet-down:text-left tablet-down:text-[24px] tablet-down:leading-[1.3]">
                  {row.priority}
                </p>
                <div className="mx-auto flex w-full max-w-[200px] justify-center tablet-down:max-w-none">
                  <RowConnector />
                </div>
                <p className="text-center font-body text-[16px] font-normal leading-[1.65] text-white/75 tablet-down:text-right tablet-down:text-[17px] tablet-down:leading-[1.7]">
                  {row.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
