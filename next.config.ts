import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Production optimizations
  poweredByHeader: false,
  compress: true,

  // Ensure static files are served properly
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  // Production build optimizations
  reactStrictMode: true,
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
    // Production image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Security headers for production
  async headers() {
    return [
      // Security headers
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Static assets - long cache duration
      {
        source: '/locales/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Images and static assets - long cache duration
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Favicon and icons - long cache duration
      {
        source: '/favicon/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // CSS and JS files - long cache duration with revalidation
      {
        source: '/(.*)\\.(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      // Font files - long cache duration
      {
        source: '/(.*)\\.(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Sitemap - moderate cache with revalidation
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Robots.txt - moderate cache with revalidation
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // API routes - no cache for dynamic content
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      // Admin routes - no cache for security
      {
        source: '/admin/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
      // HTML pages - moderate cache with revalidation for dynamic content
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Production optimizations
  experimental: {
    optimizePackageImports: ['react-i18next'],
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Environment-specific configurations
  ...(process.env.NODE_ENV === 'production' && {
    // Production-only optimizations
    output: 'standalone',
  }),
};

export default nextConfig;
