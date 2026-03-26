"use client";

import { useEffect, useMemo, useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon, ChevronRightIcon } from "@/components/atoms/Icon";

/** Default careers board — jobs are managed in HireHive; link listings here from CMS. */
export const HIREHIVE_CAREERS_URL = "https://softco.hirehive.com/";

export interface OpenRoleJob {
  /** Role title (e.g. "Automation Engineer"). */
  title: string;
  /** Location value shown after "Location:" (e.g. "Italy"). */
  location: string;
  /** Department value shown after "Department:" (e.g. "Cloud & IT"). */
  department: string;
  /** Teaser paragraph on the card. */
  excerpt: string;
  /** Destination for "READ MORE" — typically a specific role URL on HireHive. */
  readMoreHref: string;
}

export interface OpenRolesSectionProps {
  /** Eyebrow (e.g. "OPEN ROLES"). */
  overline: string;
  /** First line of the main headline (dark navy on blue). */
  headingLine1: string;
  /** Second line (white). */
  headingLine2: string;
  /** Placeholder / label for location filter when "all". */
  locationFilterLabel?: string;
  /** Placeholder / label for department filter when "all". */
  departmentFilterLabel?: string;
  /**
   * Job cards from CMS (optional if `hireHiveLive` is true).
   * Each `readMoreHref` should point at the listing on HireHive when using manual entries.
   */
  jobs?: OpenRoleJob[];
  /**
   * Load published roles from HireHive’s **public** Jobs API v2 (no API key).
   * Proxied via `/api/hirehive/jobs`. See `src/lib/hirehive-public-api.ts`.
   */
  hireHiveLive?: boolean;
  /** Primary CTA — defaults to SoftCo HireHive careers board. */
  viewAllHref?: string;
  /** CTA button label. */
  viewAllLabel?: string;
}

/** HireHive / CMS use this when location or category is missing. */
const FILTER_PLACEHOLDER = "—";

const selectBaseClass =
  // Closed control: white label on blue. Options must set their own colors — inherited
  // `text-white` makes native dropdown lists white-on-white on Windows/Chrome.
  "open-roles-filter-select w-full cursor-pointer appearance-none rounded-lg border border-white/25 bg-white/15 py-3.5 pl-4 pr-11 font-body text-[15px] leading-snug text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/40 tablet-down:text-[16px]";

/** Full-width light rule on `brand-blue` with vertical ticks at left, centre, and right (same as MatchingChallengeFormSection). */
function TagRuleOnBlue() {
  const tickColor = "bg-white/[0.22]";
  return (
    <div className={`relative mt-3 h-px w-full ${tickColor}`} aria-hidden>
      <span
        className={`pointer-events-none absolute left-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${tickColor}`}
      />
      <span
        className={`pointer-events-none absolute left-1/2 top-1/2 block h-[10px] w-px -translate-x-1/2 -translate-y-1/2 ${tickColor}`}
      />
      <span
        className={`pointer-events-none absolute right-0 top-1/2 block h-[10px] w-px -translate-y-1/2 ${tickColor}`}
      />
    </div>
  );
}

