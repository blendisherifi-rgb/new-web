"use client";

import { SECTION_MAP, type SectionData } from "@/lib/sections";

interface SectionRendererProps {
  sections: SectionData[];
}

/**
 * Renders ACF flexible sections in order.
 * Maps each section's acfGroupName to a React component from SECTION_MAP.
 */
export function SectionRenderer({ sections }: SectionRendererProps) {
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
          <Component key={section.id} {...(section.fields as Record<string, unknown>)} />
        );
      })}
    </>
  );
}
