"use client";

import { useState, useEffect } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronRightIcon } from "@/components/atoms/Icon";
import { LogoMarquee, type LogoItem } from "@/components/molecules/LogoMarquee";
import { Image } from "@/components/atoms/Image";
import { shouldReduceMotion } from "@/lib/animations";
import Lottie from "lottie-react";

interface HeroSectionProps {
  /** Main headline. */
  title: string;
  /** CTA button label. */
  ctaLabel: string;
  /** CTA button href. */
  ctaHref: string;
  /** Logos for the marquee. */
  logos: LogoItem[];
  /** Platform screenshot image. */
  imageSrc: string;
  imageAlt: string;
  /** Optional Lottie JSON URL — plays once on load, then fades to main content. */
  lottieUrl?: string;
}

/**
 * Hero banner section.
 *
 * Dark blue background, H1, dark CTA button with chevron,
 * logo marquee, and platform screenshot.
 */
export function HeroSection({
  title,
  ctaLabel,
  ctaHref,
  logos,
  imageSrc,
  imageAlt,
  lottieUrl,
}: HeroSectionProps) {
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [lottieComplete, setLottieComplete] = useState(false);
  const [showLottie, setShowLottie] = useState(!!lottieUrl);

  useEffect(() => {
    if (!lottieUrl || shouldReduceMotion()) {
      setShowLottie(false);
      return;
    }
    fetch(lottieUrl)
      .then((r) => r.json())
      .then(setLottieData)
      .catch(() => setShowLottie(false));
  }, [lottieUrl]);

  const handleLottieComplete = () => {
    setLottieComplete(true);
    setTimeout(() => setShowLottie(false), 400);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#1F99F2,#0D72D4)]">
      {showLottie && lottieData && (
        <div
          className={`absolute inset-0 z-10 flex items-center justify-center bg-[linear-gradient(180deg,#1F99F2,#0D72D4)] transition-opacity duration-[400ms] ${
            lottieComplete ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Lottie
            animationData={lottieData}
            loop={false}
            onComplete={handleLottieComplete}
            className="max-h-[80vh] max-w-full"
          />
        </div>
      )}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-[180px] pb-[120px]">
        <div className="flex flex-col items-center text-center">
          {/* H1 - 48px gap to button */}
          <Heading level={1} className="text-white max-w-4xl">
            {title}
          </Heading>

          {/* Button - 100px gap to marquee */}
          <div className="mt-12">
            <Button variant="dark" href={ctaHref} iconAfter={<ChevronRightIcon />}>
              {ctaLabel}
            </Button>
          </div>

          {/* Marquee - 48px gap to image */}
          {logos.length > 0 && (
            <div className="mt-[100px] w-full">
              <LogoMarquee logos={logos} duration={25} light />
            </div>
          )}

          {/* Platform screenshot - 48px from marquee */}
          <div className="mt-12 w-full">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1440}
                height={900}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
