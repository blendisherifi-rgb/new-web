"use client";

import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { Heading } from "@/components/atoms/Heading";

interface NewsletterFormSectionProps {
  heading?: string | null;
  ctaLabel?: string | null;
}

/**
 * Newsletter sign-up form section.
 * dark-bg.jpg background, 800px height, placeholder for HubSpot.
 * h2 > 60px gap to form; form > 40px to button.
 */
export function NewsletterFormSection({
  heading = "Sign up for finance automation updates",
  ctaLabel = "SIGN UP",
}: NewsletterFormSectionProps) {
  return (
    <section className="relative flex min-h-[800px] w-full flex-col items-center justify-center overflow-hidden py-16 md:py-24">
      <Image
        src="/dark-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div className="relative z-10 mx-auto flex w-[70%] min-w-[280px] max-w-[800px] flex-col items-center px-6">
        <Heading
          level={2}
          className="mb-[60px] text-center text-white"
        >
          {heading}
        </Heading>

        <form
          className="flex w-full flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="newsletter-first-name"
                className="font-body text-[14px] font-medium text-white"
              >
                First name <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="newsletter-first-name"
                type="text"
                required
                className="w-full rounded-[5px] border border-white/20 bg-white/10 px-4 py-3 font-body text-[16px] text-white placeholder:text-white/50 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                placeholder=""
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="newsletter-last-name"
                className="font-body text-[14px] font-medium text-white"
              >
                Last name <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="newsletter-last-name"
                type="text"
                required
                className="w-full rounded-[5px] border border-white/20 bg-white/10 px-4 py-3 font-body text-[16px] text-white placeholder:text-white/50 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                placeholder=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="newsletter-email"
              className="font-body text-[14px] font-medium text-white"
            >
              Business email <span className="text-brand-orange" aria-hidden>*</span>
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              className="w-full rounded-[5px] border border-white/20 bg-white/10 px-4 py-3 font-body text-[16px] text-white placeholder:text-white/50 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
              placeholder=""
            />
          </div>

          <label className="inline-flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 shrink-0 cursor-pointer rounded border-white/30 bg-white/10 text-brand-orange accent-brand-orange focus:ring-2 focus:ring-brand-orange/30"
            />
            <span className="font-body text-[14px] text-white/90">
              I would like to receive occasional SoftCo finance automation updates
            </span>
          </label>

          <div className="flex justify-center pt-[40px]">
            <Button
              type="submit"
              variant="orange"
              iconAfter={<ChevronRightIcon />}
            >
              {ctaLabel}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
