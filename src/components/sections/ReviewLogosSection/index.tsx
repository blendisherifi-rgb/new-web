"use client";

import { Image } from "@/components/atoms/Image";

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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:py-24">
        <h2 className="text-center font-heading text-[34px] font-semibold leading-tight text-brand-dark md:text-[48px]">
          {heading}
        </h2>

        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-6">
          {cards.map((card, i) => {
            const featured = !!card.featured;

            return (
              <div
                key={i}
                className={`flex min-h-[142px] w-full max-w-[190px] flex-col items-center justify-center rounded-[4px] ${
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
                  <span className="text-center font-body text-[18px] font-bold leading-tight">
                    {card.logoLabel}
                  </span>
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

