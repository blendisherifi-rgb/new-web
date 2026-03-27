"use client";

import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import Image from "next/image";

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

const contactFieldClass =
  "w-full rounded-[5px] border border-white/25 bg-[#E8EEF8]/35 px-4 py-3 font-body text-[16px] text-brand-dark shadow-inner backdrop-blur-sm placeholder:text-brand-dark/50 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/25";

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

  return (
    <section className="relative w-full overflow-hidden">
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
        <div className="pb-16 pt-12 tablet-down:pb-24 tablet-down:pt-[120px]">
          <div className="mx-auto max-w-[800px] px-4 tablet-down:px-6">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 tablet-down:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-first-name" className="font-body text-[14px] font-medium text-white">
                    First name <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    className={contactFieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-last-name" className="font-body text-[14px] font-medium text-white">
                    Last name <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    className={contactFieldClass}
                  />
                </div>
              </div>
              <div className="grid gap-6 tablet-down:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-email" className="font-body text-[14px] font-medium text-white">
                    Email <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    autoComplete="email"
                    className={contactFieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-job-title" className="font-body text-[14px] font-medium text-white">
                    Job title <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-job-title"
                    type="text"
                    required
                    autoComplete="organization-title"
                    className={contactFieldClass}
                  />
                </div>
              </div>
              <div className="grid gap-6 tablet-down:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-company" className="font-body text-[14px] font-medium text-white">
                    Company name <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-company"
                    type="text"
                    required
                    autoComplete="organization"
                    className={contactFieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-role" className="font-body text-[14px] font-medium text-white">
                    Role
                  </label>
                  <select id="cf-role" defaultValue="" className={`${contactFieldClass} cursor-pointer`}>
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="cfo">CFO / Finance leader</option>
                    <option value="ap">Accounts Payable Manager</option>
                    <option value="procurement">Procurement / P2P</option>
                    <option value="it">IT / Digital transformation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cf-message" className="font-body text-[14px] font-medium text-white">
                  Your message <span className="text-brand-orange" aria-hidden>*</span>
                </label>
                <textarea
                  id="cf-message"
                  required
                  rows={5}
                  className={contactFieldClass}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-white/30 text-brand-orange accent-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <span className="font-body text-[14px] text-white/90">
                    I agree my information can be used to contact me regarding my enquiry
                  </span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-white/30 text-brand-orange accent-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <span className="font-body text-[14px] text-white/90">
                    I would like to receive occasional updates with technology insights from SoftCo
                  </span>
                </label>
              </div>
              <div className="flex justify-center pt-4">
                <Button type="submit" variant="orange" iconAfter={<ChevronRightIcon />}>
                  SEND MESSAGE
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
