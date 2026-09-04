import { createClient } from '@/utils/supabase/server';

// Types
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: 'Earring' | 'Ring' | 'Pendant' | 'Necklace' | 'Bracelet' | 'Cuff';
  metal: '18K Gold' | '925 Silver' | '14K Gold' | 'Multi-Metal';
  collection: 'EPHEMERALS' | 'PERENNIALS - Gold' | 'PERENNIALS - Silver';
  tags: string[];
  images: string[];
  specs: {
    gold?: string;
    silver?: string;
    gemstones?: string;
    dimensions?: string;
    purity?: string;
    weight?: string;
  };
  isNew?: boolean;
  isBespoke?: boolean;
  isPriceOnRequest?: boolean;
  inStock: boolean;
  sequence?: number;
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

export interface Database {
  products: Product[];
  catalogues: Catalogue[];
  blogs: Blog[];
  testimonials: Testimonial[];
  timelineEvents: TimelineEvent[];
  analytics: AnalyticsData;
}

export async function readDB(): Promise<Database> {
  const supabase = createClient();
  
  const [
    { data: products },
    { data: catalogues },
    { data: blogs },
    { data: testimonials },
    { data: timelineEvents }
  ] = await Promise.all([
    supabase.from('products').select('*').order('sequence', { ascending: true }),
    supabase.from('catalogues').select('*').order('sequence', { ascending: true }),
    supabase.from('blogs').select('*').order('sequence', { ascending: true }),
    supabase.from('testimonials').select('*').order('sequence', { ascending: true }),
    supabase.from('timeline_events').select('*').order('sequence', { ascending: true })
  ]);

  return {
    products: (products || []).map(p => ({
      ...p,
      compareAtPrice: p.compare_at_price,
      isNew: p.is_new,
      isBespoke: p.is_bespoke,
      isPriceOnRequest: p.is_price_on_request,
      inStock: p.in_stock
    })),
    catalogues: catalogues || [],
    blogs: blogs || [],
    testimonials: testimonials || [],
    timelineEvents: timelineEvents || [],
    analytics: {
      visitors: 0,
      whatsappClicks: 0,
      productViews: {},
      dailyVisitors: {},
      referrers: {}
    }
  };
}
