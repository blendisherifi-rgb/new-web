"use client";

import { useCallback, useEffect, useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { Image } from "@/components/atoms/Image";
import { ChevronRightIcon, XIcon } from "@/components/atoms/Icon";
import { HeadlineWithHighlight } from "@/components/molecules/HeadlineWithHighlight";

export interface FeatureModalItem {
  title: string;
  description: string;
  modalLabel?: string;
  modalTitle?: string;
  modalDescription: string;
  imageSrc: string;
  imageAlt?: string;
}

export interface FeatureModalSectionProps {
  overline: string;
  headingBefore: string;
  headingHighlight: string;
  headingAfter: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  items: FeatureModalItem[];
}

/* ─── Right-aligned full-height modal panel ────────────────────────────── */

function FeatureModal({
  items,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  items: FeatureModalItem[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const item = items[activeIndex];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  const canGoNext = activeIndex < items.length - 1;
  const canGoPrev = activeIndex > 0;

  const navBtnBase =
    "flex h-[48px] w-full items-center justify-center text-brand-dark/70 transition-colors hover:bg-brand-light-blue hover:text-brand-dark disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={item.modalTitle || item.title}
    >
      {/* Full-screen dark backdrop — click anywhere to close */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{ backgroundColor: "rgba(6, 13, 46, 0.45)" }}
        onClick={onClose}
      />

      {/* Floating nav buttons — separate block, NOT part of the white panel.
          Only as tall as the 3 buttons. Below them: transparent (backdrop shows). */}
      <div
        className="absolute top-0 flex flex-col bg-white"
        style={{ right: "calc(62% - 56px)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className={`${navBtnBase} border-b border-brand-grey`}
          aria-label="Close"
        >
          <XIcon size="sm" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className={`${navBtnBase} border-b border-brand-grey`}
          aria-label="Next"
        >
          <span className="inline-flex">
            <ChevronRightIcon size="sm" strokeWidth={2} />
          </span>
        </button>
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className={navBtnBase}
          aria-label="Previous"
        >
          <span className="inline-flex rotate-180">
            <ChevronRightIcon size="sm" strokeWidth={2} />
          </span>
        </button>
      </div>

      {/* White content panel — right-aligned, full height */}
      <div
        className="absolute right-0 top-0 flex h-full w-[62%] min-w-[420px] flex-col overflow-hidden bg-white shadow-[-6px_0_30px_rgba(0,0,0,0.15)]"
      >
        <div className="flex-1 overflow-hidden px-8 py-8 tablet-down:px-10 tablet-down:py-10">
          <Overline className="text-brand-orange">
            {(item.modalLabel || "LABEL").toUpperCase()}
          </Overline>

          <Heading level={2} className="mt-3 text-left !text-brand-blue">
            {item.modalTitle || item.title}
          </Heading>

          <Paragraph
            size="caption"
            className="mt-4 max-w-[min(100%,38rem)] leading-[1.7] text-brand-dark-80"
          >
            {item.modalDescription}
          </Paragraph>

          <div className="mt-6 overflow-hidden rounded-sm border border-brand-grey">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? item.modalTitle ?? item.title}
              width={545}
              height={398}
              className="h-auto w-full max-w-[545px] object-cover"
              sizes="(max-width: 992px) 90vw, 54vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature card ─────────────────────────────────────────────────────── */

function FeatureCard({
  item,
  onClick,
}: {
  item: FeatureModalItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full cursor-pointer bg-transparent px-0 py-0 text-left"
      aria-label={`Open details for ${item.title}`}
    >
      <Heading
        level={5}
        className="text-left !text-brand-blue"
      >
        {item.title}
      </Heading>

      <Paragraph
        size="caption"
        className="mt-4 max-w-[min(100%,30rem)] text-brand-dark-60"
      >
        {item.description}
      </Paragraph>

      {/* Orange + centered above hyphen line */}
      <div className="mt-6 flex w-[48px] flex-col items-center">
        <span className="font-body text-[13px] font-bold leading-none text-brand-orange">
          +
        </span>
        <span className="mt-1.5 block h-[2px] w-full bg-brand-orange" aria-hidden />
      </div>
    </button>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────── */

export function FeatureModalSection({
  overline,
  headingBefore,
  headingHighlight,
  headingAfter,
  body,
  ctaLabel,
  ctaHref,
  items,
}: FeatureModalSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => setActiveIndex(null), []);
  const nextItem = useCallback(() => {
    setActiveIndex((c) => (c !== null && c < items.length - 1 ? c + 1 : c));
  }, [items.length]);
  const prevItem = useCallback(() => {
    setActiveIndex((c) => (c !== null && c > 0 ? c - 1 : c));
  }, []);

  return (
    <>
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
          <div className="grid grid-cols-1 gap-12 tablet-down:grid-cols-[1fr_1.1fr] tablet-down:gap-16 tablet-down:items-start">
            {/* Left — sticky on desktop */}
            <div className="tablet-down:sticky tablet-down:top-24 tablet-down:self-start">
              <Overline className="text-brand-orange">{overline}</Overline>
              <HeadlineWithHighlight
                headingBefore={headingBefore}
                headingHighlight={headingHighlight}
                headingAfter={headingAfter}
                level={1}
                className="mt-5 max-w-[min(100%,34rem)] text-brand-dark"
              />
              <Paragraph size="lg" className="mt-7 max-w-[min(100%,28rem)] text-brand-dark-80">
                {body}
              </Paragraph>
              <div className="mt-9">
                <Button variant="orange" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                  {ctaLabel}
                </Button>
              </div>
            </div>

            {/* Right — stacked cards */}
            <div className="flex flex-col gap-5 tablet-down:gap-6">
              {items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="py-6">
                  <FeatureCard item={item} onClick={() => setActiveIndex(index)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <FeatureModal
          items={items}
          activeIndex={activeIndex}
          onClose={closeModal}
          onNext={nextItem}
          onPrev={prevItem}
        />
      )}
    </>
  );
}
