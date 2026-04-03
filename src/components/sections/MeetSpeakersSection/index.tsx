"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface MeetSpeaker {
  imageSrc: string;
  imageAlt: string;
  /** Speaker name — rendered in brand blue (Erode). */
  name: string;
  /** Role line — muted sans-serif. */
  jobTitle: string;
  /** Company — bold sans-serif. */
  company: string;
}

export interface MeetSpeakersSectionProps {
  /** Eyebrow, e.g. "SPEAKERS". */
  overline: string;
  /** Text before the blue highlight (e.g. "Meet our "). */
  headingBefore: string;
  /** Highlight word(s), e.g. "speakers" — `brand-blue`. */
  headingHighlight: string;
  /** Centered intro under the headline. */
  intro: string;
  /** Up to four speaker cards (portrait image, no overlay controls). */
  speakers: MeetSpeaker[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * White band: orange overline + grey rule with left tick (Start Challenge pattern), centered H2
 * ("Meet our" dark + "speakers" blue), intro, then four columns with light vertical dividers —
 * rounded portrait, blue name, grey title, bold company. No "+" control on images.
 */
export function MeetSpeakersSection({
  overline,
  headingBefore,
  headingHighlight,
  intro,
  speakers,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: MeetSpeakersSectionProps) {
  const items = speakers.slice(0, 4);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-brand-grey before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-brand-grey before:content-['']"
            aria-hidden
          />
        </div>

        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-10 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance tablet-down:mt-12 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="text-brand-dark">{headingBefore}</span>{" "}
          <span className="text-brand-blue">{headingHighlight}</span>
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,42rem)] text-center leading-[1.65] text-brand-dark-60 tablet-down:mt-10"
        >
          {intro}
        </Paragraph>

        <div className="mt-12 grid grid-cols-1 divide-y divide-brand-grey tablet-down:mt-16 tablet-down:grid-cols-4 tablet-down:divide-x tablet-down:divide-y-0">
          {items.map((speaker, i) => (
            <div
              key={`${speaker.imageSrc}-${speaker.name}-${i}`}
              className="flex flex-col items-center px-4 py-10 text-center first:pt-8 tablet-down:px-5 tablet-down:py-12 tablet-down:first:pt-12"
            >
              <div className="relative w-full max-w-[280px] overflow-hidden rounded-lg bg-brand-grey/30 tablet-down:max-w-none">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={speaker.imageSrc}
                    alt={speaker.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 280px, 25vw"
                  />
                </div>
              </div>

              <p className="mt-6 max-w-[16rem] font-heading text-[22px] font-semibold leading-[1.25] text-brand-blue tablet-down:mt-8 tablet-down:text-[24px]">
                {speaker.name}
              </p>
              <p className="mt-2 max-w-[15rem] font-body text-[15px] leading-snug text-brand-dark-60">
                {speaker.jobTitle}
              </p>
              <p className="mt-2 max-w-[15rem] font-body text-[15px] font-bold leading-snug text-brand-dark">
                {speaker.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
