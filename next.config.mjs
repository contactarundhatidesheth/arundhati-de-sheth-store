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
};


export default nextConfig;

// Hot Reload Hook
