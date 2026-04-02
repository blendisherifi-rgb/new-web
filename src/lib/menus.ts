/**
 * Fetch WP Menus via WPGraphQL.
 * Returns placeholder nav items when WP is not configured.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath, getWpmlLanguage } from "./i18n";

/** A product card shown in the left column of the "What we do" mega-menu. */
export interface WhatWeDoProduct {
  id: string;
  eyebrow: string;
  /** Product name rendered as "SoftCo" + colored suffix, e.g. "AP" or "P2P". */
  productSuffix?: string;
  /** Full product name override when not using the SoftCo + suffix pattern. */
  productLabel?: string;
  href: string;
}

/** A plain link shown in the right "Platform" column of the "What we do" mega-menu. */
export interface WhatWeDoPlatformLink {
  id: string;
  label: string;
  href: string;
}

/** A single sub-link within a Solutions category. */
export interface SolutionsLink {
  id: string;
  label: string;
  href: string;
}

/** Featured card shown in the right column of the Solutions mega-menu. */
export interface SolutionsFeaturedCard {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description?: string;
  href?: string;
}

/** One tab/category in the Solutions mega-menu left column. */
export interface SolutionsCategory {
  id: string;
  label: string;
  links: SolutionsLink[];
  featured?: SolutionsFeaturedCard;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
  /** ACF: featured image URL for mega-menu hover */
  featuredImageUrl?: string | null;
  /** ACF: description text for mega-menu */
  description?: string | null;
  /**
   * Identifies which custom mega-menu layout to render.
   * "what-we-do"  → two-column layout (product cards + platform links).
   * "solutions"   → three-column layout (category tabs + links + featured card).
   * "who-we-are"  → two-column layout (plain links + featured card).
   */
  dropdownType?: "what-we-do" | "solutions" | "who-we-are";
  /** Product cards for the "what-we-do" dropdown left column. */
  products?: WhatWeDoProduct[];
  /** Platform links for the "what-we-do" dropdown right column. */
  platformLinks?: WhatWeDoPlatformLink[];
  /** Categories for the "solutions" dropdown. */
  solutionsCategories?: SolutionsCategory[];
  /** Links for the "who-we-are" dropdown left column. */
  whoWeAreLinks?: WhatWeDoPlatformLink[];
  /** Featured card for the "who-we-are" dropdown right column. */
  whoWeAreFeatured?: SolutionsFeaturedCard;
}

export interface MenusData {
  primary: NavItem[];
}

/** "What we do" mega-menu — must match WordPress page slugs (injected for placeholder + WP PRIMARY menu). */
const WHAT_WE_DO_MEGA_MENU: Pick<NavItem, "dropdownType" | "products" | "platformLinks"> = {
  dropdownType: "what-we-do",
  products: [
    {
      id: "1-p1",
      eyebrow: "AP Automation",
      productSuffix: "AP",
      href: "/accounts-payable-automation",
    },
    {
      id: "1-p2",
      eyebrow: "P2P Automation",
      productSuffix: "P2P",
      href: "/solution-p2p-automation",
    },
    {
      id: "1-p3",
      eyebrow: "E-Invoicing",
      productLabel: "e-invoicing",
      href: "/solution-e-invoicing-software",
    },
  ],
  platformLinks: [
    { id: "1-pl1", label: "About", href: "/about" },
    { id: "1-pl2", label: "AI capabilities", href: "/ai-accounts-payable-automation" },
    { id: "1-pl3", label: "Analytics", href: "/platform-accounts-payable-analytics" },
    {
      id: "1-pl4",
      label: "Multi-ERP integration",
      href: "/platform-ap-automation-erp-integration",
    },
    {
      id: "1-pl5",
      label: "Supplier Management",
      href: "/platform-supplier-portal-software",
    },
  ],
};

