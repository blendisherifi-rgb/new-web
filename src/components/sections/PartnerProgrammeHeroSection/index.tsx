"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon } from "@/components/atoms/Icon";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface PartnerProgrammeNavCard {
  /** Step index, e.g. "01". */
  number: string;
  /** Short label, e.g. "Who it is for". */
  label: string;
}

export interface PartnerProgrammeHeroSectionProps {
  /** Centered orange eyebrow, e.g. "PARTNER PROGRAMME". */
  overline: string;
  /** First line of the main H2 (white, Erode). */
  headingLine1: string;
  /** Second line of the main H2 (white, Erode). */
  headingLine2: string;
  /** Supporting paragraph — narrower than the headline. */
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Four bottom “tags” — darker blue strip, number + label. */
  navCards: PartnerProgrammeNavCard[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Partner Programme hero: `brand-blue` canvas, centered overline + two-line serif headline,
 * body, orange CTA with chevron-down; bottom row matches Finance hero cards (rounded,
 * semi-transparent panels) with gradient numerals (deep orange → warm amber).
 */
export function PartnerProgrammeHeroSection({
  overline,
  headingLine1,
  headingLine2,
  body,
  ctaLabel,
  ctaHref,
  navCards,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: PartnerProgrammeHeroSectionProps) {
  const cards = navCards.slice(0, 4);

  return (
    <section className="w-full bg-brand-blue">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-0 pt-16 text-center tablet-down:px-6 tablet-down:pt-24">
        <div className="flex justify-center">
          <Overline className="text-brand-orange">{overline}</Overline>
        </div>

        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-8 max-w-[min(100%,56rem)] font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance text-white tablet-down:mt-10 tablet-down:text-[80px] tablet-down:leading-[84px]"
        >
          <span className="block">{headingLine1}</span>
          <span className="mt-2 block tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,40rem)] text-white/90 tablet-down:mt-10"
        >
          {body}
        </Paragraph>

        <div className="mt-10 flex justify-center pb-16 tablet-down:mt-12 tablet-down:pb-20">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronDownIcon size="sm" />}>
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* Card row — rgba(255,255,255,0.1) over section blue; white hairline border */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pb-16 tablet-down:px-6 tablet-down:pb-24">
        <div className="flex w-full flex-col gap-3 tablet-down:flex-row tablet-down:flex-wrap tablet-down:gap-4">
          {cards.map((card, i) => (
            <article
              key={`${card.number}-${i}`}
              className="flex w-full min-w-0 flex-1 items-center gap-3 rounded-lg border border-white/20 bg-[rgba(255,255,255,0.1)] p-4 text-left shadow-sm transition-colors hover:border-white/30 tablet-down:min-w-[200px] tablet-down:gap-4 tablet-down:p-6"
            >
              <span className="inline-block shrink-0 bg-gradient-to-r from-[#e8680b] via-brand-orange to-[#fbbf24] bg-clip-text font-body text-[36px] font-extrabold leading-[41.32px] text-transparent tablet-down:text-[49.59px]">
                {card.number}
              </span>
              <span className="font-body text-[16px] font-semibold leading-[24px] text-white tablet-down:text-[20px]">
                {card.label}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
