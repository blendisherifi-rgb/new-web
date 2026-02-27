"use client";

import { useState } from "react";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";

export interface LocationItem {
  tabTitle: string;
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  address?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  mapLabel?: string;
}

interface LocationsSectionProps {
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  items: LocationItem[];
}

export function LocationsSection({
  headingBefore = "Our",
  headingHighlight = "locations",
  headingAfter = "",
  items,
}: LocationsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex >= 0 && activeIndex < items.length ? activeIndex : 0;
  const activeItem = items[safeIndex];

  if (!items.length) return null;

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Left: H2 title */}
          <div>
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={2}
              className="text-[48px] font-semibold leading-[1.05] text-brand-dark md:text-[74px]"
            />
          </div>

          {/* Right: Accordion */}
          <div className="border-t border-brand-grey">
            {items.map((item, i) => {
              const isActive = i === safeIndex;
              return (
                <div key={i} className="border-b border-brand-grey">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-expanded={isActive}
                    aria-controls={`locations-accordion-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <Overline>{item.tabTitle}</Overline>
                    <span className="font-body text-[24px] leading-none text-brand-orange" aria-hidden>
                      {isActive ? "−" : "+"}
                    </span>
                  </button>

                  {isActive && activeItem ? (
                    <div id={`locations-accordion-panel-${i}`} className="pb-6">
                      <Heading level={5} className="mb-6">
                        {activeItem.title}
                      </Heading>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Left: Image */}
                        <div>
                          {activeItem.imageSrc ? (
                            <Image
                              src={activeItem.imageSrc}
                              alt={activeItem.imageAlt ?? activeItem.title}
                              width={400}
                              height={300}
                              className="h-auto w-full rounded-md object-cover"
                            />
                          ) : (
                            <div className="aspect-[4/3] w-full rounded-md bg-brand-grey/20" />
                          )}
                        </div>
                        {/* Right: Address, contact, map link */}
                        <div className="flex flex-col gap-4 font-body text-[16px] text-brand-dark">
                          {activeItem.address ? (
                            <p className="whitespace-pre-line">{activeItem.address}</p>
                          ) : null}
                          {activeItem.phone ? (
                            <p>
                              <span className="font-semibold">Tel:</span>{" "}
                              <a href={`tel:${activeItem.phone.replace(/\s/g, "")}`} className="text-brand-blue hover:underline">
                                {activeItem.phone}
                              </a>
                            </p>
                          ) : null}
                          {activeItem.email ? (
                            <p>
                              <span className="font-semibold">Email:</span>{" "}
                              <a href={`mailto:${activeItem.email}`} className="text-brand-blue hover:underline">
                                {activeItem.email}
                              </a>
                            </p>
                          ) : null}
                          {activeItem.mapUrl ? (
                            <p className="mt-auto">
                              <a
                                href={activeItem.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-body text-[14px] font-bold text-brand-blue underline underline-offset-4 hover:no-underline"
                              >
                                {activeItem.mapLabel ?? "view on map"}
                              </a>
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
