"use client";

type LockState = {
  count: number;
  prevBodyOverflow: string;
  prevHtmlOverflow: string;
};

declare global {
  interface Window {
    __softcoScrollLock?: LockState;
  }
}

export function acquireScrollLock() {
  if (typeof window === "undefined") {
    return () => {};
  }

  const state: LockState = window.__softcoScrollLock ?? {
    count: 0,
    prevBodyOverflow: "",
    prevHtmlOverflow: "",
  };
  window.__softcoScrollLock = state;

  if (state.count === 0) {
    state.prevBodyOverflow = document.body.style.overflow;
    state.prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  state.count += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    state.count = Math.max(0, state.count - 1);
    if (state.count === 0) {
      document.body.style.overflow = state.prevBodyOverflow;
      document.documentElement.style.overflow = state.prevHtmlOverflow;
    }
  };
}
