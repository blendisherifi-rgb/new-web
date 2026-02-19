import type { MetadataRoute } from "next";
import { fetchGraphQL } from "@/lib/wordpress";
import { LOCALES, localePath } from "@/lib/i18n";
import { fetchCaseStudySlugs } from "@/lib/case-studies";
import { fetchResourceSlugs } from "@/lib/resources";
import { fetchNewsSlugs } from "@/lib/news";

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
    const data = await fetchGraphQL<{
      pages?: { nodes?: Array<{ uri?: string | null; slug?: string | null }> };
    }>(
      `
      query GetSitemapPages {
        pages(first: 500, where: { status: PUBLISH }) {
          nodes { uri slug }
        }
      }
    `,
      { tags: ["sitemap"], revalidate: 3600 }
    );

    const pages = data?.pages?.nodes ?? [];

    for (const page of pages) {
      const uri = page.uri ?? page.slug ?? "";
      const path = uri.replace(/^\//, "").replace(/\/$/, "") || "";
      const slug = path === "" || path === "front" || path === "front-page" ? "" : path;
      const urlPath = localePath(slug ? `/${slug}` : "/", "us");

      entries.push({
        url: absoluteUrl(urlPath),
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [
              LOCALE_TO_HREFLANG[loc] ?? loc,
              absoluteUrl(localePath(slug ? `/${slug}` : "/", loc)),
            ])
          ),
        },
      });
    }

    if (entries.length > 0) {
      // Add CPT archives and singles
      const [caseSlugs, resourceSlugs, newsSlugs] = await Promise.all([
        fetchCaseStudySlugs(),
        fetchResourceSlugs(),
        fetchNewsSlugs(),
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
      url: absoluteUrl(localePath("/search", "us")),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    }
  );

  return entries;
}
