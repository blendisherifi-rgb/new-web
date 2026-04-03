"use client";

import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface CultureItem {
  /** Image shown to the left of the stat row. */
  imageSrc: string;
  imageAlt?: string;
  /** Large highlighted stat or title (e.g. "15 years", "45%"). Renders in blue. */
  stat: string;
  /** Short label below the stat (e.g. "average employee tenure"). */
  label: string;
  /** Supporting body copy. */
  description?: string;
}

interface CultureSectionProps {
  /** Overline tag (e.g. "CULTURE"). */
  overline: string;
  /** Text before the heading highlight. */
  headingBefore: string;
  /** Highlighted portion of the heading (renders in orange on dark bg). */
  headingHighlight?: string;
  /** Text after the heading highlight. */
  headingAfter?: string;
  /** Body copy on the left. */
  body: string;
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button href. */
  ctaHref?: string;
  /** Right-side stat/image items. */
  items: CultureItem[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Culture section.
 *
 * Two-column layout on dark (#060D2E) background — matches WhereWeExcelSection
 * structure. Left column is sticky with overline, large heading, body, and CTA.
 * Right column lists image + stat rows with horizontal dividers.
 */
export function CultureSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter = "",
  body,
  ctaLabel,
  ctaHref,
  items,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: CultureSectionProps) {
  return (
    <section className="w-full" style={{ backgroundColor: "#060D2E" }}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        <div className="grid grid-cols-1 gap-12 tablet-down:grid-cols-2 tablet-down:gap-24">

          {/* Left column — sticky */}
          <div className="tablet-down:sticky tablet-down:top-24 tablet-down:self-start">
            <Overline>{overline}</Overline>
            <Heading level={sectionTitleLevel} className="mt-3 text-white">
              {headingBefore}
              {headingHighlight && (
                <span className="text-brand-orange"> {headingHighlight}</span>
              )}
              {headingAfter && <span>{headingAfter}</span>}
            </Heading>
            <Paragraph size="lg" className="mt-6 text-white/70">
              {body}
            </Paragraph>
            {ctaLabel && ctaHref && (
              <div className="mt-8">
                <Button
                  variant="orange"
                  href={ctaHref}
                  iconAfter={<ChevronRightIcon />}
                >
                  {ctaLabel}
                </Button>
              </div>
            )}
          </div>

          {/* Right column — stat rows with images */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <AnimateOnScroll
                key={i}
                variant="slideLeft"
                staggerIndex={i}
                className={`flex flex-col gap-4 border-t border-white/10 pb-10 pt-10 last:pb-0 tablet-down:flex-row tablet-down:gap-6 tablet-down:pb-[80px] tablet-down:pt-[80px] ${
                  i === 0 ? "border-t-0 pt-0" : ""
                }`}
              >
                {/* Image */}
                <div className="relative w-full aspect-video shrink-0 overflow-hidden rounded-md bg-white/10 tablet-down:h-[130px] tablet-down:w-[130px] tablet-down:aspect-auto">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 992px) 100vw, 130px"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center">
                  <p className="font-heading text-[32px] font-semibold leading-[36px] text-brand-blue">
                    {item.stat}
                  </p>
                  <p className="mt-1 font-body text-[16px] font-bold leading-[1.4] text-white">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="mt-2 font-body text-[14px] leading-[1.6] text-white/60">
                      {item.description}
                    </p>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
