"use client";

import type { ReactNode } from "react";
import { Component } from "react";

interface AppErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches client-side rendering errors so we don't show Next.js' generic
 * "Application error" screen for content pages (WP/ACF).
 */
export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally no-op: we don't have a logger here.
    // Next.js will still log the error in the browser/dev console.
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="font-heading text-[26px] font-semibold text-brand-dark">
            Something went wrong while loading this page.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-dark-60">
            Please refresh the page. If the issue continues, contact SoftCo support.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="rounded-[5px] bg-brand-blue px-5 py-3 font-body text-[13px] font-bold text-white hover:brightness-95"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as any;
  }
}

