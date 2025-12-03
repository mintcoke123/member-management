import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages under https://username.github.io/member-management/
  basePath: "/member-management",
  assetPrefix: "/member-management/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