export function OpenRolesSection({
  overline,
  headingLine1,
  headingLine2,
  locationFilterLabel = "- All locations -",
  departmentFilterLabel = "- All departments -",
  jobs: jobsProp = [],
  hireHiveLive = false,
  viewAllHref = HIREHIVE_CAREERS_URL,
  viewAllLabel = "VIEW ALL OPEN ROLES",
}: OpenRolesSectionProps) {
  const [locationKey, setLocationKey] = useState<string>("all");
  const [departmentKey, setDepartmentKey] = useState<string>("all");
  const [liveJobs, setLiveJobs] = useState<OpenRoleJob[] | null>(null);
  const [loadingHive, setLoadingHive] = useState(false);
  const [hiveError, setHiveError] = useState<string | null>(null);

  useEffect(() => {
    if (!hireHiveLive) return;
    let cancelled = false;
    setLoadingHive(true);
    setHiveError(null);
    (async () => {
      try {
        const res = await fetch("/api/hirehive/jobs?page=1&page_size=100");
        const data = (await res.json()) as {
          jobs?: OpenRoleJob[];
          error?: string;
          detail?: string;
        };
        if (!res.ok) {
          throw new Error(data.detail || data.error || `Request failed (${res.status})`);
        }
        if (!cancelled) {
          setLiveJobs(Array.isArray(data.jobs) ? data.jobs : []);
        }
      } catch (e) {
        if (!cancelled) {
          setHiveError(e instanceof Error ? e.message : "Could not load roles.");
          setLiveJobs([]);
        }
      } finally {
        if (!cancelled) setLoadingHive(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [hireHiveLive]);

  const jobs = useMemo(() => {
    return hireHiveLive ? (liveJobs ?? []) : jobsProp;
  }, [hireHiveLive, liveJobs, jobsProp]);

  const locations = useMemo(() => {
    const set = new Set(
      jobs
        .map((j) => j.location.trim())
        .filter((v) => v && v !== FILTER_PLACEHOLDER),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const departments = useMemo(() => {
    const set = new Set(
      jobs
        .map((j) => j.department.trim())
        .filter((v) => v && v !== FILTER_PLACEHOLDER),
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const loc = j.location.trim();
      const dep = j.department.trim();
      const locOk = locationKey === "all" || loc === locationKey;
      const depOk = departmentKey === "all" || dep === departmentKey;
      return locOk && depOk;
    });
  }, [jobs, locationKey, departmentKey]);

  return (
    <section className="w-full bg-brand-blue">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 tablet-down:px-6 tablet-down:py-24">
        {/* Full-width tag — same pattern as other brand-blue sections */}
        <div className="text-left">
          <Overline className="text-brand-orange">{overline}</Overline>
          <TagRuleOnBlue />
        </div>

        <Heading
          level={2}
          className="mx-auto mt-10 max-w-[min(100%,48rem)] text-center font-heading font-semibold text-[40px] leading-[1.1] tracking-[0] text-balance tablet-down:mt-12 tablet-down:text-[56px] tablet-down:leading-[1.08]"
        >
          <span className="block !text-brand-dark">{headingLine1}</span>
          <span className="mt-2 block !text-white tablet-down:mt-3">{headingLine2}</span>
        </Heading>

        {/* Filters */}
        <div className="mx-auto mt-10 grid max-w-[920px] grid-cols-1 gap-4 tablet-down:mt-12 tablet-down:grid-cols-2 tablet-down:gap-5">
          <label className="relative block text-left">
            <span className="sr-only">Filter by location</span>
            <select
              value={locationKey}
              onChange={(e) => setLocationKey(e.target.value)}
              className={selectBaseClass}
            >
              <option value="all">{locationFilterLabel}</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size="sm"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/90"
            />
          </label>
          <label className="relative block text-left">
            <span className="sr-only">Filter by department</span>
            <select
              value={departmentKey}
              onChange={(e) => setDepartmentKey(e.target.value)}
              className={selectBaseClass}
            >
              <option value="all">{departmentFilterLabel}</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
            <ChevronDownIcon
              size="sm"
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/90"
            />
          </label>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 flex max-w-[960px] flex-col gap-5 tablet-down:mt-12 tablet-down:gap-6">
          {hireHiveLive && loadingHive ? (
            <p className="text-center font-body text-[16px] text-white/90">
              Loading open roles…
            </p>
          ) : hireHiveLive && hiveError ? (
            <p className="text-center font-body text-[16px] text-white/90">
              {hiveError} You can still browse all roles on our careers board.
            </p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center font-body text-[16px] text-white/85">
              {jobs.length === 0
                ? "No open roles are listed at the moment. Check back soon or view all roles on our careers board."
                : "No roles match these filters. Try another location or department."}
            </p>
          ) : (
            filteredJobs.map((job, index) => (
              <article
                key={`${job.title}-${job.location}-${index}`}
                className="rounded-xl bg-white p-6 shadow-md tablet-down:p-8"
              >
                <div className="flex flex-col gap-8 tablet-down:flex-row tablet-down:gap-10 tablet-down:items-start">
                  <div className="shrink-0 tablet-down:w-[min(100%,38%)]">
                    <Heading
                      level={4}
                      className="text-left !text-brand-dark tablet-down:text-[26px] tablet-down:leading-tight"
                    >
                      {job.title}
                    </Heading>
                    <p className="mt-3 font-body text-[14px] leading-relaxed tablet-down:mt-4 tablet-down:text-[15px]">
                      <span className="text-brand-dark-60">Location: </span>
                      <span className="font-medium text-brand-blue">
                        {job.location}
                      </span>
                    </p>
                    <p className="mt-1 font-body text-[14px] leading-relaxed tablet-down:text-[15px]">
                      <span className="text-brand-dark-60">Department: </span>
                      <span className="font-medium text-brand-blue">
                        {job.department}
                      </span>
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-6 tablet-down:gap-8">
                    <p className="font-body text-[15px] font-normal leading-[1.6] text-brand-dark-60 tablet-down:text-[16px]">
                      {job.excerpt}
                    </p>
                    <div className="flex justify-end">
                      <a
                        href={job.readMoreHref || HIREHIVE_CAREERS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border-b-2 border-brand-orange pb-1 font-body text-[13px] font-bold uppercase tracking-wide text-brand-dark transition-colors hover:text-brand-blue tablet-down:text-[14px]"
                      >
                        READ MORE
                        <span className="inline-flex text-brand-orange transition-transform group-hover:translate-x-0.5">
                          <ChevronRightIcon size="sm" strokeWidth={3} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-12 flex justify-center tablet-down:mt-14">
          <Button
            variant="orange"
            href={viewAllHref}
            external
            iconAfter={<ChevronRightIcon size="sm" />}
          >
            {viewAllLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
