"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";

export interface WhereWeExcelItem {
  /** Uppercase category label (e.g. "ERP COMPLEXITY"). */
  category: string;
  /** Challenge description. */
  description: string;
}

interface WhereWeExcelSectionProps {
  /** Tag above heading (e.g. "WHERE WE EXCEL"). */
  tag: string;
  /** Main heading text before highlight. */
  headingBefore: string;
  /** Highlighted word in heading. */
  headingHighlight: string;
  /** Body copy. */
  body: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Right-side capability/challenge items. */
  items: WhereWeExcelItem[];
}

/**
 * Where we excel section.
 *
 * Two-column layout: left content is sticky on scroll; right-side items
 * animate in one by one as the user scrolls. Mobile: stacks (left first, list below).
 */
export function WhereWeExcelSection({
  tag,
  headingBefore,
  headingHighlight,
  body,
  ctaLabel,
  ctaHref,
  items,
}: WhereWeExcelSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span
              className="font-body text-xs font-extrabold uppercase tracking-wider text-brand-orange md:text-sm"
              aria-hidden
            >
              {tag}
            </span>
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter=""
              level={1}
              className="mt-3 text-brand-dark"
            />
            <Paragraph size="lg" className="mt-6">
              {body}
            </Paragraph>
            <div className="mt-8">
              <Button
                variant="orange"
                href={ctaHref}
                iconAfter={<ChevronRightIcon />}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Right column — scroll-reveal items */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <AnimateOnScroll
                key={i}
                variant="slideLeft"
                staggerIndex={i}
                className={`border-t border-brand-grey pb-8 pt-8 last:pb-0 ${
                  i === 0 ? "border-t-0 pt-0" : ""
                }`}
              >
                <span className="font-body text-xs font-extrabold uppercase tracking-wider text-brand-blue md:text-sm">
                  {item.category}
                </span>
                <p className="mt-2 font-heading text-xl font-semibold text-brand-dark md:text-2xl">
                  {item.description}
                </p>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

