"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";
import { Image } from "@/components/atoms/Image";
import { shouldReduceMotion, shouldSkipIntroLocksOnMobile } from "@/lib/animations";
import { useHomeBannerEntrance } from "@/components/home/homeBannerEntranceContext";
import { acquireScrollLock } from "@/lib/scrollLock";
import Lottie from "lottie-react";

interface HeroSectionProps {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  logos: LogoItem[];
  imageSrc: string;
  imageAlt: string;
  lottieUrl?: string;
}

/** Gap between chained entrance steps (after title motion completes, between fades) */
const STAGGER_MS = 75;
/** Quick opacity fade on the title before it moves up */
const TITLE_FADE_IN_MS = 220;
/** Title: translateY(350px) → 0 */
const ENTRANCE_TITLE_MS = 750;
/** Opacity fade for button row and image row */
const ENTRANCE_FADE_MS = 450;
/** After last fade completes, unlock scroll / drop min-height guard */
const ENTRANCE_TAIL_MS = 80;

export function HeroSection({
  title,
  ctaLabel,
  ctaHref,
  logos,
  imageSrc,
  imageAlt,
  lottieUrl,
}: HeroSectionProps) {
  const { coordinatedEntrance: coordinated, preloaderComplete } = useHomeBannerEntrance();
  const reduceMotion = shouldReduceMotion() || shouldSkipIntroLocksOnMobile();
  const useCoord = coordinated && !reduceMotion;

  const [titleFadeIn, setTitleFadeIn] = useState(!useCoord);
  const [titleMoved, setTitleMoved] = useState(!useCoord);
  const [buttonVisible, setButtonVisible] = useState(!useCoord);
  const [imageVisible, setImageVisible] = useState(!useCoord);
  const [entranceSettled, setEntranceSettled] = useState(!useCoord);

  const [lottieData, setLottieData] = useState<object | null>(null);
  const [lottieComplete, setLottieComplete] = useState(false);
  const [showLottie, setShowLottie] = useState(!!lottieUrl && !coordinated);

  useEffect(() => {
    if (!lottieUrl || reduceMotion || coordinated) {
      setShowLottie(false);
      return;
    }
    fetch(lottieUrl)
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => setShowLottie(false));
  }, [lottieUrl, coordinated, reduceMotion]);

  // 1) Fade title in (still offset), 2) then slide up
  useLayoutEffect(() => {
    if (!useCoord || !preloaderComplete) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setTitleFadeIn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [useCoord, preloaderComplete]);

  useEffect(() => {
    if (!useCoord || !titleFadeIn || titleMoved) return;
    const id = window.setTimeout(() => setTitleMoved(true), TITLE_FADE_IN_MS);
    return () => window.clearTimeout(id);
  }, [useCoord, titleFadeIn, titleMoved]);

  useLayoutEffect(() => {
    if (!useCoord || entranceSettled) return;
    return acquireScrollLock();
  }, [useCoord, entranceSettled]);

  useEffect(() => {
    if (!useCoord || !titleMoved) return;
    // Timers from when the upward slide starts (titleMoved)
    const afterSlide = ENTRANCE_TITLE_MS + STAGGER_MS;
    const afterButton = afterSlide + ENTRANCE_FADE_MS + STAGGER_MS;
    const tBtn = window.setTimeout(() => setButtonVisible(true), afterSlide);
    const tImg = window.setTimeout(() => setImageVisible(true), afterButton);
    return () => {
      window.clearTimeout(tBtn);
      window.clearTimeout(tImg);
    };
  }, [useCoord, titleMoved]);

  useEffect(() => {
    if (!useCoord) {
      setEntranceSettled(true);
      return;
    }
    if (!imageVisible) return;
    const id = window.setTimeout(() => setEntranceSettled(true), ENTRANCE_FADE_MS + ENTRANCE_TAIL_MS);
    return () => window.clearTimeout(id);
  }, [useCoord, imageVisible]);

  const titleClass =
    "mx-auto w-full max-w-4xl text-balance text-center text-white tablet-down:max-w-4xl";

  const titleMoveClass = titleMoved ? "translate-y-0" : "translate-y-[350px]";

  const fadeStyle = useCoord
    ? {
        transitionProperty: "opacity",
        transitionDuration: `${ENTRANCE_FADE_MS}ms`,
        transitionTimingFunction: "ease-out" as const,
      }
    : undefined;

  return (
    <section
      className={`relative w-full overflow-hidden bg-[linear-gradient(180deg,#1F99F2,#0D72D4)] ${
        useCoord && !entranceSettled ? "min-h-dvh" : ""
      }`}
    >
      {showLottie && lottieData && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(180deg,#1F99F2,#0D72D4)] transition-opacity duration-400 ${
            lottieComplete ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <Lottie
            animationData={lottieData}
            loop={false}
            onComplete={() => {
              setLottieComplete(true);
              setTimeout(() => setShowLottie(false), 400);
            }}
            className="max-h-[80vh] max-w-full"
          />
        </div>
      )}

      <div className="mx-auto w-full max-w-[1440px] px-4 pt-[120px] pb-[80px] tablet-down:px-6 tablet-down:pt-[180px] tablet-down:pb-[120px]">
        <div className="flex w-full flex-col items-center text-center">
          {/* Outer: quick fade-in; inner: slide up after fade */}
          <div
            className={`w-full will-change-opacity motion-reduce:opacity-100 ${
              titleFadeIn ? "opacity-100" : "opacity-0"
            } transition-opacity ease-out motion-reduce:transition-none`}
            style={
              useCoord
                ? { transitionDuration: `${TITLE_FADE_IN_MS}ms` }
                : undefined
            }
          >
            <div
              className={`will-change-transform motion-reduce:translate-y-0 motion-reduce:transition-none ${titleMoveClass} transition-transform ease-[cubic-bezier(0.33,1,0.68,1)]`}
              style={{
                transitionDuration: titleMoved ? `${ENTRANCE_TITLE_MS}ms` : undefined,
              }}
            >
              <Heading level={1} className={titleClass}>
                {title}
              </Heading>
            </div>
          </div>

          <div
            aria-hidden={useCoord && !buttonVisible}
            className={`flex w-full flex-col items-center motion-reduce:opacity-100 ${
              !useCoord || buttonVisible ? "opacity-100" : "opacity-0"
            } ${useCoord ? "motion-reduce:transition-none" : ""}`}
            style={fadeStyle}
          >
            <div className="mt-8 tablet-down:mt-12">
              <Button variant="dark" href={ctaHref} iconAfter={<ChevronRightIcon />}>
                {ctaLabel}
              </Button>
            </div>

            {logos.length > 0 && (
              <div className="mt-12 w-full tablet-down:mt-[100px]">
                <LogoMarquee logos={logos} duration={25} light />
              </div>
            )}
          </div>

          <div
            aria-hidden={useCoord && !imageVisible}
            className={`mt-8 w-full motion-reduce:opacity-100 tablet-down:mt-12 ${
              !useCoord || imageVisible ? "opacity-100" : "opacity-0"
            } ${useCoord ? "motion-reduce:transition-none" : ""}`}
            style={fadeStyle}
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1440}
                height={900}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
