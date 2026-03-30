import { Heading } from "@/components/atoms/Heading";
import { Overline } from "@/components/atoms/Overline";
import { Paragraph } from "@/components/atoms/Paragraph";
import { GlossaryContent } from "@/components/glossary/GlossaryContent";
import { fetchGlossaryArchive } from "@/lib/glossary";
import { buildMetadataFromYoast } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface ResourcesGlossaryPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResourcesGlossaryPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Glossary | SoftCo",
    fallbackDescription:
      "Finance, AP automation, and P2P terms explained. Browse our glossary of key concepts.",
    locale,
    path: "resources/glossary",
  });
}

export default async function ResourcesGlossaryPage({ params }: ResourcesGlossaryPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "us";

  const { terms, byLetter } = await fetchGlossaryArchive(locale);

  return (
    <>
      <section className="w-full bg-brand-dark px-4 pt-[120px] py-12 tablet-down:px-6 tablet-down:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center pt-[80px] text-center">
          <Overline className="text-brand-orange">Resources</Overline>
          <Heading level={1} className="mt-10 text-white">
            Glossary of terms
          </Heading>
          <Paragraph className="mt-6 text-white/90" size="lg">
            Know your AP from your P2P, and your EPR from GRNI.
          </Paragraph>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-12 pt-10 tablet-down:flex-row tablet-down:gap-12 tablet-down:px-6 tablet-down:pb-24 tablet-down:pt-10">
          <GlossaryContent terms={terms} byLetter={byLetter} locale={locale} />
        </div>
      </section>
    </>
  );
}
