"use client";

import { Image } from "@/components/atoms/Image";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";

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
}: CultureSectionProps) {
  return (
    <section className="w-full" style={{ backgroundColor: "#060D2E" }}>
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left column — sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Overline>{overline}</Overline>
            <h2 className="mt-3 font-heading text-[60px] font-semibold leading-[64px] tracking-[0em] text-white">
              {headingBefore}
              {headingHighlight && (
                <span className="text-brand-orange"> {headingHighlight}</span>
              )}
              {headingAfter && <span>{headingAfter}</span>}
            </h2>
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
                className={`flex gap-6 border-t border-white/10 pb-[80px] pt-[80px] last:pb-0 ${
                  i === 0 ? "border-t-0 pt-0" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-[130px] w-[130px] shrink-0 overflow-hidden rounded-md bg-white/10">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.label}
                    fill
                    className="object-cover"
                    sizes="130px"
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
