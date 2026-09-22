import { createClient } from '@/utils/supabase/server';

// Types
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  metal: string;
  collection: string;
  tags: string[];
  images: string[];
  specs: {
    gold?: string;
    silver?: string;
    gemstones?: string;
    dimensions?: string;
    purity?: string;
    weight?: string;
    careInstructions?: string;
    customSpecs?: string;
  };
  isNew?: boolean;
  isBespoke?: boolean;
  isPriceOnRequest?: boolean;
  inStock: boolean;
  sequence?: number;
  isActive?: boolean;
}

export interface Catalogue {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  year: string;
  featured: boolean;
  sequence?: number;
}

export interface Blog {
  id: string;
  publication: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link?: string;
  sequence?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  image: string;
  sequence?: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  images: string[];
  link?: string;
  sequence?: number;
}

export interface AnalyticsData {
  visitors: number;
  whatsappClicks: number;
  productViews: Record<string, number>;
  dailyVisitors: Record<string, number>;
  referrers: Record<string, number>;
}

export interface PageSection {
  id: string; // e.g. "press-hero", "press-quote", "press-media"
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  link?: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  video_id: string;
  sequence?: number;
}

export interface SeenOnFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image1: string;
  image2: string;
  link?: string;
  sequence?: number;
}

export interface Database {
  products: Product[];
  catalogues: Catalogue[];
  blogs: Blog[];
  testimonials: Testimonial[];
  timelineEvents: TimelineEvent[];
  pageSections: PageSection[];
  youtubeVideos: YoutubeVideo[];
  seenOnFeatures: SeenOnFeature[];
  analytics: AnalyticsData;
}

export async function readDB(): Promise<Database> {
  const supabase = createClient();

  const [
    { data: products },
    { data: catalogues },
    { data: blogs },
    { data: testimonials },
    { data: timelineEvents },
    { data: pageSections },
    { data: youtubeVideos },
    { data: seenOnFeatures }
  ] = await Promise.all([
    supabase.from('products').select('*').order('sequence', { ascending: false }),
    supabase.from('catalogues').select('*').order('sequence', { ascending: false }),
    supabase.from('blogs').select('*').order('sequence', { ascending: false }),
    supabase.from('testimonials').select('*').order('sequence', { ascending: false }),
    supabase.from('timeline_events').select('*').order('sequence', { ascending: false }),
    supabase.from('page_sections').select('*'),
    supabase.from('youtube_videos').select('*').order('sequence', { ascending: false }),
    supabase.from('seen_on_features').select('*').order('sequence', { ascending: false })
  ]);

  return {
    products: (products || []).map(p => ({
      ...p,
      compareAtPrice: p.compare_at_price,
      isNew: p.is_new,
      isBespoke: p.is_bespoke,
      isPriceOnRequest: p.is_price_on_request,
      inStock: p.in_stock,
      isActive: !(p.tags || []).includes('_HIDDEN')
    })),
    catalogues: catalogues || [],
    blogs: (blogs || []).map(b => {
      let excerpt = b.excerpt || '';
      let link = b.link || '';
      if (excerpt.includes('|||')) {
        const parts = excerpt.split('|||');
        link = parts.pop() || '';
        excerpt = parts.join('|||');
      }

      let image = b.image || '';
      if (image === 'null' || image === 'undefined') image = '';
      if (image.startsWith('[') && image.endsWith(']')) {
        try {
          const parsed = JSON.parse(image);
          if (Array.isArray(parsed)) image = parsed[0] || '';
        } catch (e) { }
      }
      if (image.includes(',')) {
        image = image.split(',')[0].trim();
      }

      return { ...b, excerpt, link, image };
    }),
    testimonials: testimonials || [],
    timelineEvents: timelineEvents || [],
    pageSections: pageSections || [],
    youtubeVideos: youtubeVideos || [],
    seenOnFeatures: seenOnFeatures || [],
    analytics: {
      visitors: 0,
      whatsappClicks: 0,
      productViews: {},
      dailyVisitors: {},
      referrers: {}
    }
  };
}
