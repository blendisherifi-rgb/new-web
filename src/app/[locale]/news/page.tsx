import { Heading } from "@/components/atoms/Heading";
import { NewsArchiveGrid } from "@/components/news/NewsArchiveGrid";
import { fetchNewsArchive } from "@/lib/news";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: NewsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "News | SoftCo",
    fallbackDescription: "Latest news from SoftCo.",
    locale,
    path: "news",
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const { items, hasMore } = await fetchNewsArchive(locale, {
    perPage: 500,
  });

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 tablet-down:px-6 tablet-down:py-24">
        <div className="mx-auto max-w-[1100px] text-center">
          <Heading
            level={1}
            className="text-center !font-heading !font-semibold !text-[60px] !leading-[64px] !tracking-normal text-brand-dark"
          >
            News
          </Heading>
          <p className="mx-auto mt-6 max-w-[720px] font-body text-[20px] font-normal leading-[32px] tracking-normal text-brand-dark-60">
            Latest news from SoftCo.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="mt-16 text-center font-body text-brand-dark-60">
            No news yet. Check back soon.
          </p>
        ) : (
          <div className="mt-16">
            <NewsArchiveGrid items={items} locale={locale} />
          </div>
        )}

        {hasMore ? (
          <p className="mt-10 text-center font-body text-sm text-brand-dark-60">
            More than 500 news items are published — contact us to extend this list.
          </p>
        ) : null}
      </div>
    </section>
  );
}
