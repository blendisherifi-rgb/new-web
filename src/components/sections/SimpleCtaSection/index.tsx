"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

interface SimpleCtaSectionProps {
  overline: string;
  title?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  description: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  sectionTitleLevel?: SectionTitleLevel;
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
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: SimpleCtaSectionProps) {
  const hasHighlight = !!headingHighlight;
  const showCta =
    typeof ctaLabel === "string" && ctaLabel.trim().length > 0 && typeof ctaHref === "string" && ctaHref.trim().length > 0;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <Overline className="text-[16px]">{overline}</Overline>

          <div className="mt-6 tablet-down:mt-[40px]">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={sectionTitleLevel}
                className="font-semibold leading-[1.05] text-brand-dark"
              />
            ) : (
              <Heading level={sectionTitleLevel} className="leading-[1.05]">
                {title}
              </Heading>
            )}
          </div>

          <Paragraph size="base" className="mt-6 tablet-down:mt-[40px] leading-[1.6]">
            {description}
          </Paragraph>

          {showCta ? (
            <div className="mt-8 flex justify-center tablet-down:mt-10">
              <Button variant="orange" href={ctaHref!.trim()} iconAfter={<ChevronRightIcon />} className="uppercase text-brand-dark">
                {ctaLabel!.trim()}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

