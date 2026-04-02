"use client";

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
}

export function SimpleCtaSection({
  overline,
  title,
  headingBefore,
  headingHighlight,
  headingAfter,
  description,
}: SimpleCtaSectionProps) {
  const hasHighlight = !!headingHighlight;

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
                level={2}
                className="font-semibold leading-[1.05] text-brand-dark"
              />
            ) : (
              <Heading level={2} className="leading-[1.05]">
                {title}
              </Heading>
            )}
          </div>

          <Paragraph size="base" className="mt-6 tablet-down:mt-[40px] leading-[1.6]">
            {description}
          </Paragraph>
        </div>
      </div>
    </section>
  );
}

