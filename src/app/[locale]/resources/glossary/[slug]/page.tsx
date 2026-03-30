import { notFound } from "next/navigation";
import { Link } from "@/components/atoms/Link";
import { fetchGlossaryBySlug } from "@/lib/glossary";
import { localePath } from "@/lib/i18n";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface GlossaryEntryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/**
 * Glossary detail requirement: do NOT show the glossary title heading.
 * Remove the first heading block from WP content (h1-h6), if present.
 */
function removeFirstHeading(content: string): string {
  return content.replace(/^\s*(?:<!--[\s\S]*?-->\s*)*<(h[1-6])[^>]*>[\s\S]*?<\/\1>\s*/i, "");
}

export async function generateMetadata({ params }: GlossaryEntryPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const entry = await fetchGlossaryBySlug(slug, locale);
  if (!entry) return {};
  return buildMetadataFromYoast({
    fallbackTitle: "Glossary | SoftCo",
    fallbackDescription: entry.excerpt ?? "Glossary entry",
    locale,
    path: `resources/glossary/${slug}`,
  });
}

export default async function GlossaryEntryPage({ params }: GlossaryEntryPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "us";

  const entry = await fetchGlossaryBySlug(slug, locale);

  if (!entry) {
    notFound();
  }

  const content = entry.content ? removeFirstHeading(entry.content) : null;

  return (
    <section className="w-full bg-white pt-[180px]">
      <div className="mx-auto max-w-[800px] px-6 pb-16 pt-0 md:pb-24 md:pt-0">
        <Link
          href={localePath("/resources/glossary", locale)}
          className="mb-6 inline-block font-body text-sm font-medium text-brand-blue hover:underline"
        >
          ← Back to Glossary
        </Link>

        {content ? (
          <div
            className="prose mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="mt-6 font-body text-brand-dark-60">Definition coming soon.</p>
        )}
      </div>
    </section>
  );
}
