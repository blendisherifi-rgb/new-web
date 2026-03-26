import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_HIREHIVE_CAREERS_ORIGIN,
  mapHireHiveJobsResponse,
  type HireHiveJobsPagedResponse,
} from "@/lib/hirehive-public-api";

/**
 * Proxies HireHive public Jobs API v2 so the browser never needs CORS to the careers domain,
 * and so we can swap origin via env without client rebuild if needed.
 */
export async function GET(request: NextRequest) {
  const origin =
    process.env.HIREHIVE_CAREERS_ORIGIN?.replace(/\/$/, "") ||
    DEFAULT_HIREHIVE_CAREERS_ORIGIN.replace(/\/$/, "");

  const sp = request.nextUrl.searchParams;
  const page = sp.get("page") ?? "1";
  const pageSize = sp.get("page_size") ?? "100";

  const url = new URL(`${origin}/api/v2/jobs`);
  url.searchParams.set("page", page);
  url.searchParams.set("page_size", pageSize);

  const countries = sp.getAll("countries");
  countries.forEach((c) => url.searchParams.append("countries", c));
  const categoryIds = sp.getAll("category_ids");
  categoryIds.forEach((id) => url.searchParams.append("category_ids", id));

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "HireHive API error", status: res.status, detail: text.slice(0, 500) },
        { status: res.status >= 500 ? 502 : res.status }
      );
    }

    const data = (await res.json()) as HireHiveJobsPagedResponse;
    const jobs = mapHireHiveJobsResponse(data, origin);

    return NextResponse.json({
      jobs,
      meta: data.meta ?? null,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to reach HireHive", detail: message },
      { status: 502 }
    );
  }
}
