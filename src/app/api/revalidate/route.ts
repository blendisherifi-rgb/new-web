import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { clearRedirectCache } from "@/lib/redirects";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidation-secret");
  const expected = process.env.REVALIDATION_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { slug, locale, type } = body as {
      slug?: string;
      locale?: string;
      type?: string;
    };

    if (type === "redirects") {
      clearRedirectCache();
      revalidateTag("redirects", "max");
      return NextResponse.json({ revalidated: true, type: "redirects" });
    }

    if (slug && locale) {
      revalidateTag(`page-${locale}-${slug}`, "max");
    } else {
      revalidateTag("wordpress", "max");
      revalidateTag("pages", "max");
      revalidateTag("menus", "max");
      revalidateTag("globals", "max");
      revalidateTag("redirects", "max");
      clearRedirectCache();
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
