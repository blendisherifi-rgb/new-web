"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface HowItWorksStep {
  /** Outlined numeral asset — design size 121×99px. */
  stepNumberImageSrc: string;
  stepNumberImageAlt: string;
  /** Leading word/phrase in brand orange (e.g. "Start"). */
  titleHighlight: string;
  /** Remainder of the step title in white (e.g. " a conversation"). */
  titleRest: string;
  description: string;
}

export interface HowItWorksSectionProps {
  /** Eyebrow, e.g. "HOW IT WORKS". */
  overline: string;
  /** Left column main heading (Erode, white). */
  heading: string;
  /** Left column intro (muted, sans). */
  intro: string;
  /** Typically three rows — step image + title + body. */
  steps: HowItWorksStep[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Dark navy two-column “how it works”: full-width orange overline + light rule + left tick,
 * then intro + three stepped rows with vertical divider, horizontal dividers between steps,
 * outlined numeral images and orange/white split titles.
 */
export function HowItWorksSection({
  overline,
  heading,
  intro,
  steps,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: HowItWorksSectionProps) {
  const rows = steps.slice(0, 3);

  return (
    <section className="w-full bg-brand-dark">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        {/* Full-width tag — same pattern as Partner Benefits on dark */}
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-white/[0.14] before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-white/[0.14] before:content-['']"
            aria-hidden
          />
        </div>

        <div className="mt-10 grid grid-cols-1 tablet-down:mt-12 tablet-down:grid-cols-2 tablet-down:gap-0 tablet-down:divide-x divide-white/10">
          {/* Left — intro copy */}
          <div className="border-b border-white/10 pb-12 tablet-down:border-b-0 tablet-down:pr-10 tablet-down:pb-0 tablet-down:pt-2">
            <Heading
              level={sectionTitleLevel}
              className="max-w-[min(100%,36rem)] text-left font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-white tablet-down:text-[80px] tablet-down:leading-[88px]"
            >
              {heading}
            </Heading>
            <Paragraph
              size="lg"
              className="mt-6 max-w-[min(100%,28rem)] text-left leading-[1.65] text-white/75 tablet-down:mt-8"
            >
              {intro}
            </Paragraph>
          </div>

          {/* Right — steps */}
          <div className="divide-y divide-white/10 tablet-down:pl-10">
            {rows.map((step, i) => (
              <div
                key={`${step.stepNumberImageSrc}-${i}`}
                className="flex flex-row items-center gap-6 py-10 tablet-down:gap-8 tablet-down:py-12"
              >
                <div className="h-[99px] w-[121px] shrink-0">
                  <Image
                    src={step.stepNumberImageSrc}
                    alt={step.stepNumberImageAlt}
                    width={121}
                    height={99}
                    className="h-[99px] w-[121px] object-contain object-left"
                    sizes="121px"
                    unoptimized={step.stepNumberImageSrc.toLowerCase().endsWith(".svg")}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-body text-[20px] font-bold leading-snug tracking-tight text-white tablet-down:text-[24px] tablet-down:leading-tight">
                    <span className="text-brand-orange">{step.titleHighlight}</span>
                    <span className="text-white">{step.titleRest}</span>
                  </p>
                  <Paragraph size="sm" className="mt-3 leading-[1.6] text-white/70 tablet-down:mt-4">
                    {step.description}
                  </Paragraph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
