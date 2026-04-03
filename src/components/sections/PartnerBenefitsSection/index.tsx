"use client";

import { Overline } from "@/components/atoms/Overline";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { AnimateOnScroll } from "@/components/molecules/AnimateOnScroll";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

const mainHeadingClass =
  "mt-10 max-w-none text-balance text-center text-brand-dark tablet-down:mt-[50px]";

export interface PartnerBenefitsStep {
  /** Step numeral artwork (PNG/SVG/WebP). */
  stepNumberImageSrc: string;
  stepNumberImageAlt: string;
  line1Before: string;
  line1Highlight: string;
  line1After: string;
  line2Before: string;
  line2Highlight: string;
  line2After: string;
  description: string;
}

interface PartnerBenefitsSectionProps {
  /** Top-left eyebrow, e.g. "PARTNER BENEFITS". */
  overline: string;
  headline?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  subheading: string;
  steps: PartnerBenefitsStep[];
  ctaLabel?: string;
  ctaHref?: string;
  sectionTitleLevel?: SectionTitleLevel;
}

function HighlightedLine({
  before,
  highlight,
  after,
}: {
  before: string;
  highlight: string;
  after: string;
}) {
  return (
    <span className="block text-center">
      {before}
      {highlight ? <span className="text-brand-orange">{highlight}</span> : null}
      {after}
    </span>
  );
}

/**
 * Light variant of Innovation: white background, Start Challenge–style tag, image step numerals,
 * two-line step titles, main heading Erode 80px / 84px (desktop).
 */
export function PartnerBenefitsSection({
  overline,
  headline,
  headingBefore,
  headingHighlight,
  headingAfter,
  subheading,
  steps,
  ctaLabel,
  ctaHref,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: PartnerBenefitsSectionProps) {
  const hasCta = Boolean(ctaLabel && ctaHref);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-brand-grey before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-brand-grey before:content-['']"
            aria-hidden
          />
        </div>

        {/* Wider than max-w-3xl so the title fits on two lines. */}
        <div className="mx-auto max-w-[min(100%,75rem)] px-2 text-center tablet-down:px-4">
          {headingHighlight != null && headingHighlight !== "" ? (
            <Heading level={sectionTitleLevel} className={mainHeadingClass}>
              {headingBefore ?? ""}
              <span className="text-brand-orange">{headingHighlight}</span>
              {headingAfter ?? ""}
            </Heading>
          ) : (
            <HeadlineWithHighlight
              headline={headline}
              level={sectionTitleLevel}
              className={mainHeadingClass}
            />
          )}
          <Paragraph className="mt-6 whitespace-pre-wrap text-brand-dark/90 leading-[1.7] tablet-down:mt-[50px]">
            {subheading}
          </Paragraph>
        </div>

        {/* Flex (not fixed grid-cols-4) so 3 steps fill the row in thirds, 4 in quarters — no dead fourth column. */}
        <div className="mt-10 flex flex-col gap-10 divide-y divide-brand-grey tablet-down:mt-[120px] tablet-down:flex-row tablet-down:divide-x tablet-down:divide-y-0 tablet-down:gap-0">
          {steps.map((step, i) => (
            <AnimateOnScroll
              key={`${step.stepNumberImageSrc}-${i}`}
              variant="fadeUp"
              staggerIndex={i}
              className="flex w-full min-w-0 flex-1 flex-col items-center px-4 py-10 text-center first:pt-0 tablet-down:px-8 tablet-down:py-0 tablet-down:first:pt-0"
            >
              <div className="relative mx-auto h-[99px] w-[121px]">
                <Image
                  src={step.stepNumberImageSrc}
                  alt={step.stepNumberImageAlt}
                  width={121}
                  height={99}
                  className="h-[99px] w-[121px] object-contain"
                  sizes="121px"
                  unoptimized={step.stepNumberImageSrc.toLowerCase().endsWith(".svg")}
                />
              </div>
              <Heading
                level={4}
                className="mt-6 w-full text-center whitespace-pre-wrap !text-[32px] font-semibold !leading-[1.15] tracking-[-0.01em] text-brand-dark tablet-down:mt-[50px] tablet-down:!text-[44px] tablet-down:!leading-[1.2]"
              >
                <HighlightedLine
                  before={step.line1Before}
                  highlight={step.line1Highlight}
                  after={step.line1After}
                />
                <HighlightedLine
                  before={step.line2Before}
                  highlight={step.line2Highlight}
                  after={step.line2After}
                />
              </Heading>
              <Paragraph
                size="sm"
                className="mt-4 whitespace-pre-wrap text-brand-dark/90 leading-[1.7] tablet-down:mt-[30px]"
              >
                {step.description}
              </Paragraph>
            </AnimateOnScroll>
          ))}
        </div>

        {hasCta ? (
          <div className="mt-10 flex justify-center tablet-down:mt-[80px]">
            <Button variant="orange" href={ctaHref!} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
