"use client";

import React, { useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon, XIcon } from "@/components/atoms/Icon";
import { acquireScrollLock } from "@/lib/scrollLock";

export interface TeamMember {
  /** Member name. */
  name: string;
  /** Job title. */
  title: string;
  /** Profile photo. */
  imageSrc: string;
  imageAlt?: string;
  /** Bio text. */
  bio?: string;
  /** LinkedIn URL. */
  linkedinUrl?: string;
}

interface MeetTheTeamSectionProps {
  /** Overline text. */
  overline: string;
  /** Section title. */
  title: string;
  /** Team members (up to 8 shown). */
  members: TeamMember[];
  /** CTA button label. */
  ctaLabel?: string;
  /** CTA button href. */
  ctaHref?: string;
}

function TeamModal({
  members,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  members: TeamMember[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const member = members[activeIndex];
  if (!member) return null;

  const nameParts = member.name.trim().split(" ");
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(" ");

  useEffect(() => {
    return acquireScrollLock();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  const ctrlBtnBase = "flex h-10 w-10 items-center justify-center rounded-md text-brand-dark transition-colors";

  function CtrlButton({ onClick, label, className = "", children }: { onClick: () => void; label: string; className?: string; children: React.ReactNode }) {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${ctrlBtnBase} ${className}`}
        style={hovered ? { backgroundColor: "#E8F2FD" } : {}}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-[960px] overflow-hidden rounded-lg bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left strip — nav controls */}
        <div className="flex w-[64px] shrink-0 flex-col items-center gap-4 bg-white border-r border-brand-grey py-8">
          <CtrlButton onClick={onClose} label="Close">
            <XIcon size="md" />
          </CtrlButton>
          <div className="flex flex-col gap-3 mt-2">
            {activeIndex < members.length - 1 && (
              <CtrlButton onClick={onNext} label="Next member">
                <ChevronRightIcon size="md" />
              </CtrlButton>
            )}
            {activeIndex > 0 && (
              <CtrlButton onClick={onPrev} label="Previous member" className="rotate-180">
                <ChevronRightIcon size="md" />
              </CtrlButton>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 md:p-12">
          {/* Header: name + title + LinkedIn */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-[40px] font-semibold leading-[44px] tracking-[-0.01em]">
                <span className="text-brand-blue">{firstName}</span>
                {restName && <span className="text-brand-dark"> {restName}</span>}
              </h2>
              <p className="mt-1 font-body text-[16px] text-brand-dark-60">
                {member.title}
              </p>
            </div>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-blue transition-opacity hover:opacity-80"
                aria-label={`${member.name} on LinkedIn`}
              >
                <NextImage
                  src="/linkedin-logo.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                />
              </a>
            )}
          </div>

          {/* Divider */}
          <hr className="my-6 border-brand-grey" />

          {/* Body: photo + bio */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div
              className="relative shrink-0 overflow-hidden bg-brand-grey"
              style={{ width: 332, height: 515 }}
            >
              <Image
                src={member.imageSrc}
                alt={member.imageAlt ?? member.name}
                fill
                className="object-cover object-top"
                sizes="332px"
              />
            </div>
            {member.bio && (
              <div className="flex flex-col justify-start items-start">
                {member.bio.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className={`font-body text-[16px] leading-[1.7] text-brand-dark text-left ${i > 0 ? "mt-4" : ""}`}
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Meet the team section.
 *
 * Blue background, overline, centered title, 4-col grid of team cards (max 8),
 * each with a "+" button that opens a modal with full bio and navigation.
 */
export function MeetTheTeamSection({
  overline,
  title,
  members,
  ctaLabel,
  ctaHref,
}: MeetTheTeamSectionProps) {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const visibleMembers = members.slice(0, 8);

  const openModal = (i: number) => setModalIndex(i);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const nextMember = useCallback(() => {
    setModalIndex((i) => (i !== null && i < visibleMembers.length - 1 ? i + 1 : i));
  }, [visibleMembers.length]);
  const prevMember = useCallback(() => {
    setModalIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(350.88deg, #1F99F2 -0.15%, #0D72D4 92.5%)" }}
      >
        {/* 20% white tint overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-32">
          {/* Overline */}
          <Overline className="text-brand-orange">{overline}</Overline>

          {/* Centered title */}
          <Heading level={2} className="mt-6 text-center text-white">
            {title}
          </Heading>

          {/* 4-column grid — 60px column gap, 100px row gap */}
          <div className="mt-10 grid grid-cols-1 gap-y-8 tablet-down:mt-16 tablet-down:grid-cols-4 tablet-down:gap-x-[60px] tablet-down:gap-y-[100px]">
            {visibleMembers.map((member, i) => (
              <div key={i} className="flex flex-col">
                {/* Card image with "+" button — 332×515 */}
                <div className="relative overflow-hidden rounded-sm">
                  <div
                    className="relative w-full aspect-square bg-brand-blue-40 tablet-down:aspect-[332/515]"
                  >
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt ?? member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  {/* "+" button top-right */}
                  <button
                    type="button"
                    onClick={() => openModal(i)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm bg-brand-orange text-white text-[20px] leading-none font-bold transition-opacity hover:opacity-80"
                    aria-label={`View ${member.name} profile`}
                  >
                    +
                  </button>
                </div>

                {/* Name + title below card */}
                <div className="mt-4 text-center">
                  <p className="font-heading text-[20px] font-semibold leading-[24px] text-white">
                    {member.name}
                  </p>
                  <p className="mt-1 font-body text-[14px] text-white/70">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          {ctaLabel && ctaHref && (
            <div className="mt-16 flex justify-center">
              <Button variant="dark" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {modalIndex !== null && (
        <TeamModal
          members={visibleMembers}
          activeIndex={modalIndex}
          onClose={closeModal}
          onNext={nextMember}
          onPrev={prevMember}
        />
      )}
    </>
  );
}
