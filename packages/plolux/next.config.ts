import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";

console.log(`[NextConfig] DEPLOY_TARGET: ${process.env.DEPLOY_TARGET}, isGithubPages: ${isGithubPages}`);

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  basePath: isGithubPages ? "/forjex/plolux" : undefined,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['.', './src'],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/forjex/plolux" : "",
  },
};

export default nextConfig;
