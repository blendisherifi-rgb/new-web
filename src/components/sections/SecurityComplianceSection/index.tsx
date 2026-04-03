import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface SecurityComplianceBadge {
  imageSrc?: string;
  imageAlt?: string;
}

interface SecurityComplianceSectionProps {
  overline?: string;
  /** First line of the headline — must render blue. */
  headingLine1: string;
  /** Remaining headline line(s) — dark navy. */
  headingLine2: string;
  body: string;
  /** Up to 6 badges in a 2×3 grid; omit imageSrc for an empty cell. */
  certifications: SecurityComplianceBadge[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Security & Compliance — overline + rule, two columns: split headline (line 1 blue, rest dark),
 * body with 100px bottom padding, certification grid.
 */
export function SecurityComplianceSection({
  overline = "SECURITY AND COMPLIANCE",
  headingLine1,
  headingLine2,
  body,
  certifications,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: SecurityComplianceSectionProps) {
  const slots = certifications.slice(0, 6);
  while (slots.length < 6) {
    slots.push({});
  }

  return (
    <section className="w-full bg-white" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Eyebrow: label above, 1px #DADBE0 line below with end caps (matches Architecture) */}
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
          {/* Left — copy */}
          <div className="min-w-0">
            {/* Erode 600, 80px / 88px desktop */}
            <Heading
              level={sectionTitleLevel}
              className="text-left !text-brand-dark text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
            >
              <span className="block !text-brand-blue">{headingLine1}</span>
              <span className="mt-2 block !text-brand-dark tablet-down:mt-3">
                {headingLine2}
              </span>
            </Heading>
            <Paragraph
              size="base"
              className="mt-6 max-w-xl pb-[100px] text-left !text-[#4B5563] tablet-down:mt-8"
            >
              {body}
            </Paragraph>
          </div>

          {/* Right — badge grid */}
          <div className="grid min-w-0 grid-cols-2 gap-4">
            {slots.map((badge, i) => (
              <div
                key={i}
                className="flex min-h-[120px] items-center justify-center rounded-lg border border-brand-grey bg-white px-4 py-6 tablet-down:min-h-[140px]"
              >
                {badge.imageSrc ? (
                  <Image
                    src={badge.imageSrc}
                    alt={badge.imageAlt ?? ""}
                    width={200}
                    height={100}
                    className="h-auto max-h-[72px] w-auto max-w-full object-contain"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
