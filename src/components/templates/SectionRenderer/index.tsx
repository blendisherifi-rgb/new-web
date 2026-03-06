"use client";

import { SECTION_MAP, type SectionData } from "@/lib/sections";

/** Converts "finance_hero_section" → "Finance Hero" for the showcase badge. */
function toReadableLabel(acfGroupName: string): string {
  return acfGroupName
    .replace(/_section$/, "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

interface SectionRendererProps {
  sections: SectionData[];
  showLabels?: boolean;
}

/**
 * Renders ACF flexible sections in order.
 * Maps each section's acfGroupName to a React component from SECTION_MAP.
 */
export function SectionRenderer({ sections, showLabels = false }: SectionRendererProps) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    return process.env.NODE_ENV === "development" ? (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-brand-dark-60">
          No sections configured for this page. Add sections in WordPress (Content
          Sections) and ensure the GraphQL query returns them.
        </p>
        <p className="mt-4 text-sm text-brand-dark-40">
          Check docs/graphql-schema-check.md if the full ACF query is failing.
        </p>
      </div>
    ) : null;
  }

  return (
    <>
      {sorted.map((section) => {
        const Component = SECTION_MAP[section.acfGroupName];
        if (!Component) {
          return process.env.NODE_ENV === "development" ? (
            <div
              key={section.id}
              className="mx-auto max-w-2xl px-6 py-8 border border-amber-300 bg-amber-50 text-amber-900"
            >
              <strong>Unmapped section:</strong> {section.acfGroupName} — add to
              SECTION_MAP in src/lib/sections.ts
            </div>
          ) : null;
        }
        return (
          <div key={section.id} className={showLabels ? "relative" : undefined}>
            {showLabels && (
              <div className="pointer-events-none absolute left-0 top-0 z-50 flex items-center gap-2 rounded-br-lg bg-black/70 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  {toReadableLabel(section.acfGroupName)}
                </span>
                <span className="font-mono text-[11px] text-white/50">
                  {section.acfGroupName}
                </span>
              </div>
            )}
            <Component {...(section.fields as Record<string, unknown>)} />
          </div>
        );
      })}
    </>
  );
}
