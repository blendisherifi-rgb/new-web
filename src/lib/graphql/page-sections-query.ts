/**
 * GraphQL query for Page with ACF flexible content sections.
 * WPGraphQL for ACF uses union types — each layout has its own type.
 *
 * Configure via env:
 *   ACF_SECTIONS_PATH - "contentSections" (default) | "pageContentSections.contentSections"
 *   ACF_LAYOUT_TYPE_PREFIX - e.g. "Page_Contentsections_" or "PageContentSectionsContentSections_"
 *   ACF_LAYOUT_SUFFIX - e.g. "" or "Layout" (so HeroSection vs HeroSectionLayout)
 *
 * AP Automation background: default GraphQL field `bg` (matches ACF GraphQL Field Name). Override with
 * AP_AUTOMATION_BG_GRAPHQL_FIELD if you use a different name (e.g. `sectionbackground`).
 *
 * Analytics slides: query `slideheadingbefore` / `slideheadinghighlight` / `slidebody` (ACF) with aliases
 * so JSON keys match `slideHeadingBefore` / `slideHeadingHighlight` / `slideBody`.
 */

const SECTIONS_PATH =
  process.env.ACF_SECTIONS_PATH ?? "pageContentSections.sections";
const LAYOUT_PREFIX =
  process.env.ACF_LAYOUT_TYPE_PREFIX ?? "PageContentSectionsSections";
const LAYOUT_SUFFIX = process.env.ACF_LAYOUT_SUFFIX ?? "Layout";

/** Must match WPGraphQL “GraphQL Field Name” on the ACF field (often `bg`). */
const AP_AUTOMATION_BG_GRAPHQL_FIELD = (() => {
  const raw = process.env.AP_AUTOMATION_BG_GRAPHQL_FIELD ?? "bg";
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(raw) ? raw : "bg";
})();

