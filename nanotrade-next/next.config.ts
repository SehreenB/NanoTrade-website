import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/NanoTrade-website', // This tells Next.js where the site lives
  images: {
    unoptimized: true,
  },
};

export default nextConfig;