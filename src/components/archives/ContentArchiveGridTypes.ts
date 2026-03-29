export interface ContentArchiveGridItem {
  id: string;
  slug: string;
  title: string;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  tags?: string[];
  clientLogoOverlay?: { sourceUrl?: string; altText?: string } | null;
  metaLine?: string | null;
  directHref?: string;
  typeBadge?: string | null;
  readTimeLabel?: string | null;
}
