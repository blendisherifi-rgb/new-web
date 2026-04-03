import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface PartnerLogo {
  imageSrc: string;
  imageAlt: string;
}

interface PartnerEcosystemSectionProps {
  overline?: string;
  /** First blue segment (e.g. "Backed by"). */
  headingBlue1: string;
  /** Middle dark segment (e.g. "leading technology and advisory"). */
  headingDark: string;
  /** Second blue segment (e.g. "partners"). */
  headingBlue2: string;
  body: string;
  /** Eight partner logos (2×4 grid). */
  logos: PartnerLogo[];
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Partner ecosystem — same eyebrow + rule as Security; centered H1 (Erode 80/88, blue–dark–blue);
 * Plus Jakarta 20/32 body + 64px pb under paragraph; 60px from rule to heading; 100px pb after logos.
 */
export function PartnerEcosystemSection({
  overline = "PARTNER ECOSYSTEM",
  headingBlue1,
  headingDark,
  headingBlue2,
  body,
  logos,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: PartnerEcosystemSectionProps) {
  const slots = [...logos.slice(0, 8)];
  while (slots.length < 8) {
    slots.push({ imageSrc: "", imageAlt: "" });
  }

  return (
    <section className="w-full bg-white" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
        {/* Eyebrow + rule — matches Security / Architecture */}
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

        {/* Erode 600, 80px / 88px desktop — same as Security heading */}
        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-[60px] max-w-[1100px] text-center !text-brand-dark text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="!text-brand-blue">{headingBlue1}</span>{" "}
          <span className="!text-brand-dark">{headingDark}</span>{" "}
          <span className="!text-brand-blue">{headingBlue2}</span>
        </Heading>

        {/* Plus Jakarta 18/20 base — 20px / 32px, same as Security body */}
        <Paragraph
          size="base"
          className="mx-auto mt-10 max-w-[800px] pb-[64px] text-center !text-[#4B5563] tablet-down:mt-12"
        >
          {body}
        </Paragraph>

        {/* 2 × 4 logo grid — 100px padding below */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-4 pb-[100px] tablet-down:grid-cols-4 tablet-down:gap-6">
          {slots.map((logo, i) => (
            <div
              key={`partner-logo-${i}`}
              className="flex min-h-[100px] items-center justify-center rounded-lg border border-brand-grey bg-white px-4 py-8 tablet-down:min-h-[120px]"
            >
              {logo.imageSrc ? (
                <Image
                  src={logo.imageSrc}
                  alt={logo.imageAlt}
                  width={180}
                  height={64}
                  className="h-auto max-h-14 w-auto max-w-[85%] object-contain"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
