"use client";

import Image from "next/image";
import { Paragraph } from "@/components/atoms/Paragraph";

export interface FinanceHeroCard {
  number: string;
  title: string;
}

interface FinanceHeroSectionProps {
  /** First headline line (orange, 60px). */
  headlineLine1: string;
  /** Second headline line (white, 80px). */
  headlineLine2: string;
  /** Body paragraph below headline. */
  body: string;
  /** Four cards: number + title. */
  cards: FinanceHeroCard[];
}

/**
 * Finance hero section — dark blue background, two-line headline (orange + white),
 * body text, and four numbered cards.
 *
 * Spacing (styleguide):
 * - 230px gap from top
 * - 16px gap between headline lines
 * - 40px gap to body text
 * - 140px gap to cards
 */
export function FinanceHeroSection({
  headlineLine1,
  headlineLine2,
  body,
  cards,
}: FinanceHeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/dark-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-6">
        <div className="relative flex flex-col items-center text-center">
          {/* 230px gap from top */}
          <div className="pt-[230px]">
            {/* Line 1: orange, 60px */}
            <h1
              className="font-heading font-semibold text-brand-orange"
              style={{ fontSize: "60px", lineHeight: "64px" }}
            >
              {headlineLine1}
            </h1>

            {/* 16px gap between lines */}
            <h2
              className="mt-[16px] font-heading font-semibold text-white"
              style={{ fontSize: "80px", lineHeight: "84px" }}
            >
              {headlineLine2}
            </h2>
          </div>

          {/* 40px gap to body text */}
          <Paragraph
            size="base"
            className="mt-10 max-w-[760px] text-white/90"
          >
            {body}
          </Paragraph>

          {/* 140px gap to cards */}
          <div className="mt-[140px] flex w-full max-w-[1200px] flex-row flex-wrap gap-4 pb-24">
            {cards.map((card, i) => (
              <article
                key={`${card.number}-${i}`}
                className="flex min-w-[200px] flex-1 items-center gap-4 rounded-lg border border-brand-dark-40/40 bg-brand-dark-80/50 p-6 text-left transition-colors hover:border-brand-dark-40"
              >
                <Paragraph className="!font-extrabold text-[49.59px] leading-[41.32px] text-brand-orange">
                  {card.number}
                </Paragraph>
                <Paragraph className="!font-semibold text-[20px] leading-[24px] text-white">
                  {card.title}
                </Paragraph>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
