import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/gif-explorer' : undefined,
  assetPrefix: isProd ? '/gif-explorer/' : undefined,
};

export default nextConfig;
