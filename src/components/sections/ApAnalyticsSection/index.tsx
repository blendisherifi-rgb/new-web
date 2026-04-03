import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface ApAnalyticsCard {
  iconSrc: string;
  iconAlt: string;
  /** First line — orange. */
  titleLine1: string;
  /** Second line — white. */
  titleLine2: string;
}

interface ApAnalyticsSectionProps {
  overline?: string;
  /** First line (white) — e.g. "Turn your Accounts Payable into". */
  headingLine1: string;
  /** Second line (orange) — e.g. "a measurable operation". */
  headingLine2: string;
  /** Intro paragraph below heading. */
  introBody: string;
  /** Six cards for the 3×2 grid. */
  cards: ApAnalyticsCard[];
  ctaLabel: string;
  ctaHref: string;
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * AP Analytics — dark navy bg; overline + orange underline; heading (white/orange);
 * intro; 3×2 grid with icons and two-line titles (Erode 36/44, orange/white); CTA.
 * No + buttons.
 */
export function ApAnalyticsSection({
  overline = "ANALYTICS",
  headingLine1,
  headingLine2,
  introBody,
  cards,
  ctaLabel,
  ctaHref,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: ApAnalyticsSectionProps) {
  const displayCards = cards.slice(0, 6);
  while (displayCards.length < 6) {
    displayCards.push({
      iconSrc: "",
      iconAlt: "",
      titleLine1: "",
      titleLine2: "",
    });
  }

  const ruleLine = (
    <div className="flex w-full items-center" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
      <div className="h-px min-w-0 flex-1 bg-brand-grey" />
      <div className="h-2 w-px shrink-0 bg-brand-grey" />
    </div>
  );

  return (
    <section
      className="w-full bg-brand-dark text-white"
      aria-label={overline}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + full-width rule with end-cap ticks */}
        <Overline className="block text-left text-brand-orange">{overline}</Overline>
        <div className="mt-3 w-full tablet-down:mt-4">{ruleLine}</div>

        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-10 w-full max-w-[1300px] text-center font-heading font-semibold text-[40px] leading-[1.1] text-white tablet-down:mt-12 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block">{headingLine1}</span>
          <span className="mt-2 block text-brand-orange tablet-down:mt-3">
            {headingLine2}
          </span>
        </Heading>

        <Paragraph
          size="base"
          className="mx-auto mt-6 w-full max-w-[1100px] text-center text-white/70 tablet-down:mt-8"
        >
          {introBody}
        </Paragraph>

        {/* 3×2 grid — vertical lines full height; horizontal lines inset (gaps at intersections) */}
        <div className="mx-auto mt-12 grid w-full max-w-[1100px] grid-cols-1 gap-0 tablet-down:mt-16 tablet-down:grid-cols-3">
          {displayCards.map((card, i) => {
            const isTopRow = i < 3;
            return (
            <div
              key={i}
              className="relative flex flex-col items-center border-white/15 px-6 py-10 tablet-down:border-r tablet-down:py-14 nth-[3n]:border-r-0"
            >
              {card.iconSrc ? (
                <div className="relative h-16 w-16 shrink-0 tablet-down:h-20 tablet-down:w-20">
                  <Image
                    src={card.iconSrc}
                    alt={card.iconAlt}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : null}
              <div className="mt-4 text-center">
                <p className="font-heading font-semibold text-[28px] leading-[36px] tracking-[-0.01em] tablet-down:text-[36px] tablet-down:leading-[44px]">
                  <span className="block text-brand-orange">{card.titleLine1}</span>
                  <span className="block text-white">{card.titleLine2}</span>
                </p>
              </div>
              {/* Inset horizontal line — stops before verticals (top row only) */}
              {isTopRow ? (
                <div
                  className="absolute bottom-0 left-6 right-6 h-px bg-white/15 tablet-down:left-8 tablet-down:right-8"
                  aria-hidden
                />
              ) : null}
            </div>
          );
          })}
        </div>

        <div className="mt-12 flex justify-center tablet-down:mt-16">
          <Button
            variant="orange"
            href={ctaHref}
            iconAfter={<ChevronRightIcon />}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
