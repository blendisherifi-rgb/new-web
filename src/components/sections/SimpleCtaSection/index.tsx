"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Script from "next/script";

import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";

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

interface SimpleCtaSectionProps {
  overline: string;
  title?: string;
  headingBefore?: string;
  headingHighlight?: string;
  headingAfter?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function SimpleCtaSection({
  overline,
  title,
  headingBefore,
  headingHighlight,
  headingAfter,
  description,
  ctaLabel,
  ctaHref,
}: SimpleCtaSectionProps) {
  const hasHighlight = !!headingHighlight;

  const instanceId = useId().replace(/:/g, "");
  const targetId = `simple-cta-hubspot-target-${instanceId}`;
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
      formId: "c0da67bb-b47c-4cbe-b177-6fca9357ee85",
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
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-28">
        <div className="mx-auto max-w-[760px] text-center">
          <Overline className="text-[16px]">{overline}</Overline>

          <div className="mt-6 tablet-down:mt-[40px]">
            {hasHighlight ? (
              <HeadlineWithHighlight
                headingBefore={headingBefore ?? ""}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter ?? ""}
                level={2}
                className="font-semibold leading-[1.05] text-brand-dark"
              />
            ) : (
              <Heading level={2} className="leading-[1.05]">
                {title}
              </Heading>
            )}
          </div>

          <Paragraph size="base" className="mt-6 tablet-down:mt-[40px] leading-[1.6]">
            {description}
          </Paragraph>

        </div>

        <div className="mx-auto mt-10 w-full max-w-[760px]">
          <div className="contact-with-form-hubspot">
            <div id={targetId} />
          </div>
        </div>
      </div>
    </section>
  );
}

