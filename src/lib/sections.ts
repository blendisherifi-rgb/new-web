/**
 * ACF section → React component mapping registry.
 * Add new ACF group → component mappings here when new section types are added.
 */

import { EngineSection } from "@/components/sections/EngineSection";
import { OutcomesSection } from "@/components/sections/OutcomesSection";
import { EnterpriseStatsSection } from "@/components/sections/EnterpriseStatsSection";
import { OverlappingCardsSection } from "@/components/sections/OverlappingCardsSection";
import { AboutUsHeroSection } from "@/components/sections/AboutUsHeroSection";
import { OurStorySection } from "@/components/sections/OurStorySection";
import { MeetTheTeamSection } from "@/components/sections/MeetTheTeamSection";
import { PartnershipSection } from "@/components/sections/PartnershipSection";
import { FinanceHeroSection } from "@/components/sections/FinanceHeroSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { WhereWeExcelSection } from "@/components/sections/WhereWeExcelSection";
import { WhatMakesUsDifferentSection } from "@/components/sections/WhatMakesUsDifferentSection";
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
import { TestimonialSliderSection } from "@/components/sections/TestimonialSliderSection";
import { ESGSection } from "@/components/sections/ESGSection";
import { CultureSection } from "@/components/sections/CultureSection";
import { TeamArchiveSection } from "@/components/sections/TeamArchiveSection";
import { AutomationEngineSection } from "@/components/sections/AutomationEngineSection";
import { ApAutomationSection } from "@/components/sections/ApAutomationSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { AiEngineSection } from "@/components/sections/AiEngineSection";
import { ErpIntegrationSection } from "@/components/sections/ErpIntegrationSection";
import { AnalyticsDashboardsSection } from "@/components/sections/AnalyticsDashboardsSection";
import { SecurityComplianceSection } from "@/components/sections/SecurityComplianceSection";
import { PartnerEcosystemSection } from "@/components/sections/PartnerEcosystemSection";
import { EvidenceSection } from "@/components/sections/EvidenceSection";
import { StpComparisonSection } from "@/components/sections/StpComparisonSection";
import { InvoiceLifecycleSection } from "@/components/sections/InvoiceLifecycleSection";
import { ApAnalyticsSection } from "@/components/sections/ApAnalyticsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { EsgPoliciesSection } from "@/components/sections/EsgPoliciesSection";
import { EnvironmentalSection } from "@/components/sections/EnvironmentalSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { GovernanceSection } from "@/components/sections/GovernanceSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { CommunitySupportSection } from "@/components/sections/CommunitySupportSection";

export interface SectionData {
  id: string;
  acfGroupName: string;
  order: number;
  fields: Record<string, unknown>;
}

export const SECTION_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  engine_section: EngineSection as unknown as React.ComponentType<Record<string, unknown>>,
  outcomes_section: OutcomesSection as unknown as React.ComponentType<Record<string, unknown>>,
  enterprise_stats_section: EnterpriseStatsSection as unknown as React.ComponentType<Record<string, unknown>>,
  overlapping_cards_section: OverlappingCardsSection as unknown as React.ComponentType<Record<string, unknown>>,
  about_us_hero_section: AboutUsHeroSection as unknown as React.ComponentType<Record<string, unknown>>,
  our_story_section: OurStorySection as unknown as React.ComponentType<Record<string, unknown>>,
  meet_the_team_section: MeetTheTeamSection as unknown as React.ComponentType<Record<string, unknown>>,
  partnership_section: PartnershipSection as unknown as React.ComponentType<Record<string, unknown>>,
  finance_hero_section: FinanceHeroSection as unknown as React.ComponentType<Record<string, unknown>>,
  hero_section: HeroSection as unknown as React.ComponentType<Record<string, unknown>>,
  where_we_excel_section: WhereWeExcelSection as unknown as React.ComponentType<Record<string, unknown>>,
  what_makes_us_different_section: WhatMakesUsDifferentSection as unknown as React.ComponentType<Record<string, unknown>>,
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
  testimonial_slider_section: TestimonialSliderSection as unknown as React.ComponentType<Record<string, unknown>>,
  esg_section: ESGSection as unknown as React.ComponentType<Record<string, unknown>>,
  culture_section: CultureSection as unknown as React.ComponentType<Record<string, unknown>>,
  team_archive_section: TeamArchiveSection as unknown as React.ComponentType<Record<string, unknown>>,
  automation_engine_section: AutomationEngineSection as unknown as React.ComponentType<Record<string, unknown>>,
  ap_automation_section: ApAutomationSection as unknown as React.ComponentType<Record<string, unknown>>,
  architecture_section: ArchitectureSection as unknown as React.ComponentType<Record<string, unknown>>,
  ai_engine_section: AiEngineSection as unknown as React.ComponentType<Record<string, unknown>>,
  erp_integration_section: ErpIntegrationSection as unknown as React.ComponentType<Record<string, unknown>>,
  analytics_dashboards_section: AnalyticsDashboardsSection as unknown as React.ComponentType<Record<string, unknown>>,
  security_compliance_section: SecurityComplianceSection as unknown as React.ComponentType<Record<string, unknown>>,
  partner_ecosystem_section: PartnerEcosystemSection as unknown as React.ComponentType<Record<string, unknown>>,
  evidence_section: EvidenceSection as unknown as React.ComponentType<Record<string, unknown>>,
  stp_comparison_section: StpComparisonSection as unknown as React.ComponentType<Record<string, unknown>>,
  invoice_lifecycle_section: InvoiceLifecycleSection as unknown as React.ComponentType<Record<string, unknown>>,
  ap_analytics_section: ApAnalyticsSection as unknown as React.ComponentType<Record<string, unknown>>,
  faq_section: FaqSection as unknown as React.ComponentType<Record<string, unknown>>,
  esg_policies_section: EsgPoliciesSection as unknown as React.ComponentType<Record<string, unknown>>,
  environmental_section: EnvironmentalSection as unknown as React.ComponentType<Record<string, unknown>>,
  social_section: SocialSection as unknown as React.ComponentType<Record<string, unknown>>,
  governance_section: GovernanceSection as unknown as React.ComponentType<Record<string, unknown>>,
  trust_bar_section: TrustBarSection as unknown as React.ComponentType<Record<string, unknown>>,
  community_support_section: CommunitySupportSection as unknown as React.ComponentType<Record<string, unknown>>,
};
