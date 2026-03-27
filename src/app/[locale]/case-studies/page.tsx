import { Heading } from "@/components/atoms/Heading";
import { CaseStudyArchiveGrid } from "@/components/case-studies/CaseStudyArchiveGrid";
import { fetchCaseStudiesArchive } from "@/lib/case-studies";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";

interface CaseStudiesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; solution?: string; industry?: string }>;
}

export async function generateMetadata({ params }: CaseStudiesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Case Studies | SoftCo",
    fallbackDescription: "See how SoftCo helps enterprises automate P2P and AP in complex environments.",
    locale,
    path: "case-studies",
  });
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const { items, hasMore } = await fetchCaseStudiesArchive(locale, {
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
            Case Studies
          </Heading>
          <p className="mx-auto mt-6 max-w-[720px] font-body text-[20px] font-normal leading-[32px] tracking-normal text-brand-dark-60">
            See how SoftCo helps enterprises automate P2P and AP in complex environments.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="mt-16 text-center font-body text-brand-dark-60">
            No case studies yet. Check back soon.
          </p>
        ) : (
          <div className="mt-16">
            <CaseStudyArchiveGrid items={items} locale={locale} />
          </div>
        )}

        {hasMore ? (
          <p className="mt-10 text-center font-body text-sm text-brand-dark-60">
            More than 500 case studies are published — contact us to extend this list.
          </p>
        ) : null}
      </div>
    </section>
  );
}
