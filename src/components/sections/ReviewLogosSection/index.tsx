"use client";

import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";

export interface ReviewLogoCard {
  logoSrc?: string;
  logoAlt?: string;
  logoLabel?: string;
  featured?: boolean;
}

interface ReviewLogosSectionProps {
  heading: string;
  cards: ReviewLogoCard[];
}

export function ReviewLogosSection({ heading, cards }: ReviewLogosSectionProps) {
  if (!cards.length) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-24">
        <Heading level={2} className="text-center text-[34px] md:text-[48px]">
          {heading}
        </Heading>

        <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4 tablet-down:mt-10 tablet-down:gap-6">
          {cards.map((card, i) => {
            const featured = !!card.featured;

            return (
              <div
                key={i}
                className={`flex min-h-[120px] w-full max-w-[160px] tablet-down:min-h-[142px] tablet-down:max-w-[190px] flex-col items-center justify-center rounded-[4px] ${
                  featured ? "bg-brand-dark text-white" : "bg-white text-brand-dark"
                }`}
                style={{
                  padding: "30px 50px",
                  border: featured ? "1px solid transparent" : "1px solid #E7E7EB",
                }}
              >
                {card.logoSrc ? (
                  <Image
                    src={card.logoSrc}
                    alt={card.logoAlt ?? ""}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <Paragraph size="base" className="text-center text-[18px] font-bold leading-tight">
                    {card.logoLabel}
                  </Paragraph>
                )}
                <span className="mt-3 text-[16px] leading-none text-brand-orange" aria-hidden>
                  ★★★★★
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