function mergeWhatWeDoMegaMenu(primary: NavItem[]): NavItem[] {
  return primary.map((item) => {
    const label = (item.label ?? "").trim().toLowerCase();
    if (label === "what we do") {
      return { ...item, ...WHAT_WE_DO_MEGA_MENU };
    }
    return item;
  });
}

/**
 * Solutions mega-menu: only "By role" and "By Industry" (By goal + By ERP hidden until later).
 * Paths match WordPress page slugs (same as production URLs without host).
 */
const SOLUTIONS_MEGA_MENU: Pick<NavItem, "dropdownType" | "solutionsCategories"> = {
  dropdownType: "solutions",
  solutionsCategories: [
    {
      id: "2-c1",
      label: "By role",
      links: [
        { id: "2-c1-l1", label: "CFO", href: "/automation-by-cfo" },
        { id: "2-c1-l2", label: "AP Manager", href: "/by-ap-manager" },
        { id: "2-c1-l3", label: "Financial Controller", href: "/solution-by-financial-controller" },
      ],
      featured: {
        imageUrl: "/solutions-by-role.jpg",
        imageAlt: "Solutions by role",
        title: "Solutions by role",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
        href: "/automation-by-cfo",
      },
    },
    {
      id: "2-c3",
      label: "By Industry",
      links: [
        { id: "2-c3-l1", label: "Aviation", href: "/solution-by-aviation" },
        { id: "2-c3-l2", label: "Retail", href: "/solution-by-retail" },
        { id: "2-c3-l3", label: "Manufacturing", href: "/solution-by-manufacturing" },
        { id: "2-c3-l4", label: "Construction", href: "/solution-by-construction" },
        { id: "2-c3-l5", label: "Transport & Logistics", href: "/accounts-payable-automation-logistics" },
        { id: "2-c3-l6", label: "Financial Services", href: "/accounts-payable-automation-financial-services" },
        { id: "2-c3-l7", label: "Food & Beverage", href: "/solution-by-food-beverage" },
        { id: "2-c3-l8", label: "Renewables", href: "/solution-by-renewables" },
      ],
      featured: {
        imageUrl: "/solutions-by-industry.jpg",
        imageAlt: "Solutions by industry",
        title: "Solutions by industry",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
        href: "/solution-by-aviation",
      },
    },
  ],
};

/** When WordPress returns PRIMARY menu items, inject the Solutions mega-menu (WP menu alone has no category structure). */
function mergeSolutionsMegaMenu(primary: NavItem[]): NavItem[] {
  return primary.map((item) => {
    const label = (item.label ?? "").trim().toLowerCase();
    if (label === "solutions") {
      return { ...item, ...SOLUTIONS_MEGA_MENU };
    }
    return item;
  });
}

/**
 * "Who we are" mega-menu — paths match WordPress page slugs (production URLs without host).
 */
const WHO_WE_ARE_MEGA_MENU: Pick<
  NavItem,
  "dropdownType" | "href" | "whoWeAreLinks" | "whoWeAreFeatured"
> = {
  dropdownType: "who-we-are",
  href: "/about",
  whoWeAreLinks: [
    { id: "5-l1", label: "About us", href: "/about" },
    { id: "5-l2", label: "Leadership Team", href: "/leadership-team" },
    { id: "5-l3", label: "ESG", href: "/esg" },
    { id: "5-l4", label: "Partner Programme", href: "/partner-programme" },
    { id: "5-l5", label: "Careers", href: "/careers" },
    { id: "5-l6", label: "News", href: "/news" },
    { id: "5-l7", label: "Events", href: "/resources?types=webinar" },
    { id: "5-l8", label: "Contact US", href: "/contact-us" },
  ],
  whoWeAreFeatured: {
    imageUrl: "/who-we-are-featured.jpg",
    imageAlt: "SoftCo team",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
    href: "/about",
  },
};

