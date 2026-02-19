"use client";

import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";

interface SimpleCtaSectionProps {
  overline: string;
  title?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function SimpleCtaSection({
  overline,
  title,
  headingBefore,
  headingHighlight,
  headingAfter,
  description,
  ctaLabel,
  ctaHref,
}: SimpleCtaSectionProps) {
  const hasHighlight = !!headingHighlight;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="font-body text-[16px] font-extrabold uppercase tracking-wider text-brand-orange">
            {overline}
          </span>

          <div className="mt-[40px]">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={2}
                className="text-[80px] font-semibold leading-[1.05] text-brand-dark md:text-[80px] lg:text-[80px]"
              />
            ) : (
              <h2 className="font-heading text-[80px] font-semibold leading-[1.05] text-brand-dark md:text-[80px] lg:text-[80px]">
                {title}
              </h2>
            )}
          </div>

          <Paragraph
            size="base"
            className="mt-[40px] text-[20px] leading-[1.6] md:text-[20px] lg:text-[20px]"
          >
            {description}
          </Paragraph>

          <div className="mt-8">
            <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

