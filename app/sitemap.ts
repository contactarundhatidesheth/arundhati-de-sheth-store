import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arundhatidesheth.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/category/all-products',
    '/category/ephemerals',
    '/category/perennials',
    '/collections',
    '/timeline',
    '/shop-the-look',
    '/press',
    '/faq',
    '/shipping',
    '/privacy',
    '/terms',
    '/contact',
    '/cart',
    '/track',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${baseUrl}/product/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