const HeroLayout = `${LAYOUT_PREFIX}HeroSection${LAYOUT_SUFFIX}`;
const WhereWeExcelLayout = `${LAYOUT_PREFIX}WhereWeExcelSection${LAYOUT_SUFFIX}`;
const PlatformLayout = `${LAYOUT_PREFIX}PlatformSection${LAYOUT_SUFFIX}`;
const InnovationLayout = `${LAYOUT_PREFIX}InnovationSection${LAYOUT_SUFFIX}`;
const HorizontalScrollLayout = `${LAYOUT_PREFIX}HorizontalScrollSection${LAYOUT_SUFFIX}`;
const TabbedContentLayout = `${LAYOUT_PREFIX}TabbedContentSection${LAYOUT_SUFFIX}`;
const RoleAccordionLayout = `${LAYOUT_PREFIX}RoleAccordionSection${LAYOUT_SUFFIX}`;
const ReviewLogosLayout = `${LAYOUT_PREFIX}ReviewLogosSection${LAYOUT_SUFFIX}`;
const SimpleCtaLayout = `${LAYOUT_PREFIX}SimpleCtaSection${LAYOUT_SUFFIX}`;
const PerfectFitFrameworkLayout = `${LAYOUT_PREFIX}PerfectFitFrameworkSection${LAYOUT_SUFFIX}`;
const RichTextLayout = `${LAYOUT_PREFIX}RichTextSection${LAYOUT_SUFFIX}`;
const ContactBannerLayout = `${LAYOUT_PREFIX}ContactBannerSection${LAYOUT_SUFFIX}`;
const ContactWithFormLayout = `${LAYOUT_PREFIX}ContactWithFormSection${LAYOUT_SUFFIX}`;
const LocationsLayout = `${LAYOUT_PREFIX}LocationsSection${LAYOUT_SUFFIX}`;
const ClientLogosMarqueeLayout = `${LAYOUT_PREFIX}ClientLogosMarqueeSection${LAYOUT_SUFFIX}`;
const NewsletterFormLayout = `${LAYOUT_PREFIX}NewsletterFormSection${LAYOUT_SUFFIX}`;
const TrustBarLayout = `${LAYOUT_PREFIX}TrustBarSection${LAYOUT_SUFFIX}`;
// About-page sections
const AiEngineLayout = `${LAYOUT_PREFIX}AiEngineSection${LAYOUT_SUFFIX}`;
const FinanceHeroLayout = `${LAYOUT_PREFIX}FinanceHeroSection${LAYOUT_SUFFIX}`;
const EngineLayout = `${LAYOUT_PREFIX}EngineSection${LAYOUT_SUFFIX}`;
const OutcomesLayout = `${LAYOUT_PREFIX}OutcomesSection${LAYOUT_SUFFIX}`;
const PartnershipLayout = `${LAYOUT_PREFIX}PartnershipSection${LAYOUT_SUFFIX}`;
const OverlappingCardsLayout = `${LAYOUT_PREFIX}OverlappingCardsSection${LAYOUT_SUFFIX}`;
const AboutUsHeroLayout = `${LAYOUT_PREFIX}AboutUsHeroSection${LAYOUT_SUFFIX}`;
const WhatMakesUsDifferentLayout = `${LAYOUT_PREFIX}WhatMakesUsDifferentSection${LAYOUT_SUFFIX}`;
const EnterpriseStatsLayout = `${LAYOUT_PREFIX}EnterpriseStatsSection${LAYOUT_SUFFIX}`;
const OurStoryLayout = `${LAYOUT_PREFIX}OurStorySection${LAYOUT_SUFFIX}`;
const MeetTheTeamLayout = `${LAYOUT_PREFIX}MeetTheTeamSection${LAYOUT_SUFFIX}`;
const EsgLayout = `${LAYOUT_PREFIX}EsgSection${LAYOUT_SUFFIX}`;
const CultureLayout = `${LAYOUT_PREFIX}CultureSection${LAYOUT_SUFFIX}`;
const TestimonialSliderLayout = `${LAYOUT_PREFIX}TestimonialSliderSection${LAYOUT_SUFFIX}`;
const TeamArchiveLayout = `${LAYOUT_PREFIX}TeamArchiveSection${LAYOUT_SUFFIX}`;
const AutomationEngineLayout = `${LAYOUT_PREFIX}AutomationEngineSection${LAYOUT_SUFFIX}`;
const ChallengeLayout = `${LAYOUT_PREFIX}ChallengeSection${LAYOUT_SUFFIX}`;
const StrategicPrioritiesLayout = `${LAYOUT_PREFIX}StrategicPrioritiesSection${LAYOUT_SUFFIX}`;
const SmartMatchingChallengeLayout = `${LAYOUT_PREFIX}SmartMatchingChallengeSection${LAYOUT_SUFFIX}`;
const SmartMatchingChallengeBannerLayout = `${LAYOUT_PREFIX}SmartMatchingChallengeBannerSection${LAYOUT_SUFFIX}`;
const StartChallengeFormLayout = `${LAYOUT_PREFIX}StartChallengeFormSection${LAYOUT_SUFFIX}`;
const PartnerProgrammeHeroLayout = `${LAYOUT_PREFIX}PartnerProgrammeHeroSection${LAYOUT_SUFFIX}`;
const PartnerBenefitsLayout = `${LAYOUT_PREFIX}PartnerBenefitsSection${LAYOUT_SUFFIX}`;
const MatchingChallengeFormLayout = `${LAYOUT_PREFIX}MatchingChallengeFormSection${LAYOUT_SUFFIX}`;
const HowItWorksLayout = `${LAYOUT_PREFIX}HowItWorksSection${LAYOUT_SUFFIX}`;
const CfoSeriesLayout = `${LAYOUT_PREFIX}CfoSeriesSection${LAYOUT_SUFFIX}`;
const WhyAttendLayout = `${LAYOUT_PREFIX}WhyAttendSection${LAYOUT_SUFFIX}`;
const MeetSpeakersLayout = `${LAYOUT_PREFIX}MeetSpeakersSection${LAYOUT_SUFFIX}`;
const EventRegisterLayout = `${LAYOUT_PREFIX}EventRegisterSection${LAYOUT_SUFFIX}`;
const BookADemoLayout = `${LAYOUT_PREFIX}BookADemoSection${LAYOUT_SUFFIX}`;
const LifeAtSoftCoLayout = `${LAYOUT_PREFIX}LifeAtSoftcoSection${LAYOUT_SUFFIX}`;
const PeopleFirstProofLayout = `${LAYOUT_PREFIX}PeopleFirstProofSection${LAYOUT_SUFFIX}`;
const OpenRolesLayout = `${LAYOUT_PREFIX}OpenRolesSection${LAYOUT_SUFFIX}`;
const FeatureModalLayout = `${LAYOUT_PREFIX}FeatureModalSection${LAYOUT_SUFFIX}`;
const ApAutomationLayout = `${LAYOUT_PREFIX}ApAutomationSection${LAYOUT_SUFFIX}`;
/** ACF layout `ap_automation_for_cfo_section` — WPGraphQL type `…ApAutomationForCfoSectionLayout` (not …FinancialControllers…). */
const ApAutomationForCfoLayout = `${LAYOUT_PREFIX}ApAutomationForCfoSection${LAYOUT_SUFFIX}`;
const ArchitectureLayout = `${LAYOUT_PREFIX}ArchitectureSection${LAYOUT_SUFFIX}`;
const ErpIntegrationLayout = `${LAYOUT_PREFIX}ErpIntegrationSection${LAYOUT_SUFFIX}`;
const AnalyticsDashboardsLayout = `${LAYOUT_PREFIX}AnalyticsDashboardsSection${LAYOUT_SUFFIX}`;
const SecurityComplianceLayout = `${LAYOUT_PREFIX}SecurityComplianceSection${LAYOUT_SUFFIX}`;
const PartnerEcosystemLayout = `${LAYOUT_PREFIX}PartnerEcosystemSection${LAYOUT_SUFFIX}`;
const EvidenceLayout = `${LAYOUT_PREFIX}EvidenceSection${LAYOUT_SUFFIX}`;
const StpComparisonLayout = `${LAYOUT_PREFIX}StpComparisonSection${LAYOUT_SUFFIX}`;
const InvoiceLifecycleLayout = `${LAYOUT_PREFIX}InvoiceLifecycleSection${LAYOUT_SUFFIX}`;
const ApAnalyticsLayout = `${LAYOUT_PREFIX}ApAnalyticsSection${LAYOUT_SUFFIX}`;
const FaqLayout = `${LAYOUT_PREFIX}FaqSection${LAYOUT_SUFFIX}`;
const EsgPoliciesLayout = `${LAYOUT_PREFIX}EsgPoliciesSection${LAYOUT_SUFFIX}`;
const EnvironmentalLayout = `${LAYOUT_PREFIX}EnvironmentalSection${LAYOUT_SUFFIX}`;
const SocialLayout = `${LAYOUT_PREFIX}SocialSection${LAYOUT_SUFFIX}`;
const GovernanceLayout = `${LAYOUT_PREFIX}GovernanceSection${LAYOUT_SUFFIX}`;
const CommunitySupportLayout = `${LAYOUT_PREFIX}CommunitySupportSection${LAYOUT_SUFFIX}`;
const ContactFormLayout = `${LAYOUT_PREFIX}ContactFormSection${LAYOUT_SUFFIX}`;
/** Client success story (case study) page sections — must match WPGraphQL ACF layout types */
const ClientSuccessStoryHeroLayout = `${LAYOUT_PREFIX}ClientSuccessStoryHeroSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryProjectAtAGlanceLayout = `${LAYOUT_PREFIX}ClientSuccessStoryProjectAtAGlanceSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryVideoLayout = `${LAYOUT_PREFIX}ClientSuccessStoryVideoSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryChallengeLayout = `${LAYOUT_PREFIX}ClientSuccessStoryChallengeSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryPerfectFitAutomationLayout = `${LAYOUT_PREFIX}ClientSuccessStoryPerfectFitAutomationSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryResultsLayout = `${LAYOUT_PREFIX}ClientSuccessStoryResultsSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryTestimonialCardLayout = `${LAYOUT_PREFIX}ClientSuccessStoryTestimonialCardSection${LAYOUT_SUFFIX}`;
const ClientSuccessStoryRelatedStoriesLayout = `${LAYOUT_PREFIX}ClientSuccessStoryRelatedStoriesSection${LAYOUT_SUFFIX}`;

