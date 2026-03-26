"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";

export interface WhyAttendColumn {
  /** Check-in-circle artwork (replace with CMS uploads). */
  iconImageSrc: string;
  iconImageAlt: string;
  /** Title segment before the blue highlight (white, Erode). */
  titleBefore: string;
  /** Highlight segment (brand blue). */
  titleHighlight: string;
  /** Optional text after highlight (white). */
  titleAfter?: string;
  description: string;
}

export interface WhyAttendSectionProps {
  /** Eyebrow, e.g. "WHY ATTEND". */
  overline: string;
  /** First line of H2 — brand blue (e.g. "Real-world practical insights"). */
  headingLine1: string;
  /** Second line of H2 — white. */
  headingLine2: string;
  /** Centered intro under the headline. */
  intro: string;
  /** Four feature columns (icon image + split title + body). */
  columns: WhyAttendColumn[];
}

/**
 * Dark navy (`brand-dark`) four-column band: full-width tag + rule + tick, centered two-line H2
 * (blue + white), intro, then a grid with vertical dividers — checkmark image, Erode title
 * (white / `brand-blue` split), muted body.
 */
export function WhyAttendSection({
  overline,
  headingLine1,
  headingLine2,
  intro,
  columns,
}: WhyAttendSectionProps) {
  const cols = columns.slice(0, 4);

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-white/[0.14] before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-white/[0.14] before:content-['']"
            aria-hidden
          />
        </div>

        <Heading
          level={2}
          className="mx-auto mt-10 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance tablet-down:mt-12 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block text-brand-blue">{headingLine1}</span>
          <span className="mt-2 block text-white tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,48rem)] text-center leading-[1.65] text-white/90 tablet-down:mt-10"
        >
          {intro}
        </Paragraph>

        <div className="mt-12 grid grid-cols-1 divide-y divide-white/10 tablet-down:mt-16 tablet-down:grid-cols-4 tablet-down:divide-x tablet-down:divide-y-0">
          {cols.map((col, i) => (
            <div
              key={`${col.iconImageSrc}-${i}`}
              className="flex flex-col items-center px-4 py-10 text-center first:pt-8 tablet-down:px-6 tablet-down:py-12 tablet-down:first:pt-12"
            >
              <div className="relative h-20 w-20 shrink-0 tablet-down:h-[88px] tablet-down:w-[88px]">
                <Image
                  src={col.iconImageSrc}
                  alt={col.iconImageAlt}
                  fill
                  className="object-contain"
                  sizes="88px"
                  unoptimized={col.iconImageSrc.toLowerCase().endsWith(".svg")}
                />
              </div>
              <Heading
                level={4}
                className="mt-6 max-w-[16rem] !text-[22px] !leading-[1.25] !text-white tablet-down:mt-8 tablet-down:!text-[26px] tablet-down:!leading-snug"
              >
                <span className="text-white">{col.titleBefore}</span>
                <span className="text-brand-blue">{col.titleHighlight}</span>
                {col.titleAfter ? <span className="text-white">{col.titleAfter}</span> : null}
              </Heading>
              <Paragraph
                size="sm"
                className="mt-4 max-w-[15rem] leading-[1.65] text-white/80 tablet-down:mt-5"
              >
                {col.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
