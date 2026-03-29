"use client";

import { createContext, useContext } from "react";

export interface HomeBannerEntranceContextValue {
  /** True only when wrapped by the homepage preloader shell. */
  coordinatedEntrance: boolean;
  /** True after the full-screen Lottie preloader finishes (or immediately if reduced motion). */
  preloaderComplete: boolean;
}

export const HomeBannerEntranceContext = createContext<HomeBannerEntranceContextValue>({
  coordinatedEntrance: false,
  preloaderComplete: true,
});

export function useHomeBannerEntrance() {
  return useContext(HomeBannerEntranceContext);
}
