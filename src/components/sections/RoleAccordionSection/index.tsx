"use client";

import { useState } from "react";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface RoleAccordionItem {
  tabTitle: string;
  title: string;
  content: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface RoleAccordionSectionProps {
  tag: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter?: string;
  items: RoleAccordionItem[];
}

export function RoleAccordionSection({
  tag,
  headingBefore,
  headingHighlight,
  headingAfter,
  items,
}: RoleAccordionSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex >= 0 && activeIndex < items.length ? activeIndex : 0;
  const activeItem = items[safeIndex];

  if (!items.length) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-24">
        <div className="grid grid-cols-1 gap-8 tablet-down:grid-cols-[1.05fr_1fr] tablet-down:gap-8">
          <div>
            <Overline>{tag}</Overline>
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter ?? ""}
              level={1}
              className="mt-4 text-[48px] font-semibold leading-[1.05] text-brand-dark md:text-[74px]"
            />

            <div className="mt-8 border-t border-brand-grey">
              {items.map((item, i) => {
                const isActive = i === safeIndex;
                return (
                  <div key={i} className="border-b border-brand-grey">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-expanded={isActive}
                      aria-controls={`role-accordion-panel-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <Overline>{item.tabTitle}</Overline>
                      <span className="font-body text-[24px] leading-none text-brand-orange" aria-hidden>
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    {isActive ? (
                      <div id={`role-accordion-panel-${i}`} className="pb-6">
                        <Heading level={5} className="mt-4">{item.title}</Heading>
                        <Paragraph size="lg" className="mt-4">
                          {item.content}
                        </Paragraph>
                        <div className="mt-6">
                          <Button variant="read-more" href={item.ctaHref}>
                            {item.ctaLabel}
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="self-start">
            {activeItem.imageSrc ? (
              <Image
                src={activeItem.imageSrc}
                alt={activeItem.imageAlt ?? activeItem.title}
                width={760}
                height={860}
                className="h-auto w-full rounded-md object-cover"
              />
            ) : (
              <div className="aspect-4/5 w-full rounded-md bg-brand-grey/20" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

