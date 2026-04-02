"use client";

import { Image } from "@/components/atoms/Image";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Heading } from "@/components/atoms/Heading";

export interface PerfectFitCard {
  step: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface PerfectFitFrameworkSectionProps {
  overline: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  description: string;
  emphasis?: string;
  cards: PerfectFitCard[];
}

export function PerfectFitFrameworkSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  description,
  emphasis,
  cards,
}: PerfectFitFrameworkSectionProps) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-24">
        <div className="border-t border-[#E7E7EB] pt-3">
          <Overline>{overline}</Overline>
        </div>

        <div className="mt-6 grid gap-8 tablet-down:grid-cols-2 tablet-down:gap-12">
          <HeadlineWithHighlight
            headingBefore={headingBefore}
            headingHighlight={headingHighlight}
            headingAfter={headingAfter ?? ""}
            level={2}
            className="text-[35px] font-semibold leading-[1.05] text-brand-dark md:text-[35px]"
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
        <div className="mt-8 overflow-x-auto tablet-down:mt-12 pb-4">
          <div className="flex w-max snap-x snap-mandatory gap-4 pr-4 tablet-down:gap-5 tablet-down:pr-6">
            {cards.map((card, i) => (
              <article
                key={`${card.step}-${i}`}
                className="w-[300px] tablet-down:w-[360px] shrink-0 snap-start rounded-[4px] border border-[#E7E7EB] bg-white p-4 tablet-down:p-5"
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
          </div>
        </div>
      </div>
    </section>
  );
}

