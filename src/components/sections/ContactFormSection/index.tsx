"use client";

import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import Image from "next/image";

/**
 * Placeholder contact form below the Contact banner.
 * 300px gap above. Uses same softco-gradient.jpg as banner for seamless blend.
 * Will be replaced with HubSpot form.
 */
export function ContactFormSection() {
  return (
    <section className="relative -mt-px min-h-[600px] w-full overflow-hidden pt-32 pb-12 tablet-down:pt-[300px] tablet-down:pb-24">
      <Image
        src="/softco-gradient.jpg"
        alt=""
        fill
        className="object-cover object-[center_bottom]"
        sizes="100vw"
      />
      <div className="relative mx-auto max-w-[800px] px-4 tablet-down:px-6">
        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Two-column row: First name, Last name */}
          <div className="grid gap-6 tablet-down:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="first-name" className="font-body text-[14px] font-medium text-white">
                First name <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="first-name"
                type="text"
                required
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder=""
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="last-name" className="font-body text-[14px] font-medium text-white">
                Last name <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="last-name"
                type="text"
                required
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder=""
              />
            </div>
          </div>

          {/* Two-column row: Email, Phone */}
          <div className="grid gap-6 tablet-down:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-body text-[14px] font-medium text-white">
                Email <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder=""
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="font-body text-[14px] font-medium text-white">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="555–458 52"
              />
            </div>
          </div>

          {/* Two-column row: Company name, Role */}
          <div className="grid gap-6 tablet-down:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company" className="font-body text-[14px] font-medium text-white">
                Company name <span className="text-brand-orange" aria-hidden>*</span>
              </label>
              <input
                id="company"
                type="text"
                required
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder=""
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="font-body text-[14px] font-medium text-white">
                Role
              </label>
              <input
                id="role"
                type="text"
                className="w-full rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder=""
              />
            </div>
          </div>

          {/* Full-width message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-body text-[14px] font-medium text-white">
              Your message <span className="text-brand-orange" aria-hidden>*</span>
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full resize-y rounded-[5px] border border-brand-dark-20 bg-[#ECECF1] px-4 py-3 font-body text-[16px] text-brand-dark placeholder:text-brand-dark-40 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              placeholder=""
            />
          </div>

          {/* Checkboxes */}
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

          {/* Submit */}
              <div className="flex justify-center pt-4">
                <Button type="submit" variant="orange" iconAfter={<ChevronRightIcon />}>
                  Send message
                </Button>
              </div>
        </form>
      </div>
    </section>
  );
}
