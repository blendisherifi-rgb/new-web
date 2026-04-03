"use client";

import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface TimelineEvent {
  /** Year/tear (e.g. "1990"). */
  year: string;
  /** Event title. */
  title: string;
  /** Event description. */
  description: string;
}

interface OurStorySectionProps {
  /** Overline text (e.g. "OUR STORY"). */
  overline: string;
  /** Main title — use HeadlineWithHighlight for blue highlight. */
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  /** Body paragraph. */
  body: string;
  /** Background image for the timeline section. */
  backgroundImageSrc: string;
  backgroundImageAlt?: string;
  /** Timeline events for the slider. */
  events: TimelineEvent[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Our Story section.
 *
 * Part 1: Light bg (#E8F2FD), overline, 80px title, 50px gap to text, 50px gap to part 2.
 * Part 2: Full-width background image, horizontal slider of timeline events.
 * Cards: backdrop-filter blur(30px), background #FFFFFF1A.
 */
export function OurStorySection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  backgroundImageSrc,
  backgroundImageAlt = "",
  events,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: OurStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full">
      {/* Part 1: Overline, title, body */}
      <div
        className="w-full px-4 py-16 tablet-down:px-6 tablet-down:py-32"
        style={{ backgroundColor: "#E8F2FD" }}
      >
        <div className="mx-auto max-w-[1440px]">
          <Overline className="text-brand-dark">{overline}</Overline>
          <div className="mx-auto mt-8 max-w-3xl text-center tablet-down:mt-[50px]">
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={sectionTitleLevel}
              className="font-body text-[40px] font-normal leading-[1.1] tracking-[0] text-brand-dark tablet-down:text-[80px] tablet-down:leading-[88px]"
            />
            <Paragraph
              size="lg"
              className="mt-6 leading-[1.6] text-brand-dark tablet-down:mt-[50px]"
            >
              {body}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Part 2: Full-width bg image + timeline slider — no gap, 800px height */}
      <div className="relative h-[600px] w-full overflow-hidden tablet-down:h-[800px]">
        {/* Background image — full screen wide */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Black 35% tint overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          aria-hidden
        />

        {/* Mobile: swipeable horizontal scroll carousel */}
        <div className="flex h-full w-full snap-x snap-mandatory items-center overflow-x-auto overscroll-x-contain scrollbar-hide px-4 py-8 tablet-down:hidden">
          <div className="flex w-max items-center gap-4">
            {events.map((event, i) => (
              <div
                key={i}
                className="flex min-h-[320px] w-[300px] shrink-0 snap-center flex-col rounded-xl p-6"
                style={{
                  background: "#FFFFFF1A",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                }}
              >
                <span className="font-body text-[36px] font-bold leading-none tracking-[0] text-brand-orange">
                  {event.year}
                </span>
                <h3 className="mt-4 font-heading text-[24px] font-semibold leading-[1.2] tracking-[0] text-white">
                  {event.title}
                </h3>
                <Paragraph size="base" className="mt-4 leading-[1.6] text-white">
                  {event.description}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: click-based slider with center card + peek buttons */}
        <div className="relative hidden h-full min-h-0 items-center py-24 tablet-down:flex">
          {activeIndex > 0 && (
            <button
              type="button"
              onClick={() => setActiveIndex(activeIndex - 1)}
              className="absolute left-0 top-1/2 flex min-h-[120px] min-w-[80px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-xl transition-opacity hover:opacity-90"
              style={{
                right: "calc(50% + 250px + 100px)",
                background: "#FFFFFF1A",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
              aria-label={`Go to ${events[activeIndex - 1]?.year}`}
            >
              <span className="font-body text-[36px] font-bold leading-none tracking-[0] text-brand-orange">
                {events[activeIndex - 1]?.year}
              </span>
            </button>
          )}

          <div
            key={activeIndex}
            className="mx-auto flex min-h-[400px] w-[500px] shrink-0 flex-col rounded-xl p-10 animate-slide-fade-in"
            style={{
              background: "#FFFFFF1A",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
            }}
          >
            <span className="font-body text-[48px] font-bold leading-none tracking-[0] text-brand-orange">
              {events[activeIndex]?.year}
            </span>
            <h3 className="mt-4 font-heading text-[32px] font-semibold leading-[36px] tracking-[0] text-white">
              {events[activeIndex]?.title}
            </h3>
            <Paragraph size="base" className="mt-4 leading-[1.6] text-white">
              {events[activeIndex]?.description}
            </Paragraph>
          </div>

          {activeIndex < events.length - 1 && (
            <button
              type="button"
              onClick={() => setActiveIndex(activeIndex + 1)}
              className="absolute right-0 top-1/2 flex min-h-[120px] min-w-[80px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-xl transition-opacity hover:opacity-90"
              style={{
                left: "calc(50% + 250px + 100px)",
                background: "#FFFFFF1A",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
              aria-label={`Go to ${events[activeIndex + 1]?.year}`}
            >
              <span className="font-body text-[36px] font-bold leading-none tracking-[0] text-brand-orange">
                {events[activeIndex + 1]?.year}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
