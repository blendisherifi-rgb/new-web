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

/**
 * Contact banner + form as one section with tall-bg.png spanning both.
 * 300px gap between banner and form.
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
        src="/tall-bg.png"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
        priority
      />
      <div className="relative">
        {/* Banner */}
        <div className="mx-auto flex max-w-[1440px] flex-col items-center px-6 py-16 text-center md:py-24">
          {overline ? (
            <Overline className="text-brand-orange">{overline}</Overline>
          ) : null}
          <Heading level={1} className="mt-[40px] max-w-[900px] text-white">
            {title ?? ""}
          </Heading>
          {links.length > 0 ? (
            <ul className="mt-[64px] flex items-center justify-center gap-3">
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

        {/* 300px gap + Form */}
        <div className="pt-[300px] pb-16 md:pb-24">
          <div className="mx-auto max-w-[800px] px-6">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-first-name" className="font-body text-[14px] font-medium text-white">
                    First name <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-first-name"
                    type="text"
                    required
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
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
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-email" className="font-body text-[14px] font-medium text-white">
                    Email <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-phone" className="font-body text-[14px] font-medium text-white">
                    Phone Number
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    placeholder="555–458 52"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-company" className="font-body text-[14px] font-medium text-white">
                    Company name <span className="text-brand-orange" aria-hidden>*</span>
                  </label>
                  <input
                    id="cf-company"
                    type="text"
                    required
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-role" className="font-body text-[14px] font-medium text-white">
                    Role
                  </label>
                  <input
                    id="cf-role"
                    type="text"
                    className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
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
                  className="w-full resize-y rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>
              <div className="flex flex-col gap-4">
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-brand-dark-20 text-brand-orange accent-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <span className="font-body text-[14px] text-white/90">
                    I agree my information can be used to contact me regarding my enquiry
                  </span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 shrink-0 cursor-pointer rounded border-brand-dark-20 text-brand-orange accent-brand-orange focus:ring-2 focus:ring-brand-orange/30"
                  />
                  <span className="font-body text-[14px] text-white/90">
                    I would like to receive occasional updates with technology insights from SoftCo
                  </span>
                </label>
              </div>
              <div className="flex justify-center pt-4">
                <Button type="submit" variant="orange" iconAfter={<ChevronRightIcon />}>
                  Send message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
