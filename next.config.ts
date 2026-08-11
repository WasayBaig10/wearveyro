import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: 'mendeez.com',
        pathname: '/cdn/shop/files/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
    ];
  },
};

export default nextConfig;
