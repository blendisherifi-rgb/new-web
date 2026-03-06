/**
 * GraphQL query for Page with ACF flexible content sections.
 * WPGraphQL for ACF uses union types — each layout has its own type.
 *
 * Configure via env:
 *   ACF_SECTIONS_PATH - "contentSections" (default) | "pageContentSections.contentSections"
 *   ACF_LAYOUT_TYPE_PREFIX - e.g. "Page_Contentsections_" or "PageContentSectionsContentSections_"
 *   ACF_LAYOUT_SUFFIX - e.g. "" or "Layout" (so HeroSection vs HeroSectionLayout)
 */

const SECTIONS_PATH =
  process.env.ACF_SECTIONS_PATH ?? "pageContentSections.sections";
const LAYOUT_PREFIX =
  process.env.ACF_LAYOUT_TYPE_PREFIX ?? "PageContentSectionsSections";
const LAYOUT_SUFFIX = process.env.ACF_LAYOUT_SUFFIX ?? "Layout";

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
// About-page sections
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
      ctaLabel
      ctaHref
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
      ctaCard {
        heading
        ctaLabel
        ctaHref
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

/** Resilient fragment: only __typename for layouts that may not exist in WP schema yet. Use when full query fails. */
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
      ctaLabel
      ctaHref
    }
    ... on ${PerfectFitFrameworkLayout} {
      overline
      headingBefore
      headingHighlight
      headingAfter
      description
      emphasis
      perfectFitCards { step title description image { node { sourceUrl altText } } }
      ctaCard { heading ctaLabel ctaHref }
    }
    ... on ${RichTextLayout} {
      content
    }
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
