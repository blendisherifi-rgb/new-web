"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";
import { Image } from "@/components/atoms/Image";

export interface InnovationValue {
  /** Icon image URL (or icon identifier for preset icons). */
  icon?: string;
  /** Value title (e.g. "Always evolving"). */
  title: string;
  /** Value description. */
  description: string;
}

interface InnovationSectionProps {
  /** Headline — use HeadlineWithHighlight fields (headingBefore, headingHighlight, headingAfter) or plain headline */
  headline?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  /** Description below headline. */
  subheading: string;
  /** Four value/principle boxes. */
  values: InnovationValue[];
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
}

/**
 * Innovation section.
 *
 * Centered headline and subheading, four value boxes in a grid,
 * and a CTA button. White background.
 */
export function InnovationSection({
  headline,
  headingBefore,
  headingHighlight,
  headingAfter,
  subheading,
  values,
  ctaLabel,
  ctaHref,
}: InnovationSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl text-center">
          <HeadlineWithHighlight
            headingBefore={headingBefore}
            headingHighlight={headingHighlight}
            headingAfter={headingAfter}
            headline={headline}
            level={2}
            className="font-semibold text-brand-dark"
          />
          <Paragraph className="mt-6 tablet-down:mt-[50px] leading-[1.7]">
            {subheading}
          </Paragraph>
        </div>

        {/* Value boxes — 4-column grid: 120px below description, 60px between cards, center aligned */}
        <div className="mt-10 grid grid-cols-1 gap-10 tablet-down:mt-[120px] tablet-down:grid-cols-4 tablet-down:gap-[60px]">
          {values.map((value, i) => (
            <AnimateOnScroll
              key={i}
              variant="fadeUp"
              staggerIndex={i}
              className="flex w-full flex-col items-center text-center"
            >
              {value.icon ? (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center">
                  <Image
                    src={value.icon}
                    alt=""
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                    aria-hidden
                  />
                </div>
              ) : (
                <ValueIconPlaceholder index={i} />
              )}
              <Heading level={4} className="mt-6 tablet-down:mt-[50px]">
                {value.title}
              </Heading>
              <Paragraph size="sm" className="mt-4 tablet-down:mt-[30px] leading-[1.7]">
                {value.description}
              </Paragraph>
            </AnimateOnScroll>
          ))}
        </div>

        {/* CTA — 80px below cards */}
        <div className="mt-10 tablet-down:mt-[80px] flex justify-center">
          <Button
            variant="orange"
            href={ctaHref}
            iconAfter={<ChevronRightIcon />}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Placeholder icons when no image provided — simple blue SVG icons. */
function ValueIconPlaceholder({ index }: { index: number }) {
  const icons = [
    /* Sparkles / evolving */
    <svg key={0} className="h-20 w-20 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      <path d="M5 16l1.5 2L9 19.5 7.5 22 5 20.5 2.5 22 4 19.5 2 17l2.5-1z" />
      <path d="M19 16l1.5 2 2.5 1.5-1 2.5 1.5 2.5-2.5-1L17 22l-1-2.5 2.5-1 2.5 1z" />
    </svg>,
    /* Shield */
    <svg key={1} className="h-20 w-20 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>,
    /* Target / results */
    <svg key={2} className="h-20 w-20 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>,
    /* Trending arrow */
    <svg key={3} className="h-20 w-20 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>,
  ];
  return <div className="flex h-20 w-20 shrink-0 items-center justify-center">{icons[index % icons.length]}</div>;
}
