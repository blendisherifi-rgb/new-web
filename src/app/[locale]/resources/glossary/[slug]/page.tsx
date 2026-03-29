import { notFound } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { fetchGlossaryBySlug } from "@/lib/glossary";
import { localePath } from "@/lib/i18n";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface GlossaryEntryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: GlossaryEntryPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const entry = await fetchGlossaryBySlug(slug, locale);
  if (!entry) return {};
  return buildMetadataFromYoast({
    fallbackTitle: `${entry.title} | Glossary | SoftCo`,
    fallbackDescription: entry.excerpt ?? `Definition of ${entry.title}`,
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

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[800px] px-6 py-16 md:py-24">
        <Link
          href={localePath("/resources/glossary", locale)}
          className="mb-6 inline-block font-body text-sm font-medium text-brand-blue hover:underline"
        >
          ← Back to Glossary
        </Link>

        <Heading level={1} className="text-brand-dark">
          {entry.title}
        </Heading>

        {entry.content ? (
          <div
            className="prose mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        ) : (
          <p className="mt-6 font-body text-brand-dark-60">Definition coming soon.</p>
        )}
      </div>
    </section>
  );
}
