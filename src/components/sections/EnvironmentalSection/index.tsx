import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

export interface EnvironmentalInitiative {
  /** Bold lead text (e.g. "Carbon footprint"). */
  bold: string;
  /** Rest of text (e.g. " assessment underway..."). */
  text: string;
}

interface EnvironmentalSectionProps {
  overline?: string;
  /** Before blue highlight — e.g. "Committed to a ". */
  headingBefore: string;
  /** Blue highlight — e.g. "sustainable". */
  headingHighlight: string;
  /** After highlight — e.g. " and inclusive future". */
  headingAfter: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Intro paragraph in right column. */
  body: string;
  /** Stat number — e.g. "25 Mil". */
  statNumber: string;
  /** Stat label — e.g. "Sheets of paper saved annually...". */
  statLabel: string;
  /** Key initiatives list. */
  initiatives: EnvironmentalInitiative[];
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
 * Environmental section — two columns on white: left = overline, heading, CTA;
 * right = body, stat block (25 Mil), key initiatives with orange checkmarks.
 *
 * Typography:
 * - Stat number: Plus Jakarta 700, 60px, 48px line-height
 * - Key initiatives heading: Erode 600, 32px, 36px, -1% letter-spacing
 */
export function EnvironmentalSection({
  overline = "ENVIRONMENTAL",
  headingBefore,
  headingHighlight,
  headingAfter,
  ctaLabel,
  ctaHref,
  body,
  statNumber,
  statLabel,
  initiatives,
}: EnvironmentalSectionProps) {
  return (
    <section className="w-full bg-white" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + rule */}
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

        <div className="mt-10 grid grid-cols-1 gap-10 tablet-down:mt-12 tablet-down:grid-cols-2 tablet-down:items-start tablet-down:gap-16">
          {/* Left column — heading + CTA */}
          <div className="min-w-0">
            <Heading
              level={1}
              className="text-left font-heading font-semibold text-brand-dark! text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
            >
              {headingBefore}
              <span className="text-brand-blue!">{headingHighlight}</span>
              {headingAfter}
            </Heading>
            <div className="mt-8 tablet-down:mt-10">
              <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                {ctaLabel}
              </Button>
            </div>
          </div>

          {/* Right column — body, stat block, initiatives */}
          <div className="min-w-0">
            <Paragraph
              size="base"
              className="text-left text-[#4B5563]!"
            >
              {body}
            </Paragraph>

            {/* Stat block — horizontal lines above/below */}
            <div className="mt-8 tablet-down:mt-10">
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

            {/* Key initiatives — Erode 600, 32px, 36px, -1% letter-spacing */}
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
                    <strong className="font-bold">{item.bold}</strong>
                    {item.text}
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
