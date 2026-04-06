"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface WhereWeExcelHighlightPoint {
  headingBefore?: string;
  headingHighlight: string;
  headingAfter?: string;
  body: string;
}

interface WhereWeExcelHighlightPointsSectionProps {
  tag: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  items: WhereWeExcelHighlightPoint[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Same two-column shell as {@link WhereWeExcelSection}; right column is stacked blocks
 * with a serif title line (blue highlight + dark text) and body copy, separated by rules.
 */
export function WhereWeExcelHighlightPointsSection({
  tag,
  headingBefore,
  headingHighlight,
  headingAfter = "",
  body,
  ctaLabel,
  ctaHref,
  items,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: WhereWeExcelHighlightPointsSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        <div className="grid grid-cols-1 gap-12 tablet-down:grid-cols-2 tablet-down:gap-0 tablet-down:gap-x-16">
          <div className="tablet-down:sticky tablet-down:top-24 tablet-down:self-start tablet-down:pr-4">
            <Overline className="text-brand-orange">{tag}</Overline>
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={sectionTitleLevel}
              className="mt-3 text-brand-dark"
            />
            <Paragraph size="lg" className="mt-6 text-brand-dark/90">
              {body}
            </Paragraph>
            <div className="mt-8">
              <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                {ctaLabel}
              </Button>
            </div>
          </div>

          <div className="tablet-down:border-l tablet-down:border-brand-grey tablet-down:pl-10 tablet-down:lg:pl-14">
            <div className="flex flex-col">
              {items.map((item, i) => (
                <AnimateOnScroll
                  key={`${item.headingHighlight}-${i}`}
                  variant="slideLeft"
                  staggerIndex={i}
                  className={`border-t border-brand-grey py-8 first:border-t-0 first:pt-0 last:pb-0`}
                >
                  <Heading
                    level={3}
                    className="!font-heading !font-semibold !text-[26px] !leading-[1.2] !tracking-[-0.01em] text-brand-dark tablet-down:!text-[32px] tablet-down:!leading-[1.15]"
                  >
                    {item.headingBefore ? (
                      <span>{item.headingBefore}</span>
                    ) : null}
                    {item.headingHighlight ? (
                      <span className="text-brand-blue">{item.headingHighlight}</span>
                    ) : null}
                    {item.headingAfter ? <span>{item.headingAfter}</span> : null}
                  </Heading>
                  <Paragraph size="base" className="mt-3 text-brand-dark/90 leading-[1.65]">
                    {item.body}
                  </Paragraph>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
