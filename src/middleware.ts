import { NextRequest, NextResponse } from "next/server";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { fetchRedirects, matchRedirect } from "@/lib/redirects";

/** Paths that are NOT locale-prefixed (skip rewrite) */
const ROOT_PATHS = ["/styleguide", "/api"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check redirects first (from Redirection plugin)
  try {
    const redirects = await fetchRedirects();
    const matched = matchRedirect(pathname, redirects);
    if (matched) {
      return NextResponse.redirect(matched.to, matched.statusCode);
    }
  } catch {
    // Continue if redirect fetch fails (e.g. WP not configured)
  }

  // 2. Skip root-level paths (no locale)
  if (ROOT_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // 3. Already has valid locale prefix (/us, /ie, /uk)
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    return NextResponse.next();
  }

  // 4. No locale — treat as US: rewrite / to /us, /about to /us/about
  // Must preserve search (and hash); `new URL("/us/path", origin+path?qs)` drops ?qs.
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
