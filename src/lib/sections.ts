/**
 * ACF section → React component mapping registry.
 * Add new ACF group → component mappings here when new section types are added.
 */

import { HeroSection } from "@/components/sections/HeroSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { WhereWeExcelSection } from "@/components/sections/WhereWeExcelSection";
import { InnovationSection } from "@/components/sections/InnovationSection";
import { HorizontalScrollSection } from "@/components/sections/HorizontalScrollSection";
import { TabbedContentSection } from "@/components/sections/TabbedContentSection";
import { RoleAccordionSection } from "@/components/sections/RoleAccordionSection";
import { ReviewLogosSection } from "@/components/sections/ReviewLogosSection";
import { SimpleCtaSection } from "@/components/sections/SimpleCtaSection";
import { PerfectFitFrameworkSection } from "@/components/sections/PerfectFitFrameworkSection";
import { RichTextSection } from "@/components/sections/RichTextSection";
import { ContactBannerSection } from "@/components/sections/ContactBannerSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactWithFormSection } from "@/components/sections/ContactWithFormSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { ClientLogosMarqueeSection } from "@/components/sections/ClientLogosMarqueeSection";
import { NewsletterFormSection } from "@/components/sections/NewsletterFormSection";

export interface SectionData {
  id: string;
  acfGroupName: string;
  order: number;
  fields: Record<string, unknown>;
}

export const SECTION_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  hero_section: HeroSection as unknown as React.ComponentType<Record<string, unknown>>,
  where_we_excel_section: WhereWeExcelSection as unknown as React.ComponentType<Record<string, unknown>>,
  platform_section: PlatformSection as unknown as React.ComponentType<Record<string, unknown>>,
  innovation_section: InnovationSection as unknown as React.ComponentType<Record<string, unknown>>,
  horizontal_scroll_section: HorizontalScrollSection as unknown as React.ComponentType<Record<string, unknown>>,
  tabbed_content_section: TabbedContentSection as unknown as React.ComponentType<Record<string, unknown>>,
  role_accordion_section: RoleAccordionSection as unknown as React.ComponentType<Record<string, unknown>>,
  review_logos_section: ReviewLogosSection as unknown as React.ComponentType<Record<string, unknown>>,
  simple_cta_section: SimpleCtaSection as unknown as React.ComponentType<Record<string, unknown>>,
  perfect_fit_framework_section: PerfectFitFrameworkSection as unknown as React.ComponentType<Record<string, unknown>>,
  rich_text_section: RichTextSection as unknown as React.ComponentType<Record<string, unknown>>,
  contact_banner_section: ContactBannerSection as unknown as React.ComponentType<Record<string, unknown>>,
  contact_form_section: ContactFormSection as unknown as React.ComponentType<Record<string, unknown>>,
  contact_with_form_section: ContactWithFormSection as unknown as React.ComponentType<Record<string, unknown>>,
  locations_section: LocationsSection as unknown as React.ComponentType<Record<string, unknown>>,
  client_logos_marquee_section: ClientLogosMarqueeSection as unknown as React.ComponentType<Record<string, unknown>>,
  newsletter_form_section: NewsletterFormSection as unknown as React.ComponentType<Record<string, unknown>>,
};
