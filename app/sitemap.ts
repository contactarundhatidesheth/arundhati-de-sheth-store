import { MetadataRoute } from 'next';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
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

  let products = PRODUCTS;
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from('products').select('*');
    if (data && data.length > 0) {
      products = data.filter((p: any) => !(p.tags || []).includes('_HIDDEN'));
    }
  } catch (err) {
    console.error('Sitemap Supabase error:', err);
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
