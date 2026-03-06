"use client";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";

export interface EngineCard {
  /** Icon image URL (or icon identifier for preset icons). */
  icon?: string;
  /** Card title (e.g. "AI across the stack"). */
  title: string;
  /** Card description. */
  description: string;
}

interface EngineSectionProps {
  /** Overline text (e.g. "THE ENGINE"). */
  overline: string;
  /** Headline — use HeadlineWithHighlight fields. */
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  /** Body paragraph below headline. */
  body: string;
  /** Three info cards. */
  cards: EngineCard[];
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
}

/**
 * Engine section.
 *
 * White background, overline top-left, headline with blue highlight,
 * body text, three horizontal info cards, and CTA button.
 *
 * Spacing:
 * - 150px top/bottom
 * - 40px between title and body
 * - 80px between body and cards
 * - 60px between each card
 * - 32px between elements in each card
 * - 60px between cards and button
 */
export function EngineSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  cards,
  ctaLabel,
  ctaHref,
}: EngineSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-[150px]">
        <Overline className="text-brand-dark">{overline}</Overline>

        <div className="mx-auto mt-[90px] max-w-3xl text-center">
          <HeadlineWithHighlight
            headingBefore={headingBefore}
            headingHighlight={headingHighlight}
            headingAfter={headingAfter}
            level={2}
            className="font-heading font-semibold text-[80px] leading-[88px] tracking-[0] text-center text-brand-dark"
          />

          <Paragraph className="mt-[40px] leading-[1.6] text-brand-dark">
            {body}
          </Paragraph>
        </div>

        {/* 80px gap between body and cards, 60px between each card */}
        <div className="mt-[80px] grid grid-cols-1 gap-[60px] md:grid-cols-3">
          {cards.map((card, i) => (
            <article key={i} className="flex flex-col items-center text-center">
              {/* 32px gap between each element in card */}
              {card.icon ? (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                  <Image
                    src={card.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 object-contain"
                    aria-hidden
                  />
                </div>
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center">
                  <EngineIconPlaceholder index={i} />
                </div>
              )}
              <h3 className="mt-[32px] font-body text-[20px] font-bold leading-[1.3] text-brand-dark">
                {card.title}
              </h3>
              <Paragraph size="sm" className="mt-[32px] leading-[1.6] text-brand-dark">
                {card.description}
              </Paragraph>
            </article>
          ))}
        </div>

        {/* 60px gap between cards and button */}
        <div className="mt-[60px] flex justify-center">
          <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Placeholder icons for engine cards. */
function EngineIconPlaceholder({ index }: { index: number }) {
  const icons = [
    /* Gear / AI / circular arrows */
    <svg key={0} className="h-16 w-16" viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="8" fill="var(--color-brand-orange)" />
      <path d="M32 8v6M32 50v6M8 32h6M50 32h6M14.9 14.9l4.2 4.2M44.9 44.9l4.2 4.2M14.9 49.1l4.2-4.2M44.9 19.1l4.2-4.2" stroke="var(--color-brand-blue)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 20a12 12 0 0 1 0 24 12 12 0 0 1 0-24z" stroke="var(--color-brand-blue)" strokeWidth="2" fill="none" />
    </svg>,
    /* Integration / sync lines */
    <svg key={1} className="h-16 w-16 text-brand-blue" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M16 24h32M16 32h32M16 40h32" />
      <path d="M48 20v8a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4v-8" />
      <path d="M48 44v-8a4 4 0 0 0-4-4H20a4 4 0 0 0-4 4v8" />
      <circle cx="48" cy="24" r="4" fill="currentColor" />
    </svg>,
    /* Padlock / security */
    <svg key={2} className="h-16 w-16 text-brand-blue" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="16" y="28" width="32" height="24" rx="4" />
      <path d="M24 28V20a8 8 0 0 1 16 0v8" />
      <circle cx="32" cy="38" r="4" fill="currentColor" />
    </svg>,
  ];
  return icons[index % icons.length];
}
