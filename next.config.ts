import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'cdn.sanity.io',
      // Add any other domains you might be using for images here
    ],
  },
};

export default nextConfig;
