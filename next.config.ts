import type { NextConfig } from "next";

/**
 * Hostnames allowed for `next/image` when loading WordPress uploads.
 * Derived from the same env vars as the GraphQL/REST clients so production
 * CMS changes do not require editing this file.
 */
function wordpressMediaHostnames(): string[] {
  const fromEnv = [
    process.env.WORDPRESS_GRAPHQL_URL,
    process.env.WORDPRESS_REST_URL,
  ];
  const hostnames = new Set<string>();
  for (const raw of fromEnv) {
    if (!raw?.trim()) continue;
    try {
      const { hostname } = new URL(raw.trim());
      if (hostname) hostnames.add(hostname);
    } catch {
      /* ignore invalid URLs */
    }
  }
  hostnames.add("kaosk10.sg-host.com");
  return [...hostnames];
}

function wordpressMediaRemotePatterns() {
  const pathname = "/wp-content/uploads/**" as const;
  return wordpressMediaHostnames().flatMap((hostname) => [
    { protocol: "https" as const, hostname, pathname },
    { protocol: "http" as const, hostname, pathname },
  ]);
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: wordpressMediaRemotePatterns(),
  },
};

export default nextConfig;
