"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { shouldReduceMotion } from "@/lib/animations";

const ANIMATION_SRC = "/animations/homepage.json";
const PRELOADER_BG = "#047FE5";

export interface HomePreloaderProps {
  /** Called when the Lottie finishes (or immediately if reduced-motion skip). */
  onDone?: () => void;
}

export function HomePreloader({ onDone }: HomePreloaderProps) {
  const [gone, setGone] = useState(false);
  const [moduleLoaded, setModuleLoaded] = useState(false);
  const playerRef = useRef<HTMLElement | null>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const finish = useCallback(() => {
    onDoneRef.current?.();
    setGone(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) {
      finish();
      return;
    }
    void import("@lottiefiles/lottie-player").then(() => setModuleLoaded(true));
  }, [finish]);

  useLayoutEffect(() => {
    if (gone) return;
    const html = document.documentElement;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [gone]);

  useLayoutEffect(() => {
    if (gone || !moduleLoaded) return;
    const el = playerRef.current;
    if (!el) return;
    const onComplete = () => finish();
    el.addEventListener("complete", onComplete);
    return () => el.removeEventListener("complete", onComplete);
  }, [gone, moduleLoaded, finish]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex h-dvh w-full items-center justify-center px-6 py-10"
      style={{ backgroundColor: PRELOADER_BG }}
      aria-busy="true"
      aria-live="polite"
    >
      {moduleLoaded ? (
        <div className="mx-auto aspect-square w-[90vw] max-w-[90vw] shrink-0 min-[62rem]:w-[min(58vw,900px)] min-[62rem]:max-w-[min(92vw,900px)]">
          <lottie-player
            ref={(node) => {
              playerRef.current = node;
            }}
            src={ANIMATION_SRC}
            autoplay
            loop={false}
            background="transparent"
            speed={1}
            preserveAspectRatio="xMidYMid meet"
            className="block h-full w-full"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : null}
    </div>
  );
}
