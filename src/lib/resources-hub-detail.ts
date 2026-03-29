/**
 * Single entry for hub items (blog post, guide CPT, webinar CPT) via WPGraphQL root fields.
 */

import { fetchGraphQL } from "./wordpress";
import type { Locale } from "@/lib/i18n";
import type { ResourceHubKind } from "@/lib/resources-hub";

export interface ResourceHubDetail {
  title: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  seo?: {
    title?: string | null;
    metaDesc?: string | null;
    opengraphImage?: { sourceUrl?: string } | null;
  };
}

const DETAIL_FIELDS = `
  title
  excerpt
  content(format: RENDERED)
  date
  featuredImage { node { sourceUrl altText } }
  seo { title metaDesc opengraphImage { sourceUrl } }
`;

const ROOT_BY_KIND: Record<ResourceHubKind, string[]> = {
  blog: ["post"],
  guide: ["guide"],
  webinar: ["webinar"],
};

function mapDetail(raw: Record<string, unknown> | null | undefined): ResourceHubDetail | null {
  if (!raw || typeof raw.title !== "string") return null;
  const fi = raw.featuredImage as { node?: { sourceUrl?: string; altText?: string } } | undefined;
  return {
    title: raw.title,
    excerpt: (raw.excerpt as string) ?? null,
    content: (raw.content as string) ?? null,
    date: (raw.date as string) ?? null,
    featuredImage: fi?.node?.sourceUrl
      ? {
          sourceUrl: fi.node.sourceUrl,
          altText: fi.node.altText ?? undefined,
        }
      : null,
    seo: raw.seo as ResourceHubDetail["seo"],
  };
}

export async function fetchResourceHubEntryBySlug(
  slug: string,
  locale: Locale,
  kind: ResourceHubKind,
): Promise<ResourceHubDetail | null> {
  const roots = ROOT_BY_KIND[kind];
  const tags = ["resources-hub", `resources-hub-${locale}`, `hub-${kind}-${slug}`];

  for (const root of roots) {
    const query = `
      query HubEntryDetail($slug: ID!) {
        ${root}(id: $slug, idType: SLUG) {
          ${DETAIL_FIELDS}
        }
      }
    `;
    try {
      const data = await fetchGraphQL<Record<string, Record<string, unknown> | null>>(
        query,
        { variables: { slug }, tags },
      );
      const node = data?.[root];
      const mapped = mapDetail(node ?? undefined);
      if (mapped) return mapped;
    } catch {
      /* root field may not exist in schema */
    }
  }

  return null;
}
