import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Only use the subfolder path when building for production (GitHub)
  basePath: isProd ? '/NanoTrade-website' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;