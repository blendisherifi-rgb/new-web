import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kaosk10.sg-host.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
