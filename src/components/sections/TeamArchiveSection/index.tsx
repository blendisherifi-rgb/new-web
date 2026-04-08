"use client";

import React, { useState, useEffect, useCallback } from "react";
import NextImage from "next/image";
import { Image } from "@/components/atoms/Image";
import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { ChevronRightIcon, XIcon } from "@/components/atoms/Icon";
import type { TeamMember } from "@/components/sections/MeetTheTeamSection";
import { acquireScrollLock } from "@/lib/scrollLock";
import type { SectionTitleLevel } from "@/lib/sectionTitleLevel";
import { DEFAULT_SECTION_TITLE_LEVEL } from "@/lib/sectionTitleLevel";

export interface TeamDepartment {
  /** Department taxonomy term name, e.g. "Executive Leadership". */
  name: string;
  /** Members belonging to this department. */
  members: TeamMember[];
}

interface TeamArchiveSectionProps {
  /** Small orange overline at the top. */
  overline: string;
  /** Main heading. */
  title: string;
  /** Optional subtitle / body copy. */
  body?: string;
  /** All departments, each with their members. */
  departments: TeamDepartment[];
  sectionTitleLevel?: SectionTitleLevel;
}

/* ─── Modal ──────────────────────────────────────────────────────────────── */

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

  function CtrlButton({
    onClick, label, className = "", children,
  }: { onClick: () => void; label: string; className?: string; children: React.ReactNode }) {
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
        <div className="flex w-[64px] shrink-0 flex-col items-center gap-4 border-r border-brand-grey bg-white py-8">
          <CtrlButton onClick={onClose} label="Close">
            <XIcon size="md" />
          </CtrlButton>
          <div className="mt-2 flex flex-col gap-3">
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-[40px] font-semibold leading-[44px] tracking-[-0.01em]">
                <span className="text-brand-blue">{firstName}</span>
                {restName && <span className="text-brand-dark"> {restName}</span>}
              </h2>
              <p className="mt-1 font-body text-[16px] text-brand-dark-60">{member.title}</p>
            </div>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-blue transition-opacity hover:opacity-80"
                aria-label={`${member.name} on LinkedIn`}
              >
                <NextImage src="/linkedin-logo.svg" alt="LinkedIn" width={16} height={16} />
              </a>
            )}
          </div>

          <hr className="my-6 border-brand-grey" />

          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="relative shrink-0 overflow-hidden bg-brand-grey" style={{ width: 332, height: 515 }}>
              <Image
                src={member.imageSrc}
                alt={member.imageAlt ?? member.name}
                fill
                className="object-cover object-top"
                sizes="332px"
              />
            </div>
            {member.bio && (
              <div className="flex flex-col items-start justify-start">
                {member.bio.split("\n\n").map((para, i) => (
                  <p key={i} className={`text-left font-body text-[16px] leading-[1.7] text-brand-dark ${i > 0 ? "mt-4" : ""}`}>
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

/* ─── Member card ─────────────────────────────────────────────────────────── */

function MemberCard({
  member,
  globalIndex,
  onOpen,
}: {
  member: TeamMember;
  globalIndex: number;
  onOpen: (i: number) => void;
}) {
  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-sm">
        <div className="relative w-full aspect-square bg-brand-blue-40 tablet-down:aspect-[332/515]">
          <Image
            src={member.imageSrc}
            alt={member.imageAlt ?? member.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
        <button
          type="button"
          onClick={() => onOpen(globalIndex)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm bg-brand-orange text-[20px] font-bold leading-none text-white transition-opacity hover:opacity-80"
          aria-label={`View ${member.name} profile`}
        >
          +
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="font-heading text-[20px] font-semibold leading-[24px] text-white">{member.name}</p>
        <p className="mt-1 font-body text-[14px] text-white/70">{member.title}</p>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */

/**
 * Team archive section.
 *
 * Full team listing grouped by department taxonomy.
 * Same blue gradient background, card UI, and modal as MeetTheTeamSection.
 * Modal navigates across the entire flattened member list.
 */
export function TeamArchiveSection({
  overline,
  title,
  body,
  departments = [],
  sectionTitleLevel = DEFAULT_SECTION_TITLE_LEVEL,
}: TeamArchiveSectionProps) {
  const safeDepartments = Array.isArray(departments) ? departments : [];
  const allMembers = safeDepartments.flatMap((d) => d.members ?? []);

  // Track each member's global index: dept index → member index → global index.
  let globalCounter = 0;
  const deptGlobalOffsets: number[][] = safeDepartments.map((dept) => {
    const offsets = dept.members.map(() => globalCounter++);
    return offsets;
  });

  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const closeModal = useCallback(() => setModalIndex(null), []);
  const nextMember = useCallback(() => {
    setModalIndex((i) => (i !== null && i < allMembers.length - 1 ? i + 1 : i));
  }, [allMembers.length]);
  const prevMember = useCallback(() => {
    setModalIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  return (
    <>
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "linear-gradient(350.88deg, #1F99F2 -0.15%, #0D72D4 92.5%)" }}
      >
        {/* 20% white tint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        />
        {/* #060D2E dark tint at 15% */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "rgba(6, 13, 46, 0.15)" }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-16 tablet-down:px-6 tablet-down:pb-32 tablet-down:pt-32">

          {/* Header */}
          <div className="text-center">
            <Overline className="text-brand-orange">{overline}</Overline>
            <Heading level={sectionTitleLevel} className="mt-6 text-white">
              {title}
            </Heading>
            {body && (
              <p className="mx-auto mt-6 max-w-[640px] font-body text-[18px] leading-[1.7] text-white/80">
                {body}
              </p>
            )}
          </div>

          {/* Department groups */}
          {safeDepartments.map((dept, di) => (
            <div key={di} className="mt-10 tablet-down:mt-24">
              {/* Department overline + divider */}
              <Overline className="text-brand-orange">{dept.name}</Overline>
              <hr className="mt-3 border-0 border-t border-white/30" />

              {/* Members grid */}
              <div className="mt-8 grid grid-cols-1 gap-y-8 tablet-down:mt-10 tablet-down:grid-cols-4 tablet-down:gap-x-[60px] tablet-down:gap-y-[100px]">
                {dept.members.map((member, mi) => (
                  <MemberCard
                    key={mi}
                    member={member}
                    globalIndex={deptGlobalOffsets[di][mi]}
                    onOpen={setModalIndex}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalIndex !== null && (
        <TeamModal
          members={allMembers}
          activeIndex={modalIndex}
          onClose={closeModal}
          onNext={nextMember}
          onPrev={prevMember}
        />
      )}
    </>
  );
}
