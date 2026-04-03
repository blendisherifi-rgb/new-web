"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Link } from "@/components/atoms/Link";
import { Image } from "@/components/atoms/Image";
import { NewsLowerSplitBackdrop } from "./NewsLowerSplitBackdrop";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

const HERO_BLUE = "#1D76E2";
const LEFT_FILL = "#E8F2FD";
const ACCENT_ORANGE = "#F58220";
const GREY_BODY = "#4B5563";

export interface NewsAndEventsSectionProps {
  heroOverline: string;
  heroHeading: string;
  heroBody: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  cardOverline: string;
  cardTitle: string;
  cardMeta: string;
  cardImageSrc: string;
  cardImageAlt: string;
  cardBody: string;
  cardCtaLabel: string;
  cardCtaHref: string;
  sectionTitleLevel?: SectionTitleLevel;
}

function HeroCtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-end gap-1.5 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
    >
      <span
        className="inline-flex items-end gap-1.5 border-b-[3px] pb-1"
        style={{ borderColor: ACCENT_ORANGE }}
      >
        <span className="font-body text-[12px] font-extrabold leading-none tracking-widest text-white">
          {label}
        </span>
        <span
          className="select-none font-body text-[14px] font-bold leading-none"
          style={{ color: ACCENT_ORANGE }}
          aria-hidden
        >
          ▸
        </span>
      </span>
    </Link>
  );
}

function CardCtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-end gap-1.5 no-underline hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F58220]"
    >
      <span
        className="inline-flex items-end gap-1.5 border-b-[3px] pb-1 transition-opacity group-hover:opacity-90"
        style={{ borderColor: ACCENT_ORANGE }}
      >
        <span
          className="font-body text-[12px] font-extrabold leading-none tracking-widest"
          style={{ color: ACCENT_ORANGE }}
        >
          {label}
        </span>
        <span
          className="select-none font-body text-[14px] font-bold leading-none"
          style={{ color: ACCENT_ORANGE }}
          aria-hidden
        >
          ▸
        </span>
      </span>
    </Link>
  );
}

/** White featured card + split backdrop — same block as under the hero on `/news` and `/resources`. */
export interface NewsAndEventsFeaturedCardProps {
  cardOverline: string;
  cardTitle: string;
  cardMeta: string;
  cardImageSrc: string;
  cardImageAlt: string;
  cardBody: string;
  cardCtaLabel: string;
  cardCtaHref: string;
  /**
   * When true (default), negative top margin overlaps the blue hero — use on `/news` and `/resources`.
   * When false, card sits in normal flow (e.g. homepage latest strip without hero).
   */
  overlapHero?: boolean;
  /**
   * Left split fill behind the white card (default `#E8F2FD`). Homepage latest strip uses a stronger blue.
   */
  splitFillColor?: string;
}

