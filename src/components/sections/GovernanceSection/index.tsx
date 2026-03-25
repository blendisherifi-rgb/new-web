import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";

interface GovernanceSectionProps {
  overline?: string;
  /** Main headline — e.g. "Built on integrity, guided by accountability". */
  heading: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Intro paragraph in right column. */
  body: string;
  /** Stat number — e.g. "9.9/10". */
  statNumber: string;
  /** Stat label — e.g. "Audited security...". */
  statLabel: string;
  /** Key initiatives (plain text list items). */
  initiatives: string[];
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
 * Governance section — dark navy bg (#03091D); two columns: left = heading, CTA;
 * right = body, stat block (9.9/10), key initiatives with orange checkmarks.
 * White text, orange accents, thin white/grey dividers.
 */
export function GovernanceSection({
  overline = "GOVERNANCE",
  heading,
  ctaLabel,
  ctaHref,
  body,
  statNumber,
  statLabel,
  initiatives,
}: GovernanceSectionProps) {
  return (
    <section
      className="w-full bg-[#03091D] text-white"
      aria-label={overline}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Overline + rule */}
        <div className="w-full">
          <Overline className="block text-left text-brand-orange">{overline}</Overline>
          <div
            className="mt-3 flex w-full items-center tablet-down:mt-4"
            aria-hidden
          >
            <div className="h-2 w-px shrink-0 bg-white/30" />
            <div className="h-px min-w-0 flex-1 bg-white/30" />
            <div className="h-2 w-px shrink-0 bg-white/30" />
          </div>
        </div>

        {/* Two columns — left ~45%, right ~55% */}
        <div className="mt-10 grid grid-cols-1 gap-10 tablet-down:mt-12 tablet-down:grid-cols-[0.45fr_0.55fr] tablet-down:items-start tablet-down:gap-16">
          {/* Left column — heading + CTA */}
          <div className="min-w-0">
            <Heading
              level={1}
              className="text-left font-heading font-semibold text-white text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
            >
              {heading}
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
              className="text-left text-white/90"
            >
              {body}
            </Paragraph>

            {/* Stat block — horizontal lines above/below; number orange, label white */}
            <div className="mt-8 tablet-down:mt-10">
              <div className="h-px w-full bg-white/20" aria-hidden />
              <div className="flex flex-col gap-4 py-6 tablet-down:flex-row tablet-down:items-center tablet-down:gap-10">
                <span
                  className="shrink-0 font-body text-[48px] font-bold tracking-normal text-brand-orange tablet-down:text-[60px]"
                  style={{ lineHeight: "48px" }}
                >
                  {statNumber}
                </span>
                <span
                  className="min-w-0 flex-1 font-body text-[18px] font-bold leading-[28px] tracking-normal text-white tablet-down:text-[20px]"
                  style={{ lineHeight: "28px" }}
                >
                  {statLabel}
                </span>
              </div>
              <div className="h-px w-full bg-white/20" aria-hidden />
            </div>

            {/* Key initiatives — orange serif heading */}
            <h3
              className="mt-8 font-heading font-semibold text-[28px] leading-[32px] tracking-[-0.01em] text-brand-orange tablet-down:mt-10 tablet-down:text-[32px] tablet-down:leading-[36px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              Key initiatives
            </h3>
            <ul className="mt-4 divide-y divide-white/20 tablet-down:mt-6">
              {initiatives.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0 tablet-down:gap-4 tablet-down:py-5"
                >
                  <span className="mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="font-body text-[16px] leading-[26px] text-white tablet-down:text-[18px] tablet-down:leading-[28px]">
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
