import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

interface SocialSectionProps {
  overline?: string;
  /** Blue highlight — e.g. "People-first". */
  headingHighlight: string;
  /** Rest of heading — e.g. " culture and community engagement". */
  headingAfter: string;
  /** Body paragraph (centered). */
  body: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Image in left column. */
  imageSrc: string;
  imageAlt: string;
  /** Stat number — e.g. "45 Mil". */
  statNumber: string;
  /** Stat label — e.g. "Of new technical...". */
  statLabel: string;
  /** Key initiatives (plain text list items). */
  initiatives: string[];
  sectionTitleLevel?: SectionTitleLevel;
}

/** Checkmark icon for initiatives list. */
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-brand-orange ${className}`}
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * Social section — light blue bg (#E8F2FD); centered top (overline, heading, body, CTA);
 * two columns below: left = image, right = stat block + key initiatives.
 */
export function SocialSection({
  overline = "SOCIAL",
  headingHighlight,
  headingAfter,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  statNumber,
  statLabel,
  initiatives,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: SocialSectionProps) {
  return (
    <section className="w-full bg-brand-light-blue" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + rule — left-aligned */}
        <div className="w-full">
          <Overline className="block text-left text-brand-orange">{overline}</Overline>
          <div
            className="mt-3 flex w-full items-center tablet-down:mt-4"
            aria-hidden
          >
            <div className="h-2 w-px shrink-0 bg-brand-grey" />
            <div className="h-px min-w-0 flex-1 bg-brand-grey" />
            <div className="h-2 w-px shrink-0 bg-brand-grey" />
          </div>
        </div>

        {/* Top — centered heading, body, CTA */}
        <div className="mx-auto mt-10 max-w-[800px] text-center tablet-down:mt-12">
          <Heading
            level={sectionTitleLevel}
            className="font-heading font-semibold text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
          >
            <span className="text-brand-blue!">{headingHighlight}</span>
            {headingAfter}
          </Heading>
          <Paragraph
            size="base"
            className="mt-6 text-[#4B5563]! tablet-down:mt-8"
          >
            {body}
          </Paragraph>
          <div className="mt-8 tablet-down:mt-10">
            <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        </div>

        {/* Bottom — two columns: image | stat + initiatives */}
        <div className="mt-12 grid grid-cols-1 gap-10 tablet-down:mt-16 tablet-down:grid-cols-2 tablet-down:items-start tablet-down:gap-16">
          {/* Left — image */}
          <div className="min-w-0 overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 991px) 100vw, 50vw"
            />
          </div>

          {/* Right — stat block + initiatives */}
          <div className="min-w-0">
            {/* Stat block — horizontal lines above/below */}
            <div>
              <div className="h-px w-full bg-brand-grey" aria-hidden />
              <div className="flex flex-col gap-4 py-6 tablet-down:flex-row tablet-down:items-center tablet-down:gap-10">
                <span
                  className="shrink-0 font-body text-[48px] font-bold tracking-normal text-brand-blue tablet-down:text-[60px]"
                  style={{ lineHeight: "48px" }}
                >
                  {statNumber}
                </span>
                <span
                  className="min-w-0 flex-1 font-body text-[18px] font-bold leading-[28px] tracking-normal text-brand-dark! tablet-down:text-[20px]"
                  style={{ lineHeight: "28px" }}
                >
                  {statLabel}
                </span>
              </div>
              <div className="h-px w-full bg-brand-grey" aria-hidden />
            </div>

            {/* Key initiatives — Erode 600, 32px, 36px */}
            <h3
              className="mt-8 font-heading font-semibold text-[28px] leading-[32px] tracking-[-0.01em] text-brand-blue tablet-down:mt-10 tablet-down:text-[32px] tablet-down:leading-[36px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              Key initiatives
            </h3>
            <ul className="mt-4 divide-y divide-brand-grey tablet-down:mt-6">
              {initiatives.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0 tablet-down:gap-4 tablet-down:py-5"
                >
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="font-body text-[16px] leading-[26px] text-brand-dark! tablet-down:text-[18px] tablet-down:leading-[28px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
