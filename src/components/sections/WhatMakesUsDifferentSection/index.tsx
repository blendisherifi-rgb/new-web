"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";

export interface WhatMakesUsDifferentItem {
  /** Step number (e.g. "01", "02"). */
  step: string;
  /** Item title. */
  title: string;
  /** Item description. */
  description: string;
}

interface WhatMakesUsDifferentSectionProps {
  /** Tag above heading (e.g. "WHAT MAKES US DIFFERENT"). */
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
  /** Right-side items with step number, title, and description. */
  items: WhatMakesUsDifferentItem[];
}

/**
 * What makes us different section.
 *
 * Same layout as WhereWeExcelSection but with numbered items on the right
 * (01, 02, 03, 04) in orange next to each title.
 */
export function WhatMakesUsDifferentSection({
  tag,
  headingBefore,
  headingHighlight,
  body,
  ctaLabel,
  ctaHref,
  items,
}: WhatMakesUsDifferentSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column — sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Overline>{tag}</Overline>
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

          {/* Right column — numbered items with scroll-reveal */}
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
                <div className="flex items-baseline gap-4">
                  <span className="font-body text-[18px] font-bold leading-[32px] text-brand-orange">
                    {item.step}
                  </span>
                  <h3 className="font-heading font-semibold text-[32px] leading-[36px] tracking-[-0.01em] text-brand-blue">
                    {item.title}
                  </h3>
                </div>
                <Paragraph size="base" className="mt-2 text-brand-dark">
                  {item.description}
                </Paragraph>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
