import type { Locale } from "@/lib/i18n";
import { ArchiveGridBody } from "@/components/archives/ArchiveGridBody";
import type { ContentArchiveGridItem } from "@/components/archives/ContentArchiveGridTypes";

export type { ContentArchiveGridItem } from "@/components/archives/ContentArchiveGridTypes";

interface ContentArchiveGridProps {
  items: ContentArchiveGridItem[];
  locale: Locale;
  hrefForSlug: (slug: string) => string;
  /** Noun for aria-label, e.g. "case study" or "news article". */
  readMoreAriaNoun: string;
  /** Archive columns from tablet breakpoint up (default 3). */
  columnCount?: 2 | 3;
}

/**
 * Bordered archive grid (1 col mobile): image, optional logo, tags or meta line, title, orange CTA.
 * Default 3 columns from tablet; pass `columnCount={2}` for two-column layouts.
 */
export function ContentArchiveGrid({
  items,
  locale: _locale,
  hrefForSlug,
  readMoreAriaNoun,
  columnCount = 3,
}: ContentArchiveGridProps) {
  if (items.length === 0) return null;

  const resolved = items.map((item) => ({
    ...item,
    href: item.directHref ?? hrefForSlug(item.slug),
  }));

  return (
    <ArchiveGridBody items={resolved} readMoreAriaNoun={readMoreAriaNoun} columnCount={columnCount} />
  );
}
