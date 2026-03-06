"use client";

import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";

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
}: OurStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full">
      {/* Part 1: Overline, title, body */}
      <div
        className="w-full px-6 py-24 md:py-32"
        style={{ backgroundColor: "#E8F2FD" }}
      >
        <div className="mx-auto max-w-[1440px]">
          <Overline className="text-brand-dark">{overline}</Overline>
          <div className="mx-auto mt-[50px] max-w-3xl text-center">
            <HeadlineWithHighlight
              headingBefore={headingBefore}
              headingHighlight={headingHighlight}
              headingAfter={headingAfter}
              level={1}
              className="font-body text-[80px] font-normal leading-[88px] tracking-[0] text-brand-dark"
            />
            <Paragraph
              size="lg"
              className="mt-[50px] leading-[1.6] text-brand-dark"
            >
              {body}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Part 2: Full-width bg image + timeline slider — no gap, 800px height */}
      <div className="relative h-[800px] w-full overflow-hidden">
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

        {/* Timeline slider — centered, 3 visible, active full, peeks at edges show year only */}
        <div className="relative flex h-full min-h-0 items-center py-16 md:py-24">
          {/* Left peek — previous card, year only, 100px from main, spans to left edge */}
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
              <span className="font-body text-[28px] font-bold leading-none tracking-[0] text-brand-orange md:text-[36px]">
                {events[activeIndex - 1]?.year}
              </span>
            </button>
          )}

          {/* Center — active card, full content with fade animation on change */}
          <div
            key={activeIndex}
            className="mx-auto flex min-h-[400px] w-[500px] shrink-0 flex-col rounded-xl p-8 md:p-10 animate-slide-fade-in"
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
            <Paragraph
              size="base"
              className="mt-4 leading-[1.6] text-white"
            >
              {events[activeIndex]?.description}
            </Paragraph>
          </div>

          {/* Right peek — next card, year only, 100px from main, spans to right edge */}
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
              <span className="font-body text-[28px] font-bold leading-none tracking-[0] text-brand-orange md:text-[36px]">
                {events[activeIndex + 1]?.year}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
