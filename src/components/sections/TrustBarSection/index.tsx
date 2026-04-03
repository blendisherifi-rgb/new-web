import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface TrustBarLogo {
  imageSrc: string;
  imageAlt: string;
}

interface TrustBarSectionProps {
  /** Main heading — e.g. "Built on integrity. Guided by accountability." */
  heading: string;
  /** Certification logos (5 shown in single row). */
  logos: TrustBarLogo[];
  sectionTitleLevel?: SectionTitleLevel;
}

/** Rule line with tick ends — light on gradient background. */
function ruleLine() {
  return (
    <div className="flex w-full items-center" aria-hidden>
      <div className="h-2 w-px shrink-0 bg-white/40" />
      <div className="h-px min-w-0 flex-1 bg-white/40" />
      <div className="h-2 w-px shrink-0 bg-white/40" />
    </div>
  );
}

/**
 * Trust bar section — blue linear gradient bg (#1F99F2 → #0D72D4);
 * rule lines top/bottom with tick ends; centered heading; row of certification logos
 * in light blue semi-transparent tiles.
 */
export function TrustBarSection({
  heading = "Built on integrity. Guided by accountability.",
  logos,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: TrustBarSectionProps) {
  const displayLogos = logos.slice(0, 5);
  while (displayLogos.length < 5) {
    displayLogos.push({ imageSrc: "", imageAlt: "" });
  }

  return (
    <section
      className="w-full py-16 tablet-down:py-24"
      style={{
        background: "linear-gradient(180deg, #1F99F2 0%, #0D72D4 100%)",
      }}
      aria-label="Trust and certifications"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 tablet-down:px-6">
        {/* Top rule */}
        {ruleLine()}

        {/* Centered heading */}
        <Heading
          level={sectionTitleLevel}
          className="mx-auto mt-12 max-w-[900px] text-center font-heading font-medium text-white text-[40px] leading-[1.2] tablet-down:mt-16 tablet-down:text-[60px] tablet-down:leading-[1.15]"
        >
          {heading}
        </Heading>

        {/* Logo row — light blue semi-transparent tiles */}
        <div className="mt-12 grid grid-cols-2 gap-4 tablet-down:mt-16 tablet-down:grid-cols-5 tablet-down:gap-6">
          {displayLogos.map((logo, i) => (
            <div
              key={i}
              className="flex min-h-[100px] items-center justify-center rounded-lg bg-white/20 px-4 py-6 backdrop-blur-sm tablet-down:min-h-[120px] tablet-down:px-6 tablet-down:py-8"
            >
              {logo.imageSrc ? (
                <Image
                  src={logo.imageSrc}
                  alt={logo.imageAlt}
                  width={180}
                  height={80}
                  className="h-auto max-h-14 w-auto max-w-full object-contain brightness-0 invert tablet-down:max-h-16"
                />
              ) : (
                <span className="text-center font-body text-sm font-medium text-white/60">
                  Logo {i + 1}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-12 tablet-down:mt-16">{ruleLine()}</div>
      </div>
    </section>
  );
}
