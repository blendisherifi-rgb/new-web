import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { GlossaryContent } from "@/components/glossary/GlossaryContent";
import { fetchGlossaryTerms } from "@/lib/glossary";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface GlossaryPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GlossaryPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Glossary | SoftCo",
    fallbackDescription:
      "Finance, AP automation, and P2P terms explained. Browse our glossary of key concepts.",
    locale,
    path: "glossary",
  });
}

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  const { terms, byLetter } = await fetchGlossaryTerms(locale);

  return (
    <>
      {/* Banner: #060D2E, overline → h1 (40px) → body (24px) */}
      <section className="w-full bg-brand-dark px-6 py-16 md:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
          <Overline className="text-brand-orange">Resources</Overline>
          <Heading level={1} className="mt-10 text-white">
            Glossary of terms
          </Heading>
          <Paragraph className="mt-6 text-white/90" size="lg">
            Know your AP from your P2P, and your EPR from GRNI.
          </Paragraph>
        </div>
      </section>

      {/* Main content: sticky sidebar (25%) + 2-col glossary (75%) */}
      <section className="w-full bg-white">
        <div className="mx-auto flex max-w-[1440px] gap-12 px-6 py-16 md:py-24">
          <GlossaryContent terms={terms} byLetter={byLetter} locale={locale} />
        </div>
      </section>
    </>
  );
}
