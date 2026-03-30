import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";

export interface CaseStudiesHeroSectionProps {
  /** Small caps line above the headline (orange). */
  overline?: string;
  /** Main headline — white, Erode, centered. */
  headline: string;
  /** Intro copy under the headline. */
  body: string;
  /** Client logos (shown as white knockouts on the blue band). */
  logos: LogoItem[];
  /** Marquee cycle duration in seconds. */
  marqueeDuration?: number;
}

/**
 * Case studies index hero: brand blue band, orange overline, white headline + intro, logo marquee.
 */
export function CaseStudiesHeroSection({
  overline = "CLIENT SUCCESS STORIES",
  headline,
  body,
  logos,
  marqueeDuration = 25,
}: CaseStudiesHeroSectionProps) {
  const normalizedLogos = logos.filter((l) => l.src);

  return (
    <section
      className="w-full bg-brand-blue pt-[120px]"
      aria-label={overline}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 py-14 text-center tablet-down:px-6 tablet-down:py-20">
        <Overline className="text-brand-orange">{overline}</Overline>

        <Heading
          level={1}
          className="mx-auto mt-6 max-w-[min(100%,48rem)] font-heading font-semibold text-[40px] leading-[1.12] tracking-normal text-balance !text-white tablet-down:mt-8 tablet-down:text-[min(4.5vw,72px)] tablet-down:leading-[1.08]"
        >
          {headline}
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,40rem)] leading-[1.65] !text-white/90 tablet-down:mt-10"
        >
          {body}
        </Paragraph>

        {normalizedLogos.length > 0 ? (
          <div className="mt-14 tablet-down:mt-16">
            <div className="-mx-4 tablet-down:-mx-6">
              <LogoMarquee
                logos={normalizedLogos}
                duration={marqueeDuration}
                light
                pauseOnHover
                noEdgeFade
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
