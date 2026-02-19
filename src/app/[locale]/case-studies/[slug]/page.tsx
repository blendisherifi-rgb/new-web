import { notFound } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { fetchCaseStudyBySlug } from "@/lib/case-studies";
import { buildMetadataFromYoast } from "@/lib/seo";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface CaseStudyPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchCaseStudyBySlug(slug, locale);
  if (!item) return {};
  return buildMetadataFromYoast({
    seo: item.seo,
    fallbackTitle: `${item.title} | SoftCo`,
    fallbackDescription: item.excerpt ?? undefined,
    locale,
    path: `case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const item = await fetchCaseStudyBySlug(slug, locale);
  if (!item) notFound();

  return (
    <article className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Link
          href={localePath("/case-studies", locale)}
          className="font-body text-sm font-medium text-brand-blue hover:underline"
        >
          ← Back to Case Studies
        </Link>

        <header className="mt-8">
          <Heading level={1} className="text-brand-dark">
            {item.title}
          </Heading>
          {item.featuredImage?.sourceUrl && (
            <div className="mt-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={item.featuredImage.sourceUrl}
                alt={item.featuredImage.altText ?? item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          )}
        </header>

        {item.excerpt && (
          <Paragraph size="lg" className="mt-8 text-brand-dark">
            <span dangerouslySetInnerHTML={{ __html: item.excerpt }} />
          </Paragraph>
        )}

        {item.content && (
          <div
            className="wp-content mt-12 font-body text-brand-dark [&_p]:mt-4 [&_h2]:mt-8 [&_h3]:mt-6 [&_ul]:mt-4 [&_ol]:mt-4 [&_li]:mt-1 [&_a]:text-brand-blue [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}
      </div>
    </article>
  );
}
