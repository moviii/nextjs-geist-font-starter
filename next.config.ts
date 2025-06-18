import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unpkg.com',
        pathname: '/leaflet@1.7.1/dist/images/**',
      },
      {
        protocol: 'https',
        hostname: '{s}.tile.openstreetmap.org',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

export default nextConfig
