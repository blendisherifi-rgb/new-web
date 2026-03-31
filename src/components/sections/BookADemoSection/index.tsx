"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Script from "next/script";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";

type HubSpotWindow = Window & {
  hbspt?: {
    forms?: {
      create: (config: {
        portalId: string;
        formId: string;
        region: string;
        target: string;
      }) => void;
    };
  };
};

export interface BookADemoSectionProps {
  /** Eyebrow, e.g. "BOOK A DEMO" (centered, orange). */
  overline: string;
  /** First line of the main headline (Erode, white on brand blue). */
  headingLine1: string;
  /** Second line of the main headline. */
  headingLine2: string;
  /** Centered intro under the headline. */
  intro: string;
  /**
   * Full-width screenshot of the demo form until HubSpot is embedded.
   * Replace the `<Image />` with the embed when ready.
   */
  formPlaceholderImageSrc: string;
  formPlaceholderImageAlt: string;
  /** Heading above the logo strip (Erode). */
  marqueeHeading: string;
  /** Client logos — same shape as `ClientLogosMarqueeSection` / `LogoMarquee`. */
  logos: LogoItem[];
  /** Marquee cycle duration in seconds (default matches `AutomationEngineSection`). */
  marqueeDuration?: number;
}

/**
 * Solid brand blue (`#047FE5` / `bg-brand-blue`): centered tag + two-line H2 + intro;
 * form placeholder image; trusted-by headline + logo marquee (no rules or dividers).
 */
export function BookADemoSection({
  overline,
  headingLine1,
  headingLine2,
  intro,
  formPlaceholderImageSrc,
  formPlaceholderImageAlt,
  marqueeHeading,
  logos,
  marqueeDuration = 25,
}: BookADemoSectionProps) {
  const normalizedLogos = logos.filter((l) => l.src);
  const showMarquee = normalizedLogos.length > 0;

  const instanceId = useId().replace(/:/g, "");
  const targetId = `book-a-demo-hubspot-target-${instanceId}`;
  const createdRef = useRef(false);

  const createHubSpotForm = useCallback(() => {
    const hsWindow = window as HubSpotWindow;
    if (createdRef.current || !hsWindow.hbspt?.forms?.create) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    if (target.querySelector(".hs-form")) {
      createdRef.current = true;
      return;
    }

    target.innerHTML = "";
    hsWindow.hbspt.forms.create({
      portalId: "4912815",
      formId: "5eaf5a91-c179-42a3-9649-84c18bc39a30",
      region: "na1",
      target: `#${targetId}`,
    });
    createdRef.current = true;
  }, [targetId]);

  useEffect(() => {
    createHubSpotForm();
    const timer = window.setInterval(() => {
      createHubSpotForm();
    }, 300);

    return () => {
      window.clearInterval(timer);
      createdRef.current = false;
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = "";
    };
  }, [createHubSpotForm, targetId]);

  return (
    <section className="w-full bg-brand-blue">
      <Script
        id="hubspot-forms-v2"
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 text-center tablet-down:px-6 tablet-down:py-24">
        <Overline className="text-brand-orange">{overline}</Overline>

        <Heading
          level={2}
          className="mx-auto mt-6 max-w-[min(100%,56rem)] font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] text-balance !text-white tablet-down:mt-8 tablet-down:text-[72px] tablet-down:leading-[1.08]"
        >
          <span className="block">{headingLine1}</span>
          <span className="mt-2 block tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        <Paragraph
          size="lg"
          className="mx-auto mt-8 max-w-[min(100%,40rem)] leading-[1.65] !text-white/90 tablet-down:mt-10"
        >
          {intro}
        </Paragraph>

        <div className="pb-16 pt-4 tablet-down:pb-24 tablet-down:pt-10">
          <div className="mx-auto max-w-[800px] px-4 tablet-down:px-6">
            <div className="contact-with-form-hubspot book-a-demo-hubspot">
              <div id={targetId} />
            </div>
          </div>
        </div>

        {showMarquee ? (
          <div className="mt-16 tablet-down:mt-20">
            <Heading
              level={3}
              className="mx-auto mb-10 w-full max-w-none px-1 text-center font-heading font-semibold !text-white tablet-down:mb-14 tablet-down:max-w-[min(100%,100rem)] tablet-down:text-[clamp(1.375rem,2.8vw,2.5rem)] tablet-down:leading-[1.15] tablet-down:whitespace-nowrap"
            >
              {marqueeHeading}
            </Heading>
            <div className="-mx-4 tablet-down:-mx-6">
              <LogoMarquee
                logos={normalizedLogos}
                duration={marqueeDuration}
                light
                pauseOnHover
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
