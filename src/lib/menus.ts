/**
 * Fetch WP Menus via WPGraphQL.
 * Returns placeholder nav items when WP is not configured.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavItem[];
  /** ACF: featured image URL for mega-menu hover */
  featuredImageUrl?: string | null;
  /** ACF: description text for mega-menu */
  description?: string | null;
}

export interface MenusData {
  primary: NavItem[];
}

const PLACEHOLDER_MENU: NavItem[] = [
  {
    id: "1",
    label: "What we do",
    href: "/what-we-do",
    children: [
      { id: "1-1", label: "Accounts Payable", href: "/what-we-do/accounts-payable" },
      { id: "1-2", label: "Procure-to-Pay", href: "/what-we-do/procure-to-pay" },
    ],
  },
  {
    id: "2",
    label: "Solutions",
    href: "/solutions",
    children: [
      { id: "2-1", label: "For Finance", href: "/solutions/finance" },
      { id: "2-2", label: "For IT", href: "/solutions/it" },
    ],
  },
  {
    id: "3",
    label: "Who we are",
    href: "/who-we-are",
    children: [
      { id: "3-1", label: "About us", href: "/who-we-are/about" },
      { id: "3-2", label: "Careers", href: "/who-we-are/careers" },
    ],
  },
  { id: "4", label: "Resources", href: "/resources" },
  { id: "5", label: "Contact", href: "/contact" },
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
