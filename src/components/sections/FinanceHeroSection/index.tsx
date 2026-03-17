"use client";

import Image from "next/image";
import { Heading } from "@/components/atoms/Heading";
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
      <div className="relative mx-auto w-full max-w-[1440px] px-4 tablet-down:px-6">
        <div className="relative flex flex-col items-center text-center">
          {/* 230px gap from top */}
          <div className="pt-24 tablet-down:pt-[230px]">
            <Heading level={2} className="text-brand-orange">
              {headlineLine1}
            </Heading>

            <Heading level={1} className="mt-[16px] text-white">
              {headlineLine2}
            </Heading>
          </div>

          {/* 40px gap to body text */}
          <Paragraph
            size="base"
            className="mt-10 max-w-[760px] text-white/90"
          >
            {body}
          </Paragraph>

          {/* 140px gap to cards */}
          <div className="mt-10 flex w-full max-w-[1200px] flex-col gap-3 pb-16 tablet-down:mt-[140px] tablet-down:flex-row tablet-down:flex-wrap tablet-down:gap-4 tablet-down:pb-24">
            {cards.map((card, i) => (
              <article
                key={`${card.number}-${i}`}
                className="flex w-full min-w-0 flex-1 items-center gap-3 rounded-lg border border-brand-dark-40/40 bg-brand-dark-80/50 p-4 text-left transition-colors hover:border-brand-dark-40 tablet-down:min-w-[200px] tablet-down:gap-4 tablet-down:p-6"
              >
                <Paragraph className="font-extrabold! text-[36px] tablet-down:text-[49.59px]! leading-[41.32px] text-brand-orange">
                  {card.number}
                </Paragraph>
                <Paragraph className="font-semibold! text-[16px] tablet-down:text-[20px]! leading-[24px] text-white">
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
