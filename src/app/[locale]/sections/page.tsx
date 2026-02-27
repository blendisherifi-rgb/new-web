import { SectionRenderer } from "@/components/templates";
import { SECTIONS_SHOWCASE_GROUPS } from "@/lib/sections-showcase";
import type { Locale } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n";

interface SectionsPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata = {
  title: "Sections — SoftCo",
  description: "Section showcase for development. All section components in one place.",
};

export default async function SectionsPage({ params }: SectionsPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";

  return (
    <div data-locale={locale}>
      <div className="border-b border-brand-dark-7 bg-brand-pale-blue/30 px-6 py-6">
        <h1 className="font-heading text-2xl font-semibold text-brand-dark md:text-3xl">
          Section showcase
        </h1>
        <p className="mt-2 font-body text-base text-brand-dark-60">
          All section components grouped like ACF. Work here, reuse everywhere.
        </p>
      </div>
      <div className="divide-y divide-brand-dark-10">
        {SECTIONS_SHOWCASE_GROUPS.map((group, i) => (
          <div key={group.groupName ?? `group-${i}`} className="relative">
            {group.groupName ? (
              <div className="sticky top-0 z-10 border-b border-brand-dark-10 bg-white/95 px-6 py-3 backdrop-blur-sm">
                <span className="font-body text-sm font-bold uppercase tracking-widest text-brand-blue">
                  {group.groupName}
                </span>
                <span className="ml-2 font-body text-sm text-brand-dark-40">
                  ({group.sections.length} section{group.sections.length !== 1 ? "s" : ""})
                </span>
              </div>
            ) : null}
            <SectionRenderer sections={group.sections} />
          </div>
        ))}
      </div>
    </div>
  );
}
