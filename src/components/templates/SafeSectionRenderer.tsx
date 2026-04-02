"use client";

import { useEffect, useState } from "react";
import { SectionRenderer } from "@/components/templates";
import type { SectionData } from "@/lib/sections";

interface SafeSectionRendererProps {
  sections: SectionData[];
  showLabels?: boolean;
}

/**
 * Prevents server-component render crashes from WP/ACF-driven sections.
 *
 * We intentionally render nothing during SSR, then mount on the client.
 * Once mounted, `SectionRenderer` (and its per-section error boundaries)
 * handle any remaining client-side rendering issues.
 */
export function SafeSectionRenderer({ sections, showLabels = false }: SafeSectionRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-busy="true"
        className="w-full min-h-[240px]"
      />
    );
  }

  return <SectionRenderer sections={sections} showLabels={showLabels} />;
}

