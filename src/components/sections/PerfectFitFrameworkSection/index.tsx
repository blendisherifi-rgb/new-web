"use client";

import { Image } from "@/components/atoms/Image";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Button } from "@/components/atoms/Button";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface PerfectFitCard {
  step: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface PerfectFitCtaCard {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
}

interface PerfectFitFrameworkSectionProps {
  overline: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  description: string;
  emphasis?: string;
  cards: PerfectFitCard[];
  ctaCard: PerfectFitCtaCard;
}

export function PerfectFitFrameworkSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  description,
  emphasis,
  cards,
  ctaCard,
}: PerfectFitFrameworkSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:py-24">
        <div className="border-t border-[#E7E7EB] pt-3">
          <Overline>{overline}</Overline>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <HeadlineWithHighlight
            headingBefore={headingBefore}
            headingHighlight={headingHighlight}
            headingAfter={headingAfter ?? ""}
            level={2}
            className="text-[52px] font-semibold leading-[1.05] text-brand-dark md:text-[74px]"
          />

          <div className="pt-2">
            <Paragraph size="sm" className="text-[18px] leading-[1.55]">
              {description}
            </Paragraph>
            {emphasis ? (
              <Paragraph size="sm" className="mt-6 text-[18px] font-bold leading-[1.55]">
                {emphasis}
              </Paragraph>
            ) : null}
          </div>
        </div>

        {/* Non-looping slider: native horizontal scroll with snap */}
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="flex w-max snap-x snap-mandatory gap-5 pr-6">
            {cards.map((card, i) => (
              <article
                key={`${card.step}-${i}`}
                className="w-[360px] shrink-0 snap-start rounded-[4px] border border-[#E7E7EB] bg-white p-5"
              >
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt ?? card.title}
                    width={320}
                    height={180}
                    className="h-[180px] w-full rounded-[2px] object-cover"
                  />
                ) : (
                  <div className="h-[180px] w-full rounded-[2px] bg-[#E7E7EB]" />
                )}
                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex rounded-[4px] bg-brand-blue px-2 py-1 font-body text-[12px] font-bold text-white">
                    {card.step}
                  </span>
                  <Heading level={3} className="text-[44px] leading-[1.1]">
                    {card.title}
                  </Heading>
                </div>
                <Paragraph size="sm" className="mt-4 leading-[1.6]">
                  {card.description}
                </Paragraph>
              </article>
            ))}

            <article className="w-[360px] shrink-0 snap-start rounded-[4px] bg-brand-dark p-6 text-white">
              <div className="flex h-full min-h-[360px] flex-col justify-between border-y border-white/30 py-14">
                <Heading level={2} className="mx-auto max-w-[260px] text-center text-[52px] leading-[1.2] text-white">
                  {ctaCard.heading}
                </Heading>
                <div className="mx-auto mt-8">
                  <Button variant="orange" href={ctaCard.ctaHref} iconAfter={<ChevronRightIcon />}>
                    {ctaCard.ctaLabel}
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

