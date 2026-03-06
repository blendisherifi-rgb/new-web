import { fetchTeamMembersByDepartment } from "@/lib/team-members";
import { buildMetadataFromYoast } from "@/lib/seo";
import { isLocale } from "@/lib/i18n";
import { TeamArchiveSection } from "@/components/sections/TeamArchiveSection";

interface TeamPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TeamPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  return buildMetadataFromYoast({
    fallbackTitle: "Meet the Team | SoftCo",
    fallbackDescription: "Meet the SoftCo leadership and management team.",
    locale,
    path: "team",
  });
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "us";
  void locale;

  const departments = await fetchTeamMembersByDepartment();

  return (
    <TeamArchiveSection
      overline="TEAM"
      title="Meet our management team"
      body="Expertise, experience, and a shared commitment to helping finance teams work smarter."
      departments={departments}
    />
  );
}
