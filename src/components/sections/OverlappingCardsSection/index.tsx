"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface OverlappingCard {
  step: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  detailsLabel?: string;
  /** CTA link URL. When set with detailsLabel, renders a link CTA. */
  detailsHref?: string;
}

interface OverlappingCardsSectionProps {
  overline: string;
  title: string;
  description: string;
  cards: OverlappingCard[];
}

/**
 * Overlapping cards section.
 *
 * Grey bg (#DADBE0), overline, 80px title, 50px gap to text, 50px gap to cards.
 * Each card: number box (60x60), 150px gap, image (420x300), 60px gap, title,
 * 40px gap to description, 60px gap to SHOW DETAILS button.
 * On click: expand to show description, 40px gap to next card.
 */
export function OverlappingCardsSection({
  overline,
  title,
  description,
  cards,
}: OverlappingCardsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    cards.length > 0 ? cards.length - 1 : null
  );

  return (
    <section className="w-full bg-brand-light-blue">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:py-32">
        <Overline className="text-brand-orange">{overline}</Overline>

        <h2 className="mt-[50px] font-heading font-semibold text-[80px] leading-[88px] tracking-[-0.01em] text-brand-dark">
          {title}
        </h2>
        <Paragraph className="mt-[50px] max-w-2xl leading-[1.6] text-brand-dark">
          {description}
        </Paragraph>

        {/* 50px gap to cards — stacked with overlap, click to expand */}
        <div className="relative mt-[50px]">
          {cards.map((card, i) => {
            const isExpanded = expandedIndex === i;
            const isLastCard = i === cards.length - 1;
            const showContent = isExpanded || isLastCard;
            return (
              <article
                key={i}
                role="button"
                tabIndex={0}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedIndex(isExpanded ? null : i);
                  }
                }}
                className={`relative cursor-pointer border border-[#DADBE0] bg-white p-[32px] transition-all duration-300 ease-in-out hover:shadow-md ${
                  isExpanded ? "shadow-lg" : ""
                }`}
                style={{
                  marginTop:
                    i === 0
                      ? 0
                      : expandedIndex === i - 1
                        ? "40px"
                        : "-200px",
                  marginBottom:
                    isExpanded
                      ? "40px"
                      : i === cards.length - 1
                        ? 0
                        : undefined,
                  zIndex: isExpanded ? 1000 : i + 1,
                }}
              >
                <div className="flex flex-row items-start gap-[150px]">
                  {/* 60x60 blue number box, 5px radius */}
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[5px] bg-brand-blue">
                    <span className="font-body text-center text-[18px] font-bold leading-[32px] text-white">
                      {card.step}
                    </span>
                  </div>

                  {/* Image 420x300 */}
                  <div className="relative h-[300px] w-[420px] shrink-0 overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                      sizes="420px"
                    />
                  </div>

                  {/* Content — 60px gap from image */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="font-heading font-semibold text-[44px] leading-[48px] tracking-[-0.01em] text-brand-blue">
                      {card.title}
                    </h3>
                    <div
                      className="overflow-hidden transition-all duration-300 ease-in-out"
                      style={{
                        maxHeight: showContent ? 9999 : 0,
                        opacity: showContent ? 1 : 0,
                      }}
                    >
                      {card.description && (
                        <Paragraph
                          size="base"
                          className="mt-[40px] leading-[1.6] text-brand-dark"
                        >
                          {card.description}
                        </Paragraph>
                      )}
                      {showContent &&
                        card.detailsLabel &&
                        card.detailsHref && (
                          <div
                            className="mt-[60px]"
                            onClick={(e) => e.stopPropagation()}
                            role="presentation"
                          >
                            <Button
                              variant="read-more"
                              href={card.detailsHref}
                              iconAfter={<ChevronRightIcon size="sm" />}
                            >
                              {card.detailsLabel}
                            </Button>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
