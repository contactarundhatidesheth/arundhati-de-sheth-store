/**
 * Utilities for optimizing images from Supabase Storage, Shopify CDN, and local assets.
 */

interface OptimizeOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'origin';
}

/**
 * Returns an optimized image URL.
 * - Converts Supabase storage URLs to use /render/image/public/ for WebP format and width-specific resizing.
 * - Adds width and WebP format query parameters to Shopify CDN images.
 * - Returns original URL for other sources or local paths.
 */
export function getOptimizedImageUrl(
  url: string | null | undefined,
  options: number | OptimizeOptions = 800
): string {
  if (!url || typeof url !== 'string') return '';

  const opts: OptimizeOptions = typeof options === 'number' 
    ? { width: options, quality: 80, format: 'webp' }
    : { width: options.width || 800, quality: options.quality || 80, format: options.format || 'webp' };

  const { width = 800, quality = 80, format = 'webp' } = opts;

  // 1. Supabase Storage: Use edge-rendered image transformation
  if (url.includes('.supabase.co/storage/v1/object/public/')) {
    const cleanUrl = url.split('?')[0];
    const renderUrl = cleanUrl.replace(
      '/storage/v1/object/public/',
      '/storage/v1/render/image/public/'
    );
    return `${renderUrl}?width=${width}&quality=${quality}&format=${format}`;
  }

  // 2. Already transformed Supabase URL: adjust parameters
  if (url.includes('.supabase.co/storage/v1/render/image/public/')) {
    const cleanUrl = url.split('?')[0];
    return `${cleanUrl}?width=${width}&quality=${quality}&format=${format}`;
  }

  // 3. Shopify CDN
  if (url.includes('cdn.shopify.com')) {
    // Strip existing width and format parameters
    const cleanUrl = url.replace(/([?&])(width|format)=[^&]*/g, '').replace(/&&+/g, '&').replace(/\?&/, '?').replace(/[?&]$/, '');
    const separator = cleanUrl.includes('?') ? '&' : '?';
    return `${cleanUrl}${separator}width=${width}&format=${format}`;
  }

  return url;
}
