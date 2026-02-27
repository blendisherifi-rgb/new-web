import { notFound } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { fetchGlossaryTermBySlug } from "@/lib/glossary";
import { localePath } from "@/lib/i18n";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface GlossaryTermPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: GlossaryTermPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const term = await fetchGlossaryTermBySlug(slug, locale);
  if (!term) return {};
  return buildMetadataFromYoast({
    fallbackTitle: `${term.title} | Glossary | SoftCo`,
    fallbackDescription: term.excerpt ?? `Definition of ${term.title}`,
    locale,
    path: `glossary/${slug}`,
  });
}

export default async function GlossaryTermPage({ params }: GlossaryTermPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const term = await fetchGlossaryTermBySlug(slug, locale);

  if (!term) {
    notFound();
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[800px] px-6 py-16 md:py-24">
        <Link
          href={localePath("/glossary", locale)}
          className="mb-6 inline-block font-body text-sm font-medium text-brand-blue hover:underline"
        >
          ← Back to Glossary
        </Link>

        <Heading level={1} className="text-brand-dark">
          {term.title}
        </Heading>

        {term.content ? (
          <div
            className="prose mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: term.content }}
          />
        ) : (
          <p className="mt-6 font-body text-brand-dark-60">
            Definition coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
