import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://softco.com";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/styleguide"],
    },
    sitemap: sitemapUrl,
    host: SITE_URL.replace(/\/$/, ""),
  };
}