function buildFragment(): string {
  const sectionsSelection = `
    __typename
    ... on ${HeroLayout} {
      title
      ctaLabel
      ctaHref
      lottieUrl
      image {
        node {
          sourceUrl
          altText
        }
      }
      logos {
        logo {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    ... on ${WhereWeExcelLayout} {
      tag
      headingBefore
      headingHighlight
      body
      ctaLabel
      ctaHref
      excelItems {
        category
        description
      }
    }
    ... on ${PlatformLayout} {
      tag
      headline
      intro
      rows {
        title
        subtitle
        description
        ctaLabel
        ctaHref
      }
      image1 {
        node {
          sourceUrl
          altText
        }
      }
      image2 {
        node {
          sourceUrl
          altText
        }
      }
    }
    ... on ${InnovationLayout} {
      headingBefore
      headingHighlight
      headingAfter
      subheading
      ctaLabel
      ctaHref
      values {
        icon {
          node {
            sourceUrl
          }
        }
        title
        description
      }
    }
    ... on ${HorizontalScrollLayout} {
      tag
      headline
      scrollCards {
        id
        title
        description
        image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    ... on ${TabbedContentLayout} {
      overline
      mainTitle
      headingBefore
      headingHighlight
      headingAfter
      tabs {
        tabType
        logo {
          node {
            sourceUrl
            altText
          }
        }
        review
        reviewAuthor
        reviewAuthorPosition
        ctaButtonText
        ctaButtonLink
        metrics {
          value
          label
        }
        ctaText
        ctaLink
      }
    }
    ... on ${RoleAccordionLayout} {
      tag
      headingBefore
      headingHighlight
      headingAfter
      accordionItems {
        tabTitle
        title
        content
        ctaLabel
        ctaHref
        image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    ... on ${ReviewLogosLayout} {
      heading
      reviewLogosCards {
        logo {
          node {
            sourceUrl
            altText
          }
        }
        logoAlt
        logoLabel
        featured
      }
    }
    ... on ${SimpleCtaLayout} {
      overline
      title
      headingBefore
      headingHighlight
      headingAfter
      description
    }
    ... on ${PerfectFitFrameworkLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      description
      emphasis
      perfectFitCards {
        step
        title
        description
        image {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    ... on ${RichTextLayout} {
      content
    }
    ... on ${ContactBannerLayout} {
      overline
      title
      contactBannerSocialLinks {
        platform
        url
        label
      }
    }
    ... on ${ContactWithFormLayout} {
      overline
      title
      contactWithFormSocialLinks {
        platform
        url
        label
      }
    }
    ... on ${LocationsLayout} {
      headingBefore
      headingHighlight
      headingAfter
      locationsItems {
        tabTitle
        title
        image {
          node {
            sourceUrl
            altText
          }
        }
        address
        phone
        email
        mapUrl
        mapLabel
      }
    }
    ... on ${ClientLogosMarqueeLayout} {
      heading
      clientLogosMarqueeLogos {
        logo {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    ... on ${NewsletterFormLayout} {
      heading
      ctaLabel
    }
    ... on ${TrustBarLayout} {
      heading
      trustBarLogos {
        image { node { sourceUrl altText } }
        imageAlt
      }
    }
    ... on ${AiEngineLayout} {
      overline
      headingLine1
      headingLine2
      introBody
      ctaLabel
      ctaHref
      aiEngineTabs {
        label
        title
        body
        image { node { sourceUrl altText } }
      }
    }
    ... on ${FinanceHeroLayout} {
      headlineLine1
      headlineLine2
      body
      financeHeroCards {
        number
        title
      }
    }
    ... on ${EngineLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      engineCards {
        title
        description
      }
      ctaLabel
      ctaHref
    }
    ... on ${OutcomesLayout} {
      overline
      title
      body
      ctaLabel
      ctaHref
      outcomesStats {
        value
        label
      }
    }
    ... on ${PartnershipLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      ctaLabel
      ctaHref
      testimonialImage { node { sourceUrl altText } }
      testimonialQuote
      testimonialAuthorName
      testimonialAuthorTitle
      testimonialLogo { node { sourceUrl altText } }
    }
    ... on ${OverlappingCardsLayout} {
      overline
      title
      description
      overlappingCards {
        step
        title
        description
        image { node { sourceUrl altText } }
        detailsLabel
        detailsHref
      }
    }
    ... on ${AboutUsHeroLayout} {
      overline
      title
      galleryImages {
        image { node { sourceUrl altText } }
      }
      body
      ceoQuoteImage { node { sourceUrl altText } }
      ceoQuoteText
      ceoAuthorName
      ceoAuthorTitle
    }
    ... on ${WhatMakesUsDifferentLayout} {
      tag
      headingBefore
      headingHighlight
      body
      ctaLabel
      ctaHref
      whatMakesItems {
        step
        title
        description
      }
    }
    ... on ${EnterpriseStatsLayout} {
      title
      enterpriseStatsItems {
        image { node { sourceUrl altText } }
        title
      }
    }
    ... on ${OurStoryLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      backgroundImage { node { sourceUrl altText } }
      events {
        year
        title
        description
      }
    }
    ... on ${MeetTheTeamLayout} {
      overline
      title
      members {
        nodes {
          id
          ... on NodeWithTitle { title }
          ... on NodeWithContentEditor { content }
          ... on NodeWithFeaturedImage { featuredImage { node { sourceUrl altText } } }
        }
      }
      ctaLabel
      ctaHref
    }
    ... on ${EsgLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      image { node { sourceUrl altText } }
      body
      ctaLabel
      ctaHref
    }
    ... on ${CultureLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      ctaLabel
      ctaHref
      cultureItems {
        image { node { sourceUrl altText } }
        stat
        label
        description
      }
    }
    ... on ${TestimonialSliderLayout} {
      testimonials {
        image { node { sourceUrl altText } }
        quote
        authorName
        authorTitle
      }
    }
    ... on ${TeamArchiveLayout} {
      overline
      title
      body
      departments {
        name
        members {
          name
          title
          bio
          image { node { sourceUrl altText } }
        }
      }
    }
    ... on ${AutomationEngineLayout} {
      overline
      heading
      image { node { sourceUrl altText } }
      body
      ctaLabel
      ctaHref
      metrics { value label }
      logos { logo { node { sourceUrl altText } } }
    }
    ... on ${ChallengeLayout} {
      overline
      headingHighlight
      headingAfter
      intro
      challengeColumns {
        icon
        titleLineBlue
        titleLineDark
        body
        showCta
        ctaLabel
        ctaHref
      }
    }
    ... on ${StrategicPrioritiesLayout} {
      overline
      intro
      headingBefore
      headingHighlight
      headingAfter
      subheading
      leftColumnLabel
      rightColumnLabel
      priorityRows { priority deliverable }
    }
    ... on ${SmartMatchingChallengeLayout} {
      overline
      headingLine1
      headingLine2
      image { node { sourceUrl altText } }
      body
      ctaLabel
      ctaHref
    }
    ... on ${SmartMatchingChallengeBannerLayout} {
      overline
      headingLine1
      headingLine2
      body
      ctaLabel
      ctaHref
    }
    ... on ${StartChallengeFormLayout} {
      overline
      headingLine1
      headingHighlight
      formPlaceholderImage { node { sourceUrl altText } }
    }
    ... on ${PartnerProgrammeHeroLayout} {
      overline
      headingLine1
      headingLine2
      body
      ctaLabel
      ctaHref
      navCards { number label }
    }
    ... on ${PartnerBenefitsLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      subheading
      ctaLabel
      ctaHref
      steps {
        stepNumberImage { node { sourceUrl altText } }
        line1Before
        line1Highlight
        line1After
        line2Before
        line2Highlight
        line2After
        description
      }
    }
    ... on ${MatchingChallengeFormLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      formPlaceholderImage { node { sourceUrl altText } }
    }
    ... on ${HowItWorksLayout} {
      overline
      heading
      intro
      howItWorksSteps {
        stepNumberImage { node { sourceUrl altText } }
        titleHighlight
        titleRest
        description
      }
    }
    ... on ${CfoSeriesLayout} {
      overline
      headingLine1
      headingLine2
      image { node { sourceUrl altText } }
      eventDetails
      body
      ctaLabel
      ctaHref
    }
    ... on ${WhyAttendLayout} {
      overline
      headingLine1
      headingLine2
      intro
      attendColumns {
        iconImage { node { sourceUrl altText } }
        titleBefore
        titleHighlight
        titleAfter
        description
      }
    }
    ... on ${MeetSpeakersLayout} {
      overline
      headingBefore
      headingHighlight
      intro
      speakers {
        image { node { sourceUrl altText } }
        name
        jobTitle
        company
      }
    }
    ... on ${EventRegisterLayout} {
      overline
      headingLine1
      headingLine2Before
      headingLine2Highlight
      formPlaceholderImage { node { sourceUrl altText } }
    }
    ... on ${BookADemoLayout} {
      overline
      headingLine1
      headingLine2
      intro
      formPlaceholderImage { node { sourceUrl altText } }
      marqueeHeading
      bookADemoLogos { logo { node { sourceUrl altText } } }
    }
    ... on ${LifeAtSoftCoLayout} {
      title
      youtubeVideoId
      videoPoster { node { sourceUrl altText } }
      videoTitle
      stats { value label }
      lifeAtSoftCoTestimonials {
        image { node { sourceUrl altText } }
        quote
        authorName
        authorTitle
      }
    }
    ... on ${PeopleFirstProofLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      benefits { label }
    }
    ... on ${OpenRolesLayout} {
      overline
      headingLine1
      headingLine2
      locationFilterLabel
      departmentFilterLabel
      hireHiveLive
      viewAllHref
      viewAllLabel
      openRolesJobs {
        title
        location
        department
        excerpt
        readMoreHref
      }
    }
    ... on ${FeatureModalLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      ctaLabel
      ctaHref
      featureModalItems {
        title
        description
        modalLabel
        modalTitle
        modalDescription
        image { node { sourceUrl altText } }
      }
    }
    ... on ${ApAutomationLayout} {
      overline
      ${AP_AUTOMATION_BG_GRAPHQL_FIELD}
      headingLine1
      headingLine2
      image { node { sourceUrl altText } }
      softcoApImage { node { sourceUrl altText } }
      body
      ctaLabel
      ctaHref
      gartnerLogo { node { sourceUrl altText } }
      endorsementText
      metrics { value label }
    }
    ... on ${ApAutomationForCfoLayout} {
      overline
      headingHighlight
      headingLine1After
      headingLine2
      headingLine3
      body
      image { node { sourceUrl altText } }
    }
    ... on ${ArchitectureLayout} {
      overline
      headingLine1
      headingLine2
      body
      image { node { sourceUrl altText } }
      p2pImage { node { sourceUrl altText } }
      apImage { node { sourceUrl altText } }
    }
    ... on ${ErpIntegrationLayout} {
      overline
      headingLine1
      headingLine2
      body
      ctaLabel
      ctaHref
      moreCountHighlight
      moreCountRest
      erpLogos {
        logoImg { node { sourceUrl altText } }
        logoAlt
        href
      }
    }
    ... on ${AnalyticsDashboardsLayout} {
      overline
      mainTitle
      introBody
      ctaLabel
      ctaHref
      headingBefore
      headingHighlight
      body
      slides {
        image { node { sourceUrl altText } }
        slideHeadingBefore: slideheadingbefore
        slideHeadingHighlight: slideheadinghighlight
        slideBody: slidebody
      }
    }
    ... on ${SecurityComplianceLayout} {
      overline
      headingLine1
      headingLine2
      body
      certifications { image { node { sourceUrl altText } } }
    }
    ... on ${PartnerEcosystemLayout} {
      overline
      headingBlue1
      headingDark
      headingBlue2
      body
      partnerLogos {
        image { node { sourceUrl altText } }
        imageAlt
      }
    }
    ... on ${EvidenceLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      evidenceMetrics {
        image { node { sourceUrl altText } }
        label
      }
    }
    ... on ${StpComparisonLayout} {
      headingBefore
      headingHighlight
      headingLine2
      image { node { sourceUrl altText } }
      body
    }
    ... on ${InvoiceLifecycleLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      imageWithSoftCo { node { sourceUrl altText } }
      imageWithoutSoftCo { node { sourceUrl altText } }
    }
    ... on ${ApAnalyticsLayout} {
      overline
      headingLine1
      headingLine2
      introBody
      ctaLabel
      ctaHref
      analyticsCards {
        icon { node { sourceUrl altText } }
        titleLine1
        titleLine2
      }
    }
    ... on ${FaqLayout} {
      overline
      headingLine1
      headingLine2
      items { question answer }
    }
    ... on ${EsgPoliciesLayout} {
      overline
      headingBefore
      headingHighlight1
      headingHighlight2
      headingAfter
      body
      slides { image { node { sourceUrl altText } } }
      esgPolicyCards { number label }
    }
    ... on ${EnvironmentalLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      ctaLabel
      ctaHref
      body
      statNumber
      statLabel
      envInitiatives { bold text }
    }
    ... on ${SocialLayout} {
      overline
      headingHighlight
      headingAfter
      body
      ctaLabel
      ctaHref
      image { node { sourceUrl altText } }
      statNumber
      statLabel
      socialInitiatives { initiative }
    }
    ... on ${GovernanceLayout} {
      overline
      heading
      ctaLabel
      ctaHref
      body
      statNumber
      statLabel
      govInitiatives { initiative }
    }
    ... on ${CommunitySupportLayout} {
      overline
      headingBefore
      headingHighlight
      bodyTop
      bodyBottom
      ctaLabel
      ctaHref
      slides { image { node { sourceUrl altText } } }
    }
    ... on ${ClientSuccessStoryHeroLayout} {
      clientSuccessStoryLabel
      clientLogo { node { sourceUrl altText } }
      updatedText
      titleBefore
      titleHighlight
      titleAfter
      tags { label }
      image { node { sourceUrl altText } }
      shareUrl
      shareTitle
      sharePlatforms { platform label }
    }
    ... on ${ClientSuccessStoryProjectAtAGlanceLayout} {
      title
      downloadLabel
      downloadHref
      challengeLabel
      challengeText
      resultsLabel
      results { label text }
      detailsLabel
      detailsRows {
        label
        valueText
        valueLogo { node { sourceUrl altText } }
      }
    }
    ... on ${ClientSuccessStoryVideoLayout} {
      youtubeVideoId
      videoPoster { node { sourceUrl altText } }
      videoTitle
    }
    ... on ${ClientSuccessStoryChallengeLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      bullets { label text }
    }
    ... on ${ClientSuccessStoryPerfectFitAutomationLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      bodyTop
      quote
      attributionName
      attributionRole
      bodyBottom
    }
    ... on ${ClientSuccessStoryResultsLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      body
      results { label text }
    }
    ... on ${ClientSuccessStoryTestimonialCardLayout} {
      portrait { node { sourceUrl altText } }
      quote
      authorName
      authorTitle
      clientLogo { node { sourceUrl altText } }
    }
    ... on ${ClientSuccessStoryRelatedStoriesLayout} {
      titleLine1
      titleLine2
      stories {
        image { node { sourceUrl altText } }
        tags { label }
        cardTitle
        ctaHref
      }
    }
    ... on ${ContactFormLayout} {
      __typename
    }
  `;

  if (SECTIONS_PATH === "pageContentSections.contentSections") {
    return `
  fragment PageSections on Page {
    pageContentSections {
      contentSections {
        ${sectionsSelection}
      }
    }
  }
`;
  }

  if (SECTIONS_PATH === "pageContentSections.sections") {
    return `
  fragment PageSections on Page {
    pageContentSections {
      sections {
        ${sectionsSelection}
      }
    }
  }
`;
  }

  if (SECTIONS_PATH === "pageContentSections.sectionGroups") {
    return `
  fragment PageSections on Page {
    pageContentSections {
      sectionGroups {
        groupName
        sections {
          ${sectionsSelection}
        }
      }
    }
  }
`;
  }

  return `
  fragment PageSections on Page {
    contentSections {
      ${sectionsSelection}
    }
  }
`;
}

