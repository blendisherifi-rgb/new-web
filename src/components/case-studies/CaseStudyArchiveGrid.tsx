"use client";

import { ContentArchiveGrid } from "@/components/archives/ContentArchiveGrid";
import type { CaseStudyListItem } from "@/lib/case-studies";
import { caseStudyUrl } from "@/lib/case-studies";
import type { Locale } from "@/lib/i18n";

interface CaseStudyArchiveGridProps {
  items: CaseStudyListItem[];
  locale: Locale;
}

/**
 * Case studies archive — same bordered 3-column grid as other archives.
 */
export function CaseStudyArchiveGrid({ items, locale }: CaseStudyArchiveGridProps) {
  if (items.length === 0) return null;

  const gridItems = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    featuredImage: item.featuredImage,
    tags: item.tags,
    clientLogoOverlay: item.clientLogoOverlay,
  }));

  return (
    <ContentArchiveGrid
      items={gridItems}
      hrefForSlug={(slug) => caseStudyUrl(slug, locale)}
      readMoreAriaNoun="case study"
    />
  );
}
