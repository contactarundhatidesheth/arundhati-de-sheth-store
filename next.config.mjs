/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cdn/shop/files/:path*',
        destination: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/:path*',
      },
      {
        source: '/cdn/shop/:path*',
        destination: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/category/rings',
        destination: '/category/all-products?tab=RINGS',
        permanent: false,
      },
      {
        source: '/category/earrings',
        destination: '/category/all-products?tab=EARRINGS',
        permanent: false,
      },
      {
        source: '/category/necklaces',
        destination: '/category/all-products?tab=NECKLACES',
        permanent: false,
      },
      {
        source: '/category/pendants',
        destination: '/category/all-products?tab=PENDANTS',
        permanent: false,
      },
      {
        source: '/category/bracelets',
        destination: '/category/all-products?tab=BRACELETS',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};


export default nextConfig;

// Hot Reload Hook
