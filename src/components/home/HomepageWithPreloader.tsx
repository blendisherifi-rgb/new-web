"use client";

import { useCallback, useState, type ReactNode } from "react";
import { HomePreloader } from "./HomePreloader";
import { HomeBannerEntranceContext } from "./homeBannerEntranceContext";

interface HomepageWithPreloaderProps {
  children: ReactNode;
}

export function HomepageWithPreloader({ children }: HomepageWithPreloaderProps) {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const handleDone = useCallback(() => setPreloaderComplete(true), []);

  return (
    <HomeBannerEntranceContext.Provider
      value={{ coordinatedEntrance: true, preloaderComplete }}
    >
      <HomePreloader onDone={handleDone} />
      {children}
    </HomeBannerEntranceContext.Provider>
  );
}
