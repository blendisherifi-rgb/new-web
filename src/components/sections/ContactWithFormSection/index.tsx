"use client";

import { useCallback, useEffect, useRef } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import Image from "next/image";
import Script from "next/script";

interface SocialLink {
  platform?: string;
  url?: string;
  label?: string;
}

interface ContactWithFormSectionProps {
  overline?: string | null;
  title?: string | null;
  socialLinks?: SocialLink[] | null;
}

function socialIconLabel(platform: string, fallback?: string): string {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) return "in";
  if (p.includes("youtube")) return "▶";
  if (p === "x" || p.includes("twitter")) return "x";
  return (fallback ?? platform).slice(0, 2);
}

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

/**
 * Contact hero + form on one gradient section (matches Contact Us 2 comp).
 * Background: softco-gradient; form uses semi-transparent light fields on blue.
 */
export function ContactWithFormSection({
  overline = "Contact Us",
  title = "Talk to the team that makes complex P2P and AP automation fit the first time",
  socialLinks = [],
}: ContactWithFormSectionProps) {
  const links = socialLinks?.filter((s) => s.url) ?? [];
  const targetId = "contact-with-form-hubspot-target";
  const createdRef = useRef(false);

  const createHubSpotForm = useCallback(() => {
    const hsWindow = window as HubSpotWindow;
    if (createdRef.current || !hsWindow.hbspt?.forms?.create) return;
    const target = document.getElementById(targetId);
    if (!target) return;

    target.innerHTML = "";
    hsWindow.hbspt.forms.create({
      portalId: "4912815",
      formId: "5be1aae9-faf4-4b85-a9df-8e2d9d5a2b3a",
      region: "na1",
      target: `#${targetId}`,
    });
    createdRef.current = true;
  }, []);

  useEffect(() => {
    createHubSpotForm();
    return () => {
      createdRef.current = false;
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = "";
    };
  }, [createHubSpotForm]);

  return (
    <section className="relative w-full overflow-hidden">
      <Script
        id="hubspot-forms-v2"
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={createHubSpotForm}
      />
      <Image
        src="/softco-gradient.jpg"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
        priority
      />
      <div className="relative">
        {/* Banner */}
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-4 py-12 text-center tablet-down:px-6 tablet-down:py-24">
          {overline ? (
            <Overline className="text-brand-orange">{overline}</Overline>
          ) : null}
          <Heading level={1} className="mt-6 max-w-[900px] text-white tablet-down:mt-[40px]">
            {title ?? ""}
          </Heading>
          {links.length > 0 ? (
            <ul className="mt-8 flex items-center justify-center gap-3 tablet-down:mt-[64px]">
              {links.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label ?? s.platform}
                    className="inline-flex h-[60px] w-[60px] items-center justify-center rounded-[4px] bg-[#060D2E]/60 text-[16px] font-bold text-white no-underline transition-opacity hover:opacity-90"
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center leading-none">
                      {socialIconLabel(s.platform ?? "", s.label)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Gap + Form */}
        <div className="pb-16 pt-4 tablet-down:pb-24 tablet-down:pt-10">
          <div className="mx-auto max-w-[800px] px-4 tablet-down:px-6">
            <div className="contact-with-form-hubspot">
              <div id={targetId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
