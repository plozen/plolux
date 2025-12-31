import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";

console.log(`[NextConfig] DEPLOY_TARGET: ${process.env.DEPLOY_TARGET}, isGithubPages: ${isGithubPages}`);

const nextConfig: NextConfig = {
  // output: "export",
  reactCompiler: true,
  basePath: isGithubPages ? "/forjex/plozen" : undefined,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: ['./src/styles'], 
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/forjex/plozen" : "",
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
