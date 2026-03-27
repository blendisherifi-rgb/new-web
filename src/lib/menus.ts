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

const PLACEHOLDER_MENU: NavItem[] = [
  {
    id: "1",
    label: "What we do",
    href: "/what-we-do",
    dropdownType: "what-we-do",
    products: [
      {
        id: "1-p1",
        eyebrow: "AP Automation",
        productSuffix: "AP",
        href: "/what-we-do/accounts-payable",
      },
      {
        id: "1-p2",
        eyebrow: "P2P automation",
        productSuffix: "P2P",
        href: "/what-we-do/procure-to-pay",
      },
      {
        id: "1-p3",
        eyebrow: "e-invoicing",
        productLabel: "e-invoicing",
        href: "/what-we-do/e-invoicing",
      },
    ],
    platformLinks: [
      { id: "1-pl1", label: "About", href: "/platform/about" },
      { id: "1-pl2", label: "AI capabilities", href: "/platform/ai-capabilities" },
      { id: "1-pl3", label: "Analytics", href: "/platform/analytics" },
      { id: "1-pl4", label: "Multi-ERP integration", href: "/platform/multi-erp-integration" },
      { id: "1-pl5", label: "Partners", href: "/platform/partners" },
    ],
  },
  {
    id: "2",
    label: "Solutions",
    href: "/solutions",
    dropdownType: "solutions",
    solutionsCategories: [
      {
        id: "2-c1",
        label: "By role",
        links: [
          { id: "2-c1-l1", label: "AP Manager", href: "/solutions/by-role/ap-manager" },
          { id: "2-c1-l2", label: "CFO", href: "/solutions/by-role/cfo" },
          { id: "2-c1-l3", label: "IT Director", href: "/solutions/by-role/it-director" },
          { id: "2-c1-l4", label: "Procurement Manager", href: "/solutions/by-role/procurement-manager" },
          { id: "2-c1-l5", label: "Shared Services", href: "/solutions/by-role/shared-services" },
        ],
        featured: {
          imageUrl: "/solutions-by-role.jpg",
          imageAlt: "Solutions by role",
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
          href: "/solutions/by-role",
        },
      },
      {
        id: "2-c2",
        label: "By goal",
        links: [
          { id: "2-c2-l1", label: "Automate invoice processing", href: "/solutions/by-goal/automate-invoice-processing" },
          { id: "2-c2-l2", label: "Eliminate paper", href: "/solutions/by-goal/eliminate-paper" },
          { id: "2-c2-l3", label: "Improve supplier relationships", href: "/solutions/by-goal/supplier-relationships" },
          { id: "2-c2-l4", label: "Reduce costs", href: "/solutions/by-goal/reduce-costs" },
          { id: "2-c2-l5", label: "Strengthen controls & compliance", href: "/solutions/by-goal/controls-compliance" },
        ],
        featured: {
          imageUrl: "/solutions-by-goal.jpg",
          imageAlt: "Solutions by goal",
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
          href: "/solutions/by-goal",
        },
      },
      {
        id: "2-c3",
        label: "By Industry",
        links: [
          { id: "2-c3-l1", label: "Aviation", href: "/solutions/by-industry/aviation" },
          { id: "2-c3-l2", label: "Retail", href: "/solutions/by-industry/retail" },
          { id: "2-c3-l3", label: "Renewable energy manufacturing", href: "/solutions/by-industry/renewable-energy" },
          { id: "2-c3-l4", label: "Food & beverage", href: "/solutions/by-industry/food-beverage" },
          { id: "2-c3-l5", label: "Financial services", href: "/solutions/by-industry/financial-services" },
          { id: "2-c3-l6", label: "Construction supply chain", href: "/solutions/by-industry/construction" },
          { id: "2-c3-l7", label: "Transport & logistics", href: "/solutions/by-industry/transport-logistics" },
          { id: "2-c3-l8", label: "Hospitality", href: "/solutions/by-industry/hospitality" },
        ],
        featured: {
          imageUrl: "/solutions-by-industry.jpg",
          imageAlt: "Solutions by industry",
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
          href: "/solutions/by-industry",
        },
      },
      {
        id: "2-c4",
        label: "By ERP",
        links: [
          { id: "2-c4-l1", label: "SAP", href: "/solutions/by-erp/sap" },
          { id: "2-c4-l2", label: "Oracle", href: "/solutions/by-erp/oracle" },
          { id: "2-c4-l3", label: "Microsoft Dynamics", href: "/solutions/by-erp/microsoft-dynamics" },
          { id: "2-c4-l4", label: "Workday", href: "/solutions/by-erp/workday" },
          { id: "2-c4-l5", label: "Infor", href: "/solutions/by-erp/infor" },
          { id: "2-c4-l6", label: "Other ERPs", href: "/solutions/by-erp/other" },
        ],
        featured: {
          imageUrl: "/solutions-by-erp.jpg",
          imageAlt: "Solutions by ERP",
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
          href: "/solutions/by-erp",
        },
      },
    ],
  },
  { id: "3", label: "Why SoftCo", href: "/why-softco" },
  { id: "4", label: "Client success", href: "/client-success" },
  {
    id: "5",
    label: "Who we are",
    href: "/who-we-are",
    dropdownType: "who-we-are",
    whoWeAreLinks: [
      { id: "5-l1", label: "About SoftCo", href: "/who-we-are/about" },
      { id: "5-l2", label: "Leadership team", href: "/who-we-are/leadership" },
      { id: "5-l3", label: "ESG", href: "/who-we-are/esg" },
      { id: "5-l4", label: "Partner with us", href: "/who-we-are/partners" },
      { id: "5-l5", label: "Careers", href: "/who-we-are/careers" },
      { id: "5-l6", label: "News", href: "/who-we-are/news" },
      { id: "5-l7", label: "Events", href: "/who-we-are/events" },
      { id: "5-l8", label: "Contact", href: "/who-we-are/contact" },
    ],
    whoWeAreFeatured: {
      imageUrl: "/who-we-are-featured.jpg",
      imageAlt: "SoftCo team",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet enim, mattis ut massa sed.",
      href: "/who-we-are",
    },
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

    const primary = data.menu.menuItems.nodes.map(mapItem);
    return { primary: makeLocaleAware(primary, locale) };
  } catch {
    return { primary: makeLocaleAware(PLACEHOLDER_MENU, locale) };
  }
}
