import type { MetadataRoute } from "next";
import { fetchGraphQL } from "@/lib/wordpress";
import { LOCALES, localePath, getWpmlLanguageEnum } from "@/lib/i18n";
import { fetchCaseStudySlugs } from "@/lib/case-studies";
import { fetchResourceSlugs } from "@/lib/resources";
import { fetchNewsSlugs } from "@/lib/news";
import { fetchGlossarySlugs } from "@/lib/glossary";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://softco.com";

const LOCALE_TO_HREFLANG: Record<string, string> = {
  us: "en-US",
  ie: "en-IE",
  uk: "en-GB",
};

function absoluteUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL.replace(/\/$/, "")}${clean || ""}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  try {
    // Fetch pages for each locale separately using WPML language filter
    // so only pages translated into that language appear in the sitemap.
    const localePageSets = await Promise.all(
      LOCALES.map(async (loc) => {
        const language = getWpmlLanguageEnum(loc);
        const data = await fetchGraphQL<{
          pages?: { nodes?: Array<{ uri?: string | null; slug?: string | null }> };
        }>(
          `
          query GetSitemapPages($language: LanguageCodeEnum) {
            pages(first: 500, where: { status: PUBLISH, language: $language }) {
              nodes { uri slug }
            }
          }
        `,
          { variables: { language }, tags: ["sitemap"], revalidate: 3600 }
        );
        return { loc, nodes: data?.pages?.nodes ?? [] };
      })
    );

    // Build a map of slug → set of locales that have a translation
    const slugLocaleMap = new Map<string, Set<string>>();
    for (const { loc, nodes } of localePageSets) {
      for (const page of nodes) {
        const uri = page.uri ?? page.slug ?? "";
        const path = uri.replace(/^\//, "").replace(/\/$/, "") || "";
        const slug = path === "" || path === "front" || path === "front-page" ? "" : path;
        if (!slugLocaleMap.has(slug)) slugLocaleMap.set(slug, new Set());
        slugLocaleMap.get(slug)!.add(loc);
      }
    }

    for (const [slug, availableLocales] of slugLocaleMap) {
      const urlPath = localePath(slug ? `/${slug}` : "/", "us");
      entries.push({
        url: absoluteUrl(urlPath),
        lastModified: new Date(),
        changeFrequency: slug === "" ? "weekly" : "monthly",
        priority: slug === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            // Only include hreflang entries for locales that have this page translated
            Array.from(availableLocales).map((loc) => [
              LOCALE_TO_HREFLANG[loc] ?? loc,
              absoluteUrl(localePath(slug ? `/${slug}` : "/", loc as (typeof LOCALES)[number])),
            ])
          ),
        },
      });
    }

    if (entries.length > 0) {
      // Add CPT archives and singles
      const [caseSlugs, resourceSlugs, newsSlugs, glossarySlugs] = await Promise.all([
        fetchCaseStudySlugs(),
        fetchResourceSlugs(),
        fetchNewsSlugs(),
        fetchGlossarySlugs(),
      ]);

      for (const slug of caseSlugs) {
        entries.push({
          url: absoluteUrl(localePath(`/case-studies/${slug}`, "us")),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath(`/case-studies/${slug}`, loc)),
              ])
            ),
          },
        });
      }

      for (const slug of resourceSlugs) {
        entries.push({
          url: absoluteUrl(localePath(`/resources/${slug}`, "us")),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath(`/resources/${slug}`, loc)),
              ])
            ),
          },
        });
      }

      for (const slug of newsSlugs) {
        entries.push({
          url: absoluteUrl(localePath(`/news/${slug}`, "us")),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath(`/news/${slug}`, loc)),
              ])
            ),
          },
        });
      }

      for (const slug of glossarySlugs) {
        entries.push({
          url: absoluteUrl(localePath(`/resources/glossary/${slug}`, "us")),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath(`/resources/glossary/${slug}`, loc)),
              ])
            ),
          },
        });
      }

      entries.push(
        {
          url: absoluteUrl(localePath("/case-studies", "us")),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath("/case-studies", loc)),
              ])
            ),
          },
        },
        {
          url: absoluteUrl(localePath("/resources", "us")),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath("/resources", loc)),
              ])
            ),
          },
        },
        {
          url: absoluteUrl(localePath("/news", "us")),
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath("/news", loc)),
              ])
            ),
          },
        },
        {
          url: absoluteUrl(localePath("/resources/glossary", "us")),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.75,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((loc) => [
                LOCALE_TO_HREFLANG[loc] ?? loc,
                absoluteUrl(localePath("/resources/glossary", loc)),
              ])
            ),
          },
        },
        {
          url: absoluteUrl(localePath("/search", "us")),
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        }
      );

      return entries;
    }
  } catch {
    // Fall through to placeholder
  }

  // Placeholder when WP not configured — include homepage + CPT archives
  entries.push(
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((loc) => [
            LOCALE_TO_HREFLANG[loc] ?? loc,
            absoluteUrl(localePath("/", loc)),
          ])
        ),
      },
    },
    {
      url: absoluteUrl(localePath("/case-studies", "us")),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(localePath("/resources", "us")),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(localePath("/news", "us")),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(localePath("/resources/glossary", "us")),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: absoluteUrl(localePath("/search", "us")),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }
  );

  return entries;
}
