"use client";

import { useState } from "react";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

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
  sectionTitleLevel?: SectionTitleLevel;
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
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: OverlappingCardsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    cards.length > 0 ? cards.length - 1 : null
  );

  return (
    <section className="w-full bg-brand-light-blue">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-32">
        <Overline className="text-brand-orange">{overline}</Overline>

        <Heading level={sectionTitleLevel} className="mt-6 tablet-down:mt-[50px]">
          {title}
        </Heading>
        <Paragraph className="mt-6 tablet-down:mt-[50px] max-w-2xl leading-[1.6] text-brand-dark">
          {description}
        </Paragraph>

        {/* Mobile: fully visible stacked cards, no interaction */}
        <div className="mt-8 flex flex-col gap-6 tablet-down:hidden">
          {cards.map((card, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-lg border border-[#DADBE0] bg-white"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[5px] bg-brand-blue">
                    <span className="font-body text-center text-[14px] font-bold leading-none text-white">
                      {card.step}
                    </span>
                  </div>
                  <Heading level={3} className="text-brand-blue">
                    {card.title}
                  </Heading>
                </div>
                {card.description && (
                  <Paragraph size="base" className="mt-4 leading-[1.6] text-brand-dark">
                    {card.description}
                  </Paragraph>
                )}
                {card.detailsLabel && card.detailsHref && (
                  <div className="mt-6">
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
            </article>
          ))}
        </div>

        {/* Desktop: overlapping interactive cards */}
        <div className="relative mt-[50px] hidden tablet-down:block">
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
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[5px] bg-brand-blue">
                    <span className="font-body text-center text-[18px] font-bold leading-[32px] text-white">
                      {card.step}
                    </span>
                  </div>
                  <div className="relative h-[300px] w-[420px] shrink-0 overflow-hidden">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                      sizes="420px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Heading level={3} className="text-brand-blue">
                      {card.title}
                    </Heading>
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
