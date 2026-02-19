/**
 * GraphQL fragments for ACF sections, Yoast SEO, menus, and global fields.
 * Each section type gets a fragment; page/CPT queries compose them.
 */

export const SEO_FIELDS = `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
    twitterTitle
    twitterDescription
    twitterImage { sourceUrl }
    metaRobotsNoindex
    metaRobotsNofollow
    schema { raw }
    breadcrumbs { text url }
  }
`;

/**
 * Page section fragments — used when building page queries.
 * ACF flexible content field/type names depend on WP setup; adjust as needed.
 */
