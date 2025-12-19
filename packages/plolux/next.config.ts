import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  basePath: "/forjex/plolux",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
