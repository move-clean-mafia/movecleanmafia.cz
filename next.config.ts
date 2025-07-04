import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure static files are served properly
  trailingSlash: false,

  // Configure images for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Configure static file serving for locale files
  async headers() {
    return [
      {
        source: '/locales/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  experimental: {
    optimizePackageImports: ['react-i18next'],
  },
};

export default nextConfig;
