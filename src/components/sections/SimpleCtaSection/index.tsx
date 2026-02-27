"use client";

import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";

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
          <Overline className="text-[16px]">{overline}</Overline>

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
              <Heading level={2} className="text-[80px] leading-[1.05]">
                {title}
              </Heading>
            )}
          </div>

          <Paragraph size="base" className="mt-[40px] leading-[1.6]">
            {description}
          </Paragraph>

          <div className="mt-[32px]">
            <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

