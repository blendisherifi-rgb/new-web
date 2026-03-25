import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";

export interface EvidenceMetric {
  imageSrc: string;
  imageAlt: string;
  /** Label under the infographic — Erode 600, 32px / 36px, center. */
  label: string;
}

interface EvidenceSectionProps {
  overline?: string;
  /** First line of the headline (e.g. "More than a software."). */
  headingBefore: string;
  /** Blue segment (e.g. "A partnership"). */
  headingHighlight: string;
  /** Rest of second line (e.g. "proven at enterprise scale"). */
  headingAfter: string;
  body: string;
  /** Four metric columns: image + label each. */
  metrics: EvidenceMetric[];
}

/**
 * The Evidence — bg #E8F2FD; same eyebrow / rule / heading scale / body rhythm as Partner Ecosystem;
 * 60px rule→title, 64px paragraph→grid, 100px below metrics; column dividers on desktop.
 */
export function EvidenceSection({
  overline = "THE EVIDENCE",
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  metrics,
}: EvidenceSectionProps) {
  const slots = [...metrics.slice(0, 4)];
  while (slots.length < 4) {
    slots.push({ imageSrc: "", imageAlt: "", label: "" });
  }

  return (
    <section
      className="w-full bg-[#E8F2FD]"
      aria-label={overline}
    >
      {/* Match PartnerEcosystemSection: max width, padding, vertical rhythm */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 tablet-down:px-6 tablet-down:py-16">
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

        {/* Two lines: line 1 dark; line 2 blue + dark — same H1 scale as Partner */}
        <Heading
          level={1}
          className="mx-auto mt-[60px] max-w-[1100px] text-center !text-brand-dark text-[46px] leading-[52px] tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block !text-brand-dark">{headingBefore}</span>
          <span className="mt-2 block tablet-down:mt-3">
            <span className="!text-brand-blue">{headingHighlight}</span>{" "}
            <span className="!text-brand-dark">{headingAfter}</span>
          </span>
        </Heading>

        <Paragraph
          size="base"
          className="mx-auto mt-10 max-w-[800px] pb-[64px] text-center !text-[#4B5563] tablet-down:mt-12"
        >
          {body}
        </Paragraph>

        {/* 2×2 mobile, 4 cols desktop — same max width as Partner grid; vertical rules between columns */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-x-4 gap-y-10 pb-[100px] tablet-down:grid-cols-4 tablet-down:gap-x-0 tablet-down:gap-y-0">
          {slots.map((m, i) => (
            <div
              key={`evidence-metric-${i}`}
              className="flex flex-col items-center border-b border-brand-grey/40 pb-10 last:border-b-0 tablet-down:border-b-0 tablet-down:border-l tablet-down:border-brand-grey/40 tablet-down:pb-0 tablet-down:px-5 first:tablet-down:border-l-0 first:tablet-down:pl-0 last:tablet-down:pr-0"
            >
              <div className="flex w-full max-w-[200px] shrink-0 items-center justify-center">
                {m.imageSrc ? (
                  <Image
                    src={m.imageSrc}
                    alt={m.imageAlt}
                    width={200}
                    height={200}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 991px) 45vw, 200px"
                  />
                ) : null}
              </div>
              {m.label ? (
                <p className="mt-6 max-w-[260px] text-center font-heading font-semibold text-[32px] leading-[36px] tracking-[0] text-brand-dark">
                  {m.label}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
