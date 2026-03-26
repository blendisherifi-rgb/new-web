/**
 * HireHive public Jobs API v2 — published jobs for your careers subdomain.
 * @see https://docs.hirehive.com/website-integration/jobs-api/list.md
 * No API key required (`security: []` in OpenAPI).
 */

export const DEFAULT_HIREHIVE_CAREERS_ORIGIN = "https://softco.hirehive.com";

/** Shape returned by GET /api/v2/jobs (subset). */
export interface HireHiveJobApiV2 {
  id?: string | number;
  title?: string | null;
  location?: string | null;
  country?: { name?: string | null; code?: string | null } | null;
  description?: { html?: string | null; text?: string | null } | null;
  category?: { id?: number; name?: string | null } | null;
  type?: { type?: string | null; name?: string | null } | null;
  hosted_url?: string | null;
}

export interface HireHiveJobsPagedResponse {
  items?: HireHiveJobApiV2[] | null;
  meta?: {
    page?: number;
    page_size?: number;
    total_items?: number;
    total_pages?: number;
    has_next_page?: boolean;
  };
}

function excerptFromDescription(job: HireHiveJobApiV2, maxLen = 280): string {
  const raw = job.description?.text?.trim() || "";
  if (!raw) return "";
  const oneLine = raw.replace(/\s+/g, " ");
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen - 1).trim()}…`;
}

function locationLabel(job: HireHiveJobApiV2): string {
  const loc = job.location?.trim();
  const country = job.country?.name?.trim();
  if (loc && country) return `${loc}, ${country}`;
  if (loc) return loc;
  if (country) return country;
  return "—";
}

/**
 * Map HireHive job payload → Open Roles card fields.
 * Department uses category name when present.
 */
export function mapHireHiveJobToOpenRole(
  job: HireHiveJobApiV2,
  careersOrigin: string
): {
  title: string;
  location: string;
  department: string;
  excerpt: string;
  readMoreHref: string;
} {
  const origin = careersOrigin.replace(/\/$/, "");
  const title = job.title?.trim() || "Role";
  const readMoreHref =
    job.hosted_url?.trim() || `${origin}/`;

  return {
    title,
    location: locationLabel(job),
    department:
      job.category?.name?.trim() ||
      job.type?.name?.trim() ||
      "—",
    excerpt: excerptFromDescription(job) || "View full description and apply on our careers site.",
    readMoreHref,
  };
}

export function mapHireHiveJobsResponse(
  data: HireHiveJobsPagedResponse,
  careersOrigin: string
) {
  const items = data.items ?? [];
  return items.map((j) => mapHireHiveJobToOpenRole(j, careersOrigin));
}
