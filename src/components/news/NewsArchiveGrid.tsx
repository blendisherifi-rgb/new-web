import { ContentArchiveGrid } from "@/components/archives/ContentArchiveGrid";
import type { NewsListItem } from "@/lib/news";
import { newsUrl } from "@/lib/news";
import type { Locale } from "@/lib/i18n";

function formatNewsDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface NewsArchiveGridProps {
  items: NewsListItem[];
  locale: Locale;
}

export function NewsArchiveGrid({ items, locale }: NewsArchiveGridProps) {
  if (items.length === 0) return null;

  const gridItems = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    featuredImage: item.featuredImage,
    metaLine: formatNewsDate(item.date) || null,
  }));

  return (
    <ContentArchiveGrid
      items={gridItems}
      locale={locale}
      hrefForSlug={(slug) => newsUrl(slug, locale)}
      readMoreAriaNoun="news article"
    />
  );
}
