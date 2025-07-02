import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Ensure static files are served properly
  trailingSlash: false,

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
