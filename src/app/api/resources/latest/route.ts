import { NextResponse } from "next/server";
import { fetchLatestMergedResources } from "@/lib/resources-hub";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("locale") ?? DEFAULT_LOCALE;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  try {
    const items = await fetchLatestMergedResources(locale, 4);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
