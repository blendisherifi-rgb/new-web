/**
 * Single CPT entries (blog, news, guide, webinar) via WPGraphQL + WPML translations + REST fallbacks.
 */

import { fetchGraphQL, getWordPressRestBaseUrl } from "./wordpress";
import { getWpmlLanguage, resolveWpmlNodeForLocale, type Locale } from "@/lib/i18n";
import type { ResourceHubKind } from "@/lib/resources-hub";
import { REST_PATHS_BY_KIND } from "@/lib/resources-hub";

/** Kinds supported on inner routes (/blog, /news, /guides, /webinars) and the resources hub. */
export type ResourceHubEntryKind = ResourceHubKind | "news";

/** ACF “Webcast” group on `webinars` CPT (see ACF export). */
export interface WebcastSpeaker {
  image?: { sourceUrl?: string; altText?: string } | null;
  name?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  blurb?: string | null;
}

export interface ResourceHubWebcast {
  webinarTitle?: string | null;
  /** ACF date_picker return_format Ymd */
  eventDate?: string | null;
  /** ACF time_picker return_format Hi */
  eventTime?: string | null;
  shortDescription?: string | null;
  masonryBlockDescription?: string | null;
  textBlock?: string | null;
  altText?: boolean | null;
  postEventTextBlock?: string | null;
  gotowebinarLink?: string | null;
  clickDimensionsCode?: string | null;
  addeventLink?: string | null;
  youtubeEmbed?: string | null;
  image?: { sourceUrl?: string; altText?: string } | null;
  imageLrg?: { sourceUrl?: string; altText?: string } | null;
  bannerIcon?: { sourceUrl?: string; altText?: string } | null;
  speakerProfile?: WebcastSpeaker[];
}

