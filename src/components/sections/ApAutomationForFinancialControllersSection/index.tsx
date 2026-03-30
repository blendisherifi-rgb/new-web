import { Overline } from "@/components/atoms/Overline";
import { Image } from "@/components/atoms/Image";

export interface ApAutomationForFinancialControllersSectionProps {
  /** Orange eyebrow (e.g. AP AUTOMATION FOR FINANCIAL CONTROLLERS). */
  overline?: string;
  /** First part of the headline — brand blue (Erode 600 / 80px / 82px desktop). */
  headingBlue?: string;
  /** Second part of the headline — dark navy. */
  headingDark?: string;
  /** ACF “AP automation for CFO” layout: blue segment on line 1 (replaces headingBlue/headingDark when set). */
  headingHighlight?: string;
  /** Text after the blue segment on line 1. */
  headingLine1After?: string;
  headingLine2?: string;
  headingLine3?: string;
  /** Left column image — design size 581×506. */
  imageSrc: string;
  imageAlt: string;
  /** Body copy; use a blank line between paragraphs if needed. */
  body: string;
  /** `left` = image first column (default). `right` = text first column, image second. */
  imagePosition?: "left" | "right";
}

const bodyParagraphClass =
  "font-body text-[18px] font-normal leading-[30px] tracking-normal text-brand-dark tablet-down:text-[20px] tablet-down:leading-[32px]";

function splitParagraphs(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/**
 * Light blue band (#E8F2FD): orange overline, full-width rule with centered tick,
 * two columns — 581×506 image + two-tone Erode headline + body (`imagePosition` swaps sides).
 */
const headlineClass =
  "font-heading font-semibold tracking-normal text-[40px] leading-[1.15] text-brand-dark tablet-down:text-[80px] tablet-down:leading-[82px]";

export function ApAutomationForFinancialControllersSection({
  overline = "AP AUTOMATION FOR FINANCIAL CONTROLLERS",
  headingBlue = "",
  headingDark = "",
  headingHighlight = "",
  headingLine1After = "",
  headingLine2 = "",
  headingLine3 = "",
  imageSrc,
  imageAlt,
  body,
  imagePosition = "left",
}: ApAutomationForFinancialControllersSectionProps) {
  const paragraphs = splitParagraphs(body);
  const imageOrder = imagePosition === "left" ? "order-1" : "order-2";
  const textOrder = imagePosition === "left" ? "order-2" : "order-1";

  const useCfoHeadline =
    Boolean(headingHighlight || headingLine1After || headingLine2 || headingLine3);

  return (
    <section className="w-full bg-[#E8F2FD]" aria-label={overline}>
      <div className="mx-auto w-full max-w-[1440px] px-4 py-14 tablet-down:px-6 tablet-down:py-20">
        <div className="w-full pb-2">
          <Overline className="block text-left text-brand-orange">{overline}</Overline>
          <div className="relative mt-3 w-full tablet-down:mt-4" aria-hidden>
            <div className="h-px w-full bg-brand-grey" />
            <div className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-brand-grey" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-10 tablet-down:mt-12 tablet-down:grid-cols-2 tablet-down:gap-x-14 tablet-down:gap-y-0 lg:gap-x-20">
          <div
            className={`mx-auto w-full max-w-[581px] tablet-down:mx-0 ${imageOrder}`}
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={581}
                  height={506}
                  className="h-auto w-full object-cover"
                />
              ) : null}
            </div>
          </div>

          <div className={`min-w-0 ${textOrder}`}>
            {useCfoHeadline ? (
              <h2 className={headlineClass}>
                <span className="block">
                  {headingHighlight ? (
                    <span className="text-brand-blue">{headingHighlight}</span>
                  ) : null}
                  {headingLine1After ? (
                    <span className="text-brand-dark">{headingLine1After}</span>
                  ) : null}
                </span>
                {headingLine2 ? <span className="block text-brand-dark">{headingLine2}</span> : null}
                {headingLine3 ? <span className="block text-brand-dark">{headingLine3}</span> : null}
              </h2>
            ) : headingBlue || headingDark ? (
              <h2 className={headlineClass}>
                {headingBlue ? (
                  <span className="text-brand-blue">{headingBlue}</span>
                ) : null}
                {headingBlue && headingDark ? " " : null}
                {headingDark ? (
                  <span className="text-brand-dark">{headingDark}</span>
                ) : null}
              </h2>
            ) : null}
            {paragraphs.length > 0 ? (
              <div className="mt-8 space-y-5 tablet-down:mt-10">
                {paragraphs.map((p, idx) => (
                  <p key={idx} className={bodyParagraphClass}>
                    {p}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Same band + typography as Financial Controllers; text column left, image right (stack: text then image on mobile). */
export function ApSoftcoExperienceSection(
  props: ApAutomationForFinancialControllersSectionProps,
) {
  return (
    <ApAutomationForFinancialControllersSection
      {...props}
      overline={props.overline ?? "YOUR SOFTCO EXPERIENCE"}
      imagePosition="right"
    />
  );
}
