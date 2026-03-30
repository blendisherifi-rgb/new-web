import { notFound } from "next/navigation";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { Image } from "@/components/atoms/Image";
import { Link } from "@/components/atoms/Link";
import { fetchResourceBySlug } from "@/lib/resources";
import { buildMetadataFromYoast } from "@/lib/seo";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface ResourcePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const item = await fetchResourceBySlug(slug, locale);
  if (!item) return {};
  return buildMetadataFromYoast({
    seo: item.seo,
    fallbackTitle: `${item.title} | SoftCo`,
    fallbackDescription: item.excerpt ?? undefined,
    locale,
    path: `resources/${slug}`,
  });
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const item = await fetchResourceBySlug(slug, locale);
  if (!item) notFound();

  return (
    <article className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-[140px] py-16 md:py-24">
        <Link
          href={localePath("/resources", locale)}
          className="font-body text-sm font-medium text-brand-blue hover:underline"
        >
          ← Back to Resources
        </Link>

        <header className="mt-8">
          {item.date && (
            <time className="font-body text-sm text-brand-dark-40">
              {formatDate(item.date)}
            </time>
          )}
          <Heading level={1} className="mt-2 text-brand-dark">
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
