import { Heading } from "@/components/atoms/Heading";
import { Link } from "@/components/atoms/Link";
import { Image } from "@/components/atoms/Image";
import { fetchResourcesArchive, resourceUrl } from "@/lib/resources";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface ResourcesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; topic?: string; type?: string }>;
}

export async function generateMetadata({ params }: ResourcesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Resources & Insights | SoftCo",
    fallbackDescription: "Articles, whitepapers, and videos on P2P and AP automation.",
    locale,
    path: "resources",
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

export default async function ResourcesPage({ params, searchParams }: ResourcesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  const { page: pageParam, topic, type } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const { items, hasMore } = await fetchResourcesArchive(locale, {
    page,
    perPage: 12,
    topic: topic ?? undefined,
    type: type ?? undefined,
  });

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Heading level={1} className="text-brand-dark">
          Resources & Insights
        </Heading>
        <p className="mt-4 font-body text-lg text-brand-dark">
          Articles, whitepapers, and videos on P2P and AP automation.
        </p>

        {items.length === 0 ? (
          <p className="mt-12 font-body text-brand-dark">
            No resources yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={resourceUrl(item.slug, locale)}
                  className="group block overflow-hidden rounded-lg border border-brand-grey bg-white transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden bg-brand-grey">
                    {item.featuredImage?.sourceUrl ? (
                      <Image
                        src={item.featuredImage.sourceUrl}
                        alt={item.featuredImage.altText ?? item.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-brand-dark-40">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {item.date && (
                      <time className="font-body text-xs text-brand-dark-40">
                        {formatDate(item.date)}
                      </time>
                    )}
                    <h2 className="mt-2 font-heading text-xl font-semibold text-brand-dark group-hover:text-brand-blue">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p
                        className="mt-2 line-clamp-3 font-body text-sm text-brand-dark"
                        dangerouslySetInnerHTML={{ __html: item.excerpt }}
                      />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {hasMore && (
          <p className="mt-8 font-body text-sm text-brand-dark">
            Pagination coming soon — more resources available in WordPress.
          </p>
        )}
      </div>
    </section>
  );
}