export function NewsAndEventsFeaturedCard({
  cardOverline,
  cardTitle,
  cardMeta,
  cardImageSrc,
  cardImageAlt,
  cardBody,
  cardCtaLabel,
  cardCtaHref,
  overlapHero = true,
  splitFillColor,
}: NewsAndEventsFeaturedCardProps) {
  const splitFill = splitFillColor ?? LEFT_FILL;
  const rowAlign = overlapHero
    ? "justify-end tablet-down:pr-[min(5vw,3.5rem)]"
    : "justify-center";
  const articleOverlap = overlapHero
    ? "-mt-[5rem] mb-2 ml-4 w-full max-w-[min(100%,920px)] tablet-down:-mt-[7.75rem] tablet-down:ml-[100px]"
    : "mb-2 mt-0 w-full max-w-[min(100%,920px)] tablet-down:mt-0 tablet-down:ml-0";

  return (
    <div className="relative z-[2] bg-white">
      <NewsLowerSplitBackdrop
        fillColor={splitFill}
        className={
          overlapHero
            ? "min-h-[min(52vw,380px)] pb-20 tablet-down:min-h-[420px] tablet-down:pb-28"
            : "min-h-0 pb-14 pt-8 tablet-down:pb-20 tablet-down:pt-12"
        }
      >
        <div className="mx-auto w-full max-w-[1320px] px-4 tablet-down:px-10">
          <div className={`flex w-full ${rowAlign}`}>
            <article
              data-news-and-events-card
              className={`relative z-10 rounded-lg bg-white text-left shadow-[0_22px_60px_-14px_rgba(0,26,51,0.22)] tablet-down:rounded-lg tablet-down:shadow-[0_26px_70px_-16px_rgba(0,26,51,0.24)] ${articleOverlap}`}
            >
              <div className="px-8 py-10 text-left tablet-down:px-12 tablet-down:py-12">
                <Overline className="!text-[#F58220]">{cardOverline}</Overline>

                <Heading
                  level={3}
                  className="mt-5 w-full max-w-none text-left text-balance !font-heading !font-semibold !text-[26px] !leading-[1.18] !tracking-tight !text-[#001A33] tablet-down:mt-6 tablet-down:!text-[34px] tablet-down:!leading-[1.12]"
                >
                  {cardTitle}
                </Heading>

                <p
                  className="mt-3 font-body text-[15px] font-normal leading-relaxed tablet-down:mt-4 tablet-down:text-base"
                  style={{ color: GREY_BODY }}
                >
                  {cardMeta}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-8 tablet-down:mt-10 tablet-down:grid-cols-5 tablet-down:gap-10">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-brand-dark-7 tablet-down:col-span-2">
                    <Image
                      src={cardImageSrc}
                      alt={cardImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 992px) 100vw, 380px"
                    />
                  </div>

                  <div className="flex flex-col justify-start text-left tablet-down:col-span-3">
                    <p
                      className="font-body text-[16px] font-normal leading-[26px] tablet-down:text-[17px] tablet-down:leading-[28px]"
                      style={{ color: GREY_BODY }}
                    >
                      {cardBody}
                    </p>
                    <div className="mt-8 flex justify-start tablet-down:mt-10">
                      <CardCtaLink href={cardCtaHref} label={cardCtaLabel} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </NewsLowerSplitBackdrop>
    </div>
  );
}

/**
 * News & events: blue hero; below — #E8F2FD from left to midpoint of featured card, then white.
 */
export function NewsAndEventsSection({
  heroOverline,
  heroHeading,
  heroBody,
  heroCtaLabel,
  heroCtaHref,
  cardOverline,
  cardTitle,
  cardMeta,
  cardImageSrc,
  cardImageAlt,
  cardBody,
  cardCtaLabel,
  cardCtaHref,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: NewsAndEventsSectionProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-[2]" style={{ backgroundColor: HERO_BLUE }}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_55%)]" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pb-28 pt-[140px] text-center tablet-down:pb-40">
          <div className="flex w-full max-w-[min(100%,30rem)] flex-col items-center text-center tablet-down:max-w-[34rem]">
            <Overline className="!text-[#F58220]">{heroOverline}</Overline>

            <Heading
              level={sectionTitleLevel}
              className="mt-8 w-full text-balance text-center !font-heading !font-semibold !text-[36px] !leading-[1.12] !tracking-tight !text-white tablet-down:mt-10 tablet-down:!text-[52px] tablet-down:!leading-[1.06]"
            >
              {heroHeading}
            </Heading>

            <Paragraph
              size="lg"
              className="mt-8 w-full text-balance text-center !font-normal !text-white tablet-down:mt-10"
            >
              {heroBody}
            </Paragraph>

            <div className="mt-10 flex w-full justify-center tablet-down:mt-12">
              <HeroCtaLink href={heroCtaHref} label={heroCtaLabel} />
            </div>
          </div>
        </div>
      </div>

      <NewsAndEventsFeaturedCard
        cardOverline={cardOverline}
        cardTitle={cardTitle}
        cardMeta={cardMeta}
        cardImageSrc={cardImageSrc}
        cardImageAlt={cardImageAlt}
        cardBody={cardBody}
        cardCtaLabel={cardCtaLabel}
        cardCtaHref={cardCtaHref}
      />
    </section>
  );
}