function mergeWhoWeAreMegaMenu(primary: NavItem[]): NavItem[] {
  return primary.map((item) => {
    const label = (item.label ?? "").trim().toLowerCase();
    if (label === "who we are") {
      return { ...item, ...WHO_WE_ARE_MEGA_MENU };
    }
    return item;
  });
}

const PLACEHOLDER_MENU: NavItem[] = [
  {
    id: "1",
    label: "What we do",
    href: "/what-we-do",
    ...WHAT_WE_DO_MEGA_MENU,
  },
  {
    id: "2",
    label: "Solutions",
    href: "/solutions",
    ...SOLUTIONS_MEGA_MENU,
  },
  { id: "3", label: "Why SoftCo", href: "/why-softco" },
  { id: "4", label: "Client Success", href: "/case-studies" },
  {
    id: "5",
    label: "Who we are",
    ...WHO_WE_ARE_MEGA_MENU,
  },
  { id: "6", label: "Resources", href: "/resources" },
];

function makeLocaleAware(items: NavItem[], locale: Locale): NavItem[] {
  return items.map((item) => ({
    ...item,
    href: localePath(item.href, locale),
    children: item.children
      ? item.children.map((c) => ({
          ...c,
          href: localePath(c.href, locale),
        }))
      : undefined,
    products: item.products?.map((p) => ({ ...p, href: localePath(p.href, locale) })),
    platformLinks: item.platformLinks?.map((l) => ({ ...l, href: localePath(l.href, locale) })),
    solutionsCategories: item.solutionsCategories?.map((cat) => ({
      ...cat,
      links: cat.links.map((l) => ({ ...l, href: localePath(l.href, locale) })),
      featured: cat.featured?.href
        ? { ...cat.featured, href: localePath(cat.featured.href, locale) }
        : cat.featured,
    })),
    whoWeAreLinks: item.whoWeAreLinks?.map((l) => ({ ...l, href: localePath(l.href, locale) })),
    whoWeAreFeatured: item.whoWeAreFeatured?.href
      ? { ...item.whoWeAreFeatured, href: localePath(item.whoWeAreFeatured.href, locale) }
      : item.whoWeAreFeatured,
  }));
}

export async function fetchMenus(locale: Locale): Promise<MenusData> {
  const language = getWpmlLanguage(locale);

  try {
    const data = await fetchGraphQL<{
      menu?: {
        menuItems?: {
          nodes?: Array<{
            id: string;
            label?: string | null;
            url?: string | null;
            path?: string | null;
            childItems?: { nodes?: unknown[] };
          }>;
        };
      };
    }>(
      `
      query GetMenu($location: MenuLocationEnum!) {
        menu(id: $location, idType: LOCATION) {
          menuItems(first: 50) {
            nodes {
              id
              label
              path
              url
              childItems(first: 20) {
                nodes {
                  id
                  label
                  path
                }
              }
            }
          }
        }
      }
    `,
      {
        variables: { location: "PRIMARY" },
        tags: ["menus", `menus-${locale}`],
      }
    );

    if (!data?.menu?.menuItems?.nodes?.length) {
      return { primary: makeLocaleAware(PLACEHOLDER_MENU, locale) };
    }

    const mapItem = (node: (typeof data.menu.menuItems.nodes)[0]): NavItem => ({
      id: node.id,
      label: node.label ?? "",
      href: node.path ?? node.url ?? "#",
      children:
        node.childItems?.nodes?.length &&
        Array.isArray(node.childItems.nodes) &&
        node.childItems.nodes.length > 0
          ? (node.childItems.nodes as typeof data.menu.menuItems.nodes).map(mapItem)
          : undefined,
    });

    const primary = mergeWhoWeAreMegaMenu(
      mergeWhatWeDoMegaMenu(mergeSolutionsMegaMenu(data.menu.menuItems.nodes.map(mapItem))),
    );
    return { primary: makeLocaleAware(primary, locale) };
  } catch {
    return { primary: makeLocaleAware(PLACEHOLDER_MENU, locale) };
  }
}
