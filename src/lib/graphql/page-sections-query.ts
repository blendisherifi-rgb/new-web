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
  process.env.ACF_SECTIONS_PATH ?? "contentSections";
const LAYOUT_PREFIX =
  process.env.ACF_LAYOUT_TYPE_PREFIX ?? "Page_Contentsections_";
const LAYOUT_SUFFIX = process.env.ACF_LAYOUT_SUFFIX ?? "";

const HeroLayout = `${LAYOUT_PREFIX}HeroSection${LAYOUT_SUFFIX}`;
const WhereWeExcelLayout = `${LAYOUT_PREFIX}WhereWeExcelSection${LAYOUT_SUFFIX}`;
const PlatformLayout = `${LAYOUT_PREFIX}PlatformSection${LAYOUT_SUFFIX}`;
const InnovationLayout = `${LAYOUT_PREFIX}InnovationSection${LAYOUT_SUFFIX}`;
const HorizontalScrollLayout = `${LAYOUT_PREFIX}HorizontalScrollSection${LAYOUT_SUFFIX}`;
const TabbedContentLayout = `${LAYOUT_PREFIX}TabbedContentSection${LAYOUT_SUFFIX}`;

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
      items {
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
      cards {
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

  return `
  fragment PageSections on Page {
    contentSections {
      ${sectionsSelection}
    }
  }
`;
}

export const PAGE_SECTIONS_FRAGMENT = buildFragment();
