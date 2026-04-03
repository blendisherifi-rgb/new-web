"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Script from "next/script";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

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

export interface StartChallengeFormSectionProps {
  /** Top-left eyebrow, e.g. "START THE CHALLENGE". */
  overline: string;
  /** First line of the headline (navy). */
  headingLine1: string;
  /** Second line — brand blue (e.g. "challenge"). */
  headingHighlight: string;
  sectionTitleLevel?: SectionTitleLevel;
}

/**
 * Plain white section: orange overline + grey rule with left tick (same as other
 * sections), two-line Erode headline, HubSpot placeholder image.
 */
export function StartChallengeFormSection({
  overline,
  headingLine1,
  headingHighlight,
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: StartChallengeFormSectionProps) {
  const instanceId = useId().replace(/:/g, "");
  const targetId = `start-challenge-hubspot-target-${instanceId}`;
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
      formId: "8102c8e8-2d88-4427-bd6a-6ad7e5de82c3",
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
    <section className="w-full bg-white">
      <Script
        id="hubspot-forms-v2"
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
      />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-10 tablet-down:px-6 tablet-down:pb-24">
        {/* Eyebrow + full-width grey rule + left tick — same pattern as Strategic Priorities (light line on white) */}
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <div
            className="relative mt-3 h-px w-full bg-brand-grey before:absolute before:left-0 before:top-1/2 before:z-10 before:block before:h-[10px] before:w-px before:-translate-y-1/2 before:bg-brand-grey before:content-['']"
            aria-hidden
          />
        </div>

        <Heading
          level={sectionTitleLevel}
          className="mx-auto mb-[50px] mt-10 max-w-[min(100%,75rem)] text-center font-heading font-semibold text-[46px] leading-[1.1] tracking-[0] tablet-down:mt-12 tablet-down:text-[80px] tablet-down:leading-[88px]"
        >
          <span className="block text-brand-dark">{headingLine1}</span>
          <span className="mt-2 block text-brand-blue tablet-down:mt-3">
            {headingHighlight}
          </span>
        </Heading>

        <div className="mx-auto w-full max-w-[920px]">
          <div className="contact-with-form-hubspot">
            <div id={targetId} />
          </div>
        </div>
      </div>
    </section>
  );
}