export interface ResourceHubDetail {
  title: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  featuredImage?: { sourceUrl?: string; altText?: string } | null;
  /** When set (webinars), inner page uses ACF Webcast instead of post body. */
  webcast?: ResourceHubWebcast | null;
  faqs?: Array<{ question: string; answer: string }>;
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
  language { code }
`;

/** GraphQL single-entry root field names to try in order (schema / CPT naming varies). */
const GRAPHQL_ROOTS_BY_KIND: Record<ResourceHubEntryKind, readonly string[]> = {
  blog: ["blog", "post"],
  news: ["news", "newsItem"],
  guide: ["guide"],
  webinar: ["webinar", "webinars"],
};

function restCollectionsForKind(kind: ResourceHubEntryKind): readonly string[] {
  if (kind === "news") return ["news"];
  if (kind === "blog") return ["blog", "posts"];
  return REST_PATHS_BY_KIND[kind as ResourceHubKind];
}

function detailCacheTags(locale: Locale, kind: ResourceHubEntryKind, slug: string): string[] {
  if (kind === "news") {
    return ["news", `news-${locale}-${slug}`];
  }
  return ["resources-hub", `resources-hub-${locale}`, `hub-${kind}-${slug}`];
}

function stripRenderedTitle(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

interface WpRestPostLike {
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  date?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
}

function mapRestPostToDetail(p: WpRestPostLike): ResourceHubDetail | null {
  const title = stripRenderedTitle(p.title?.rendered ?? "");
  if (!title) return null;
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    title,
    excerpt: p.excerpt?.rendered ?? null,
    content: p.content?.rendered ?? null,
    date: p.date ?? null,
    featuredImage: media?.source_url
      ? { sourceUrl: media.source_url, altText: media.alt_text ?? undefined }
      : null,
    seo: undefined,
  };
}

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

function mapFaqsFromNode(raw: Record<string, unknown> | null | undefined): ResourceHubDetail["faqs"] {
  const source =
    (raw?.faqs as unknown[] | undefined) ??
    ((raw?.fAQs as { faqs?: unknown[] } | undefined)?.faqs as unknown[] | undefined) ??
    (raw?.fAQs as unknown[] | undefined);
  if (!Array.isArray(source)) return [];
  return source
    .map((item) => {
      const row = item as Record<string, unknown>;
      const question = typeof row.question === "string" ? row.question.trim() : "";
      const answer = typeof row.answer === "string" ? row.answer.trim() : "";
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((row): row is { question: string; answer: string } => Boolean(row));
}

function mapAcfImageField(raw: unknown): { sourceUrl?: string; altText?: string } | null {
  if (raw == null) return null;
  if (typeof raw === "object" && raw !== null && "node" in raw) {
    const n = (raw as { node?: { sourceUrl?: string; altText?: string } }).node;
    if (n?.sourceUrl) return { sourceUrl: n.sourceUrl, altText: n.altText ?? undefined };
    return null;
  }
  if (typeof raw === "object" && raw !== null && "sourceUrl" in raw) {
    const o = raw as { sourceUrl?: string; altText?: string };
    if (o.sourceUrl) return { sourceUrl: o.sourceUrl, altText: o.altText ?? undefined };
    return null;
  }
  if (
    typeof raw === "object" &&
    raw !== null &&
    "url" in raw &&
    typeof (raw as { url?: string }).url === "string"
  ) {
    const o = raw as { url: string; alt?: string; alt_text?: string };
    return { sourceUrl: o.url, altText: o.alt ?? o.alt_text ?? undefined };
  }
  return null;
}

function mapWebcastSpeakerRow(row: Record<string, unknown>): WebcastSpeaker {
  return {
    image: mapAcfImageField(row.image),
    name: typeof row.name === "string" ? row.name : null,
    jobTitle:
      typeof row.jobTitle === "string"
        ? row.jobTitle
        : typeof row.job_title === "string"
          ? row.job_title
          : null,
    company: typeof row.company === "string" ? row.company : null,
    blurb: typeof row.blurb === "string" ? row.blurb : null,
  };
}

function webcastEventStartMs(
  dateYmd: string | null | undefined,
  timeHi: string | null | undefined,
): number | null {
  if (!dateYmd || !/^\d{8}$/.test(dateYmd)) return null;
  const y = Number(dateYmd.slice(0, 4));
  const mo = Number(dateYmd.slice(4, 6)) - 1;
  const d = Number(dateYmd.slice(6, 8));
  let hh = 0;
  let mm = 0;
  if (timeHi && /^\d{3,4}$/.test(timeHi)) {
    const p = timeHi.padStart(4, "0");
    hh = Number(p.slice(0, 2));
    mm = Number(p.slice(2, 4));
  }
  return new Date(y, mo, d, hh, mm, 0, 0).getTime();
}

/** Prefer post-event WYSIWYG after scheduled start when `alt_text` + content exist. */
export function pickWebcastMainHtml(w: ResourceHubWebcast): string | null {
  const pre = (w.textBlock ?? "").trim();
  const post = (w.postEventTextBlock ?? "").trim();
  if (!w.altText || !post) {
    const main = pre || post;
    return main.length > 0 ? main : null;
  }
  const start = webcastEventStartMs(w.eventDate, w.eventTime);
  if (start != null && Date.now() >= start) return post || pre || null;
  return pre || post || null;
}

function isWebcastMeaningful(w: ResourceHubWebcast): boolean {
  return Boolean(
    (w.webinarTitle ?? "").trim() ||
      pickWebcastMainHtml(w) ||
      (w.shortDescription ?? "").trim() ||
      (w.youtubeEmbed ?? "").trim() ||
      (w.gotowebinarLink ?? "").trim() ||
      (w.addeventLink ?? "").trim() ||
      (w.clickDimensionsCode ?? "").trim() ||
      (w.speakerProfile?.length ?? 0) > 0 ||
      w.imageLrg?.sourceUrl ||
      w.image?.sourceUrl,
  );
}

function normalizeWebcastGroup(raw: Record<string, unknown> | null | undefined): ResourceHubWebcast | null {
  if (!raw || typeof raw !== "object") return null;
  const speakerSource =
    (raw.speakerProfile as unknown[] | undefined) ??
    (raw.speakerProfiles as unknown[] | undefined);
  const speakers = Array.isArray(speakerSource)
    ? speakerSource
        .map((row) => mapWebcastSpeakerRow(row as Record<string, unknown>))
        .filter((s) => (s.name ?? "").trim() || (s.blurb ?? "").trim() || s.image?.sourceUrl)
    : undefined;

  const altRaw = raw.altText;
  const altText =
    typeof altRaw === "boolean"
      ? altRaw
      : altRaw === 1 || altRaw === "1"
        ? true
        : null;

  return {
    webinarTitle: typeof raw.webinarTitle === "string" ? raw.webinarTitle : null,
    eventDate: typeof raw.date === "string" ? raw.date : null,
    eventTime: typeof raw.time === "string" ? raw.time : null,
    shortDescription: typeof raw.shortDescription === "string" ? raw.shortDescription : null,
    masonryBlockDescription:
      typeof raw.masonryBlockDescription === "string" ? raw.masonryBlockDescription : null,
    textBlock: typeof raw.textBlock === "string" ? raw.textBlock : null,
    altText,
    postEventTextBlock:
      typeof raw.postEventTextBlock === "string" ? raw.postEventTextBlock : null,
    gotowebinarLink: typeof raw.gotowebinarLink === "string" ? raw.gotowebinarLink : null,
    clickDimensionsCode:
      typeof raw.clickDimensionsCode === "string" ? raw.clickDimensionsCode : null,
    addeventLink: typeof raw.addeventLink === "string" ? raw.addeventLink : null,
    youtubeEmbed: typeof raw.youtubeEmbed === "string" ? raw.youtubeEmbed : null,
    image: mapAcfImageField(raw.image),
    imageLrg: mapAcfImageField(raw.imageLrg),
    bannerIcon: mapAcfImageField(raw.bannerIcon),
    speakerProfile: speakers && speakers.length > 0 ? speakers : undefined,
  };
}

function buildWebcastSelection(images: "node" | "direct"): string {
  const img = (name: string) =>
    images === "node"
      ? `${name} { node { sourceUrl altText } }`
      : `${name} { sourceUrl altText }`;
  return `
    webinarTitle
    date
    time
    shortDescription
    masonryBlockDescription
    textBlock
    altText
    postEventTextBlock
    gotowebinarLink
    clickDimensionsCode
    addeventLink
    youtubeEmbed
    ${img("image")}
    ${img("imageLrg")}
    ${img("bannerIcon")}
    speakerProfile {
      ${img("image")}
      name
      jobTitle
      company
      blurb
    }
  `;
}

async function fetchWebcastViaGraphql(
  slug: string,
  locale: Locale,
  tags: string[],
): Promise<ResourceHubWebcast | null> {
  const roots = GRAPHQL_ROOTS_BY_KIND.webinar;
  const nestedFields = [
    { wrapper: "webcast", images: "node" as const },
    { wrapper: "webcast", images: "direct" as const },
    { wrapper: "webcastFields", images: "node" as const },
    { wrapper: "webcastFields", images: "direct" as const },
  ];

  for (const root of roots) {
    for (const withTranslations of [true, false] as const) {
      for (const { wrapper, images } of nestedFields) {
        const inner = buildWebcastSelection(images);
        const transBlock = withTranslations
          ? `
          translations {
            language { code }
            ${wrapper} { ${inner} }
          }`
          : "";

        const query = `
          query WebinarWebcast($slug: ID!) {
            ${root}(id: $slug, idType: SLUG) {
              language { code }
              ${wrapper} { ${inner} }
              ${transBlock}
            }
          }
        `;

        try {
          const data = await fetchGraphQL<Record<string, Record<string, unknown> | null>>(
            query,
            { variables: { slug }, tags },
          );
          const raw = data?.[root];
          if (!raw) continue;
          const typed = raw as {
            language?: { code?: string };
            translations?: Array<Record<string, unknown> & { language?: { code?: string } }>;
          };
          const resolved = resolveWpmlNodeForLocale(
            typed,
            withTranslations ? typed.translations : undefined,
            locale,
          ) as Record<string, unknown> | null;
          const group = (resolved?.[wrapper] ?? raw[wrapper]) as Record<string, unknown> | undefined;
          const mapped = normalizeWebcastGroup(group);
          if (mapped && isWebcastMeaningful(mapped)) return mapped;
        } catch {
          /* schema variant */
        }
      }
    }
  }

  return null;
}

interface WpRestPostWithAcf extends WpRestPostLike {
  acf?: Record<string, unknown>;
}

function mapWebcastFromRestAcf(acf: Record<string, unknown> | undefined): ResourceHubWebcast | null {
  if (!acf || typeof acf !== "object") return null;
  const raw: Record<string, unknown> = {
    webinarTitle: acf.webinar_title,
    date: acf.date,
    time: acf.time,
    shortDescription: acf.short_description,
    masonryBlockDescription: acf.masonry_block_description,
    textBlock: acf.text_block,
    altText: acf.alt_text,
    postEventTextBlock: acf.post_event_text_block,
    gotowebinarLink: acf.gotowebinar_link,
    clickDimensionsCode: acf.click_dimensions_code,
    addeventLink: acf.addevent_link,
    youtubeEmbed: acf.youtube_embed,
    image: acf.image,
    imageLrg: acf.image_lrg,
    bannerIcon: acf.banner_icon,
    speakerProfile: acf.speaker_profile,
  };
  const normalized = normalizeWebcastGroup(raw);
  if (!normalized) return null;
  return isWebcastMeaningful(normalized) ? normalized : null;
}

async function fetchWebcastViaRest(
  slug: string,
  locale: Locale,
  tags: string[],
): Promise<ResourceHubWebcast | null> {
  const base = getWordPressRestBaseUrl();
  if (!base) return null;
  const language = getWpmlLanguage(locale);

  for (const collection of restCollectionsForKind("webinar")) {
    try {
      const url = `${base}/wp/v2/${collection}?slug=${encodeURIComponent(slug)}&_embed&lang=${encodeURIComponent(language)}`;
      const res = await fetch(url, { next: { tags } });
      if (!res.ok) continue;
      const arr = (await res.json()) as WpRestPostWithAcf[];
      if (!Array.isArray(arr) || arr.length === 0) continue;
      const mapped = mapWebcastFromRestAcf(arr[0].acf);
      if (mapped) return mapped;
    } catch {
      /* collection missing */
    }
  }
  return null;
}

async function fetchWebinarWebcastFields(
  slug: string,
  locale: Locale,
  tags: string[],
): Promise<ResourceHubWebcast | null> {
  const gql = await fetchWebcastViaGraphql(slug, locale, tags);
  if (gql) return gql;
  return fetchWebcastViaRest(slug, locale, tags);
}

/** Display title: ACF webinar title when set, else WordPress title. */
export function resourceHubEntryDisplayTitle(item: ResourceHubDetail): string {
  const w = item.webcast?.webinarTitle?.trim();
  return w || item.title;
}

function formatWebcastDateYmd(ymd: string | null | undefined): string | null {
  if (!ymd || !/^\d{8}$/.test(ymd)) return null;
  const y = Number(ymd.slice(0, 4));
  const mo = Number(ymd.slice(4, 6)) - 1;
  const d = Number(ymd.slice(6, 8));
  const dt = new Date(y, mo, d);
  return dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function formatWebcastTimeHi(hi: string | null | undefined): string | null {
  if (!hi || !/^\d{3,4}$/.test(hi)) return null;
  const p = hi.padStart(4, "0");
  let h = Number(p.slice(0, 2));
  const m = Number(p.slice(2, 4));
  if (h > 23 || m > 59) return null;
  const hr12 = h % 12 || 12;
  const ampm = h < 12 ? "a.m." : "p.m.";
  return `${hr12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/** Human-readable schedule from ACF `date` (Ymd) and `time` (Hi). */
export function formatWebcastSchedule(w: ResourceHubWebcast): string | null {
  const dateStr = formatWebcastDateYmd(w.eventDate);
  const timeStr = formatWebcastTimeHi(w.eventTime);
  if (dateStr && timeStr) return `${dateStr} · ${timeStr}`;
  if (dateStr) return dateStr;
  if (timeStr) return timeStr;
  return null;
}

async function fetchBlogFaqsBySlug(
  slug: string,
  locale: Locale,
  tags: string[],
): Promise<ResourceHubDetail["faqs"]> {
  const roots = GRAPHQL_ROOTS_BY_KIND.blog;
  const question = (
    root: string,
    withTranslations: boolean,
    faqSelection: string,
    translationFaqSelection: string,
  ) => `
    query BlogFaqs($slug: ID!) {
      ${root}(id: $slug, idType: SLUG) {
        language { code }
        ${faqSelection}
        ${
          withTranslations
            ? `translations { language { code } ${translationFaqSelection} }`
            : ""
        }
      }
    }
  `;

  const faqShapes = [
    {
      faqSelection: "fAQs { faqs { question answer } }",
      translationFaqSelection: "fAQs { faqs { question answer } }",
    },
    {
      faqSelection: "faqs { question answer }",
      translationFaqSelection: "faqs { question answer }",
    },
  ] as const;

  for (const root of roots) {
    for (const shape of faqShapes) {
      for (const withTranslations of [true, false] as const) {
        try {
          const data = await fetchGraphQL<Record<string, Record<string, unknown> | null>>(
            question(
              root,
              withTranslations,
              shape.faqSelection,
              shape.translationFaqSelection,
            ),
            { variables: { slug }, tags },
          );
          const raw = data?.[root];
          if (!raw) continue;
          const typed = raw as {
            language?: { code?: string };
            translations?: Array<Record<string, unknown> & { language?: { code?: string } }>;
          };
          const resolved = resolveWpmlNodeForLocale(
            typed,
            withTranslations ? typed.translations : undefined,
            locale,
          ) as Record<string, unknown> | null;
          const faqs = mapFaqsFromNode(resolved ?? (raw as Record<string, unknown>));
          if (faqs && faqs.length > 0) return faqs;
        } catch {
          /* try next shape / translations mode */
        }
      }
    }
  }
  return [];
}

async function fetchCptEntryBySlug(
  slug: string,
  locale: Locale,
  tags: string[],
  graphqlRoots: readonly string[],
  restCollections: readonly string[],
): Promise<ResourceHubDetail | null> {
  const language = getWpmlLanguage(locale);

  const runRoot = async (
    root: string,
    withTranslations: boolean,
  ): Promise<ResourceHubDetail | null> => {
    const transBlock = withTranslations
      ? `
      translations {
        title
        excerpt
        content(format: RENDERED)
        date
        featuredImage { node { sourceUrl altText } }
        seo { title metaDesc opengraphImage { sourceUrl } }
        language { code }
      }`
      : "";

    const query = `
      query CptDetailEntry($slug: ID!) {
        ${root}(id: $slug, idType: SLUG) {
          ${DETAIL_FIELDS}
          ${transBlock}
        }
      }
    `;

    const data = await fetchGraphQL<Record<string, Record<string, unknown> | null>>(
      query,
      { variables: { slug }, tags },
    );
    const raw = data?.[root];
    if (!raw || typeof raw.title !== "string") return null;

    const typed = raw as {
      language?: { code?: string };
      translations?: Array<Record<string, unknown> & { language?: { code?: string } }>;
    };
    const translations = withTranslations ? typed.translations : undefined;
    const resolved = resolveWpmlNodeForLocale(typed, translations, locale);
    if (!resolved) return null;
    return mapDetail(resolved as Record<string, unknown>);
  };

  for (const root of graphqlRoots) {
    for (const withTranslations of [true, false] as const) {
      try {
        const mapped = await runRoot(root, withTranslations);
        if (mapped) return mapped;
      } catch {
        /* missing root, translations field, or schema mismatch */
      }
    }
  }

  const base = getWordPressRestBaseUrl();
  if (base) {
    for (const collection of restCollections) {
      try {
        const url = `${base}/wp/v2/${collection}?slug=${encodeURIComponent(slug)}&_embed&lang=${encodeURIComponent(language)}`;
        const res = await fetch(url, { next: { tags } });
        if (!res.ok) continue;
        const arr = (await res.json()) as WpRestPostLike[];
        if (!Array.isArray(arr) || arr.length === 0) continue;
        const mapped = mapRestPostToDetail(arr[0]);
        if (mapped) return mapped;
      } catch {
        /* collection may not exist */
      }
    }
  }

  return null;
}

export async function fetchResourceHubEntryBySlug(
  slug: string,
  locale: Locale,
  kind: ResourceHubEntryKind,
): Promise<ResourceHubDetail | null> {
  const tags = detailCacheTags(locale, kind, slug);
  const graphqlRoots = GRAPHQL_ROOTS_BY_KIND[kind];
  const restCollections = restCollectionsForKind(kind);
  const detail = await fetchCptEntryBySlug(slug, locale, tags, graphqlRoots, restCollections);
  if (!detail) return null;

  if (kind === "webinar") {
    const webcast = await fetchWebinarWebcastFields(slug, locale, tags);
    if (webcast && isWebcastMeaningful(webcast)) {
      detail.webcast = webcast;
      detail.content = null;
    }
  }

  if (kind === "blog") {
    const faqs = await fetchBlogFaqsBySlug(slug, locale, tags);
    if (faqs && faqs.length > 0) {
      detail.faqs = faqs;
    }
  }

  return detail;
}