export const PAGE_SECTIONS_FRAGMENT = buildFragment();

/** True resilient fragment: avoid inline union fragments so unknown WP ACF types never break query parsing. */
function buildFragmentResilient(): string {
  const sectionsSelection = `
    __typename
    ... on ${HeroLayout} {
      title
      ctaLabel
      ctaHref
      lottieUrl
      image { node { sourceUrl altText } }
      logos { logo { node { sourceUrl altText } } }
    }
    ... on ${WhereWeExcelLayout} {
      tag
      headingBefore
      headingHighlight
      body
      ctaLabel
      ctaHref
      excelItems { category description }
    }
    ... on ${PlatformLayout} {
      tag
      headline
      intro
      rows { title subtitle description ctaLabel ctaHref }
      image1 { node { sourceUrl altText } }
      image2 { node { sourceUrl altText } }
    }
    ... on ${InnovationLayout} {
      headingBefore
      headingHighlight
      headingAfter
      subheading
      ctaLabel
      ctaHref
      values { icon { node { sourceUrl } } title description }
    }
    ... on ${HorizontalScrollLayout} {
      tag
      headline
      scrollCards { id title description image { node { sourceUrl altText } } }
    }
    ... on ${TabbedContentLayout} {
      overline
      mainTitle
      headingBefore
      headingHighlight
      headingAfter
      tabs { tabType logo { node { sourceUrl altText } } review reviewAuthor reviewAuthorPosition ctaButtonText ctaButtonLink metrics { value label } ctaText ctaLink }
    }
    ... on ${RoleAccordionLayout} {
      tag
      headingBefore
      headingHighlight
      headingAfter
      accordionItems { tabTitle title content ctaLabel ctaHref image { node { sourceUrl altText } } }
    }
    ... on ${ReviewLogosLayout} {
      heading
      reviewLogosCards { logo { node { sourceUrl altText } } logoAlt logoLabel featured }
    }
    ... on ${SimpleCtaLayout} {
      overline
      title
      headingBefore
      headingHighlight
      headingAfter
      description
    }
    ... on ${PerfectFitFrameworkLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      description
      emphasis
      perfectFitCards { step title description image { node { sourceUrl altText } } }
    }
    ... on ${RichTextLayout} {
      content
    }
    ... on ${TrustBarLayout} { heading trustBarLogos { image { node { sourceUrl altText } } imageAlt } }
    ... on ${AiEngineLayout} { overline headingLine1 headingLine2 introBody ctaLabel ctaHref aiEngineTabs { label title body image { node { sourceUrl altText } } } }
    ... on ${FinanceHeroLayout} { headlineLine1 headlineLine2 body financeHeroCards { number title } }
    ... on ${EngineLayout} { overline headingBefore headingHighlight headingAfter body engineCards { title description } ctaLabel ctaHref }
    ... on ${OutcomesLayout} { overline title body ctaLabel ctaHref outcomesStats { value label } }
    ... on ${PartnershipLayout} { overline headingBefore headingHighlight headingAfter body ctaLabel ctaHref testimonialImage { node { sourceUrl altText } } testimonialQuote testimonialAuthorName testimonialAuthorTitle testimonialLogo { node { sourceUrl altText } } }
    ... on ${OverlappingCardsLayout} { overline title description overlappingCards { step title description image { node { sourceUrl altText } } detailsLabel detailsHref } }
    ... on ${AboutUsHeroLayout} { overline title galleryImages { image { node { sourceUrl altText } } } body ceoQuoteImage { node { sourceUrl altText } } ceoQuoteText ceoAuthorName ceoAuthorTitle }
    ... on ${WhatMakesUsDifferentLayout} { tag headingBefore headingHighlight body ctaLabel ctaHref whatMakesItems { step title description } }
    ... on ${EnterpriseStatsLayout} { title enterpriseStatsItems { image { node { sourceUrl altText } } title } }
    ... on ${OurStoryLayout} { overline headingBefore headingHighlight headingAfter body backgroundImage { node { sourceUrl altText } } events { year title description } }
    ... on ${MeetTheTeamLayout} { overline title members { nodes { id ... on NodeWithTitle { title } ... on NodeWithContentEditor { content } ... on NodeWithFeaturedImage { featuredImage { node { sourceUrl altText } } } } } ctaLabel ctaHref }
    ... on ${EsgLayout} { overline headingBefore headingHighlight headingAfter image { node { sourceUrl altText } } body ctaLabel ctaHref }
    ... on ${CultureLayout} { overline headingBefore headingHighlight headingAfter body ctaLabel ctaHref cultureItems { image { node { sourceUrl altText } } stat label description } }
    ... on ${TestimonialSliderLayout} { testimonials { image { node { sourceUrl altText } } quote authorName authorTitle } }
    ... on ${TeamArchiveLayout} { overline title body departments { name members { name title bio image { node { sourceUrl altText } } } } }
    ... on ${AutomationEngineLayout} { overline heading image { node { sourceUrl altText } } body ctaLabel ctaHref metrics { value label } logos { logo { node { sourceUrl altText } } } }
    ... on ${ChallengeLayout} { overline headingHighlight headingAfter intro challengeColumns { icon titleLineBlue titleLineDark body showCta ctaLabel ctaHref } }
    ... on ${StrategicPrioritiesLayout} { overline intro headingBefore headingHighlight headingAfter subheading leftColumnLabel rightColumnLabel priorityRows { priority deliverable } }
    ... on ${SmartMatchingChallengeLayout} { overline headingLine1 headingLine2 image { node { sourceUrl altText } } body ctaLabel ctaHref }
    ... on ${SmartMatchingChallengeBannerLayout} { overline headingLine1 headingLine2 body ctaLabel ctaHref }
    ... on ${StartChallengeFormLayout} { overline headingLine1 headingHighlight formPlaceholderImage { node { sourceUrl altText } } }
    ... on ${PartnerProgrammeHeroLayout} { overline headingLine1 headingLine2 body ctaLabel ctaHref navCards { number label } }
    ... on ${PartnerBenefitsLayout} { overline headingBefore headingHighlight headingAfter subheading ctaLabel ctaHref steps { stepNumberImage { node { sourceUrl altText } } line1Before line1Highlight line1After line2Before line2Highlight line2After description } }
    ... on ${MatchingChallengeFormLayout} { overline headingBefore headingHighlight headingAfter formPlaceholderImage { node { sourceUrl altText } } }
    ... on ${HowItWorksLayout} { overline heading intro howItWorksSteps { stepNumberImage { node { sourceUrl altText } } titleHighlight titleRest description } }
    ... on ${CfoSeriesLayout} { overline headingLine1 headingLine2 image { node { sourceUrl altText } } eventDetails body ctaLabel ctaHref }
    ... on ${WhyAttendLayout} { overline headingLine1 headingLine2 intro attendColumns { iconImage { node { sourceUrl altText } } titleBefore titleHighlight titleAfter description } }
    ... on ${MeetSpeakersLayout} { overline headingBefore headingHighlight intro speakers { image { node { sourceUrl altText } } name jobTitle company } }
    ... on ${EventRegisterLayout} { overline headingLine1 headingLine2Before headingLine2Highlight formPlaceholderImage { node { sourceUrl altText } } }
    ... on ${BookADemoLayout} { overline headingLine1 headingLine2 intro formPlaceholderImage { node { sourceUrl altText } } marqueeHeading bookADemoLogos { logo { node { sourceUrl altText } } } }
    ... on ${LifeAtSoftCoLayout} { title youtubeVideoId videoPoster { node { sourceUrl altText } } videoTitle stats { value label } lifeAtSoftCoTestimonials { image { node { sourceUrl altText } } quote authorName authorTitle } }
    ... on ${PeopleFirstProofLayout} { overline headingBefore headingHighlight headingAfter body benefits { label } }
    ... on ${OpenRolesLayout} { overline headingLine1 headingLine2 locationFilterLabel departmentFilterLabel hireHiveLive viewAllHref viewAllLabel openRolesJobs { title location department excerpt readMoreHref } }
    ... on ${FeatureModalLayout} { overline headingBefore headingHighlight headingAfter body ctaLabel ctaHref featureModalItems { title description modalLabel modalTitle modalDescription image { node { sourceUrl altText } } } }
    ... on ${ApAutomationLayout} { overline ${AP_AUTOMATION_BG_GRAPHQL_FIELD} headingLine1 headingLine2 image { node { sourceUrl altText } } softcoApImage { node { sourceUrl altText } } body ctaLabel ctaHref gartnerLogo { node { sourceUrl altText } } endorsementText metrics { value label } }
    ... on ${ApAutomationForCfoLayout} { overline headingHighlight headingLine1After headingLine2 headingLine3 body image { node { sourceUrl altText } } }
    ... on ${ArchitectureLayout} { overline headingLine1 headingLine2 body image { node { sourceUrl altText } } p2pImage { node { sourceUrl altText } } apImage { node { sourceUrl altText } } }
    ... on ${ErpIntegrationLayout} { overline headingLine1 headingLine2 body ctaLabel ctaHref moreCountHighlight moreCountRest erpLogos { logoImg { node { sourceUrl altText } } logoAlt href } }
    ... on ${AnalyticsDashboardsLayout} { overline mainTitle introBody ctaLabel ctaHref headingBefore headingHighlight body slides { image { node { sourceUrl altText } } slideHeadingBefore: slideheadingbefore slideHeadingHighlight: slideheadinghighlight slideBody: slidebody } }
    ... on ${SecurityComplianceLayout} { overline headingLine1 headingLine2 body certifications { image { node { sourceUrl altText } } } }
    ... on ${PartnerEcosystemLayout} { overline headingBlue1 headingDark headingBlue2 body partnerLogos { image { node { sourceUrl altText } } imageAlt } }
    ... on ${EvidenceLayout} { overline headingBefore headingHighlight headingAfter body evidenceMetrics { image { node { sourceUrl altText } } label } }
    ... on ${StpComparisonLayout} { headingBefore headingHighlight headingLine2 image { node { sourceUrl altText } } body }
    ... on ${InvoiceLifecycleLayout} { overline headingBefore headingHighlight headingAfter imageWithSoftCo { node { sourceUrl altText } } imageWithoutSoftCo { node { sourceUrl altText } } }
    ... on ${ApAnalyticsLayout} { overline headingLine1 headingLine2 introBody ctaLabel ctaHref analyticsCards { icon { node { sourceUrl altText } } titleLine1 titleLine2 } }
    ... on ${FaqLayout} { overline headingLine1 headingLine2 items { question answer } }
    ... on ${EsgPoliciesLayout} { overline headingBefore headingHighlight1 headingHighlight2 headingAfter body slides { image { node { sourceUrl altText } } } esgPolicyCards { number label } }
    ... on ${EnvironmentalLayout} { overline headingBefore headingHighlight headingAfter ctaLabel ctaHref body statNumber statLabel envInitiatives { bold text } }
    ... on ${SocialLayout} { overline headingHighlight headingAfter body ctaLabel ctaHref image { node { sourceUrl altText } } statNumber statLabel socialInitiatives { initiative } }
    ... on ${GovernanceLayout} { overline heading ctaLabel ctaHref body statNumber statLabel govInitiatives { initiative } }
    ... on ${CommunitySupportLayout} { overline headingBefore headingHighlight bodyTop bodyBottom ctaLabel ctaHref slides { image { node { sourceUrl altText } } } }
    ... on ${ClientSuccessStoryHeroLayout} { clientSuccessStoryLabel clientLogo { node { sourceUrl altText } } updatedText titleBefore titleHighlight titleAfter tags { label } image { node { sourceUrl altText } } shareUrl shareTitle sharePlatforms { platform label } }
    ... on ${ClientSuccessStoryProjectAtAGlanceLayout} { title downloadLabel downloadHref challengeLabel challengeText resultsLabel results { label text } detailsLabel detailsRows { label valueText valueLogo { node { sourceUrl altText } } } }
    ... on ${ClientSuccessStoryVideoLayout} { youtubeVideoId videoPoster { node { sourceUrl altText } } videoTitle }
    ... on ${ClientSuccessStoryChallengeLayout} { overline headingBefore headingHighlight headingAfter body bullets { label text } }
    ... on ${ClientSuccessStoryPerfectFitAutomationLayout} { overline headingBefore headingHighlight headingAfter bodyTop quote attributionName attributionRole bodyBottom }
    ... on ${ClientSuccessStoryResultsLayout} { overline headingBefore headingHighlight headingAfter body results { label text } }
    ... on ${ClientSuccessStoryTestimonialCardLayout} { portrait { node { sourceUrl altText } } quote authorName authorTitle clientLogo { node { sourceUrl altText } } }
    ... on ${ClientSuccessStoryRelatedStoriesLayout} { titleLine1 titleLine2 stories { image { node { sourceUrl altText } } tags { label } cardTitle ctaHref } }
    ... on ${ContactFormLayout} { __typename }
  `;

  if (SECTIONS_PATH === "pageContentSections.contentSections") {
    return `fragment PageSections on Page { pageContentSections { contentSections { ${sectionsSelection} } } }`;
  }
  if (SECTIONS_PATH === "pageContentSections.sections") {
    return `fragment PageSections on Page { pageContentSections { sections { ${sectionsSelection} } } }`;
  }
  if (SECTIONS_PATH === "pageContentSections.sectionGroups") {
    return `fragment PageSections on Page { pageContentSections { sectionGroups { groupName sections { ${sectionsSelection} } } } }`;
  }
  return `fragment PageSections on Page { contentSections { ${sectionsSelection} } }`;
}

export const PAGE_SECTIONS_FRAGMENT_RESILIENT = buildFragmentResilient();
