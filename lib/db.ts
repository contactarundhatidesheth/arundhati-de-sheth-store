import fs from 'fs';
import path from 'path';

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

const DB_PATH = path.join(process.cwd(), '.data', 'db.json');

// Initialize database if it doesn't exist
export function initDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const initialData: Database = {
      products: [], // We will populate this from products.ts
      timelineEvents: [], // We will populate this from timeline.ts initially
      analytics: {
        visitors: 0,
        whatsappClicks: 0,
        productViews: {},
        dailyVisitors: {},
        referrers: {}
      },
      catalogues: [
        {
          id: 'decodent',
          title: 'Decodent',
          description: 'A collection of fine and high-end jewels with Art Deco design influences, for the discerning collector.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?v=1708934384&width=800',
          link: 'https://drive.google.com/file/d/11mbSmNos-6wNh3VhEhAJYaYkuyOvu3Fd/view?usp=sharing',
          year: '2024',
          featured: true,
        },
        {
          id: 'shadow-games-2025',
          title: 'Shadow Games 2025',
          description: 'A collection of fine jewels that could be the perfect accompaniment on your sunny escapade... and a perfect ally for life.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Untitled_design_15.png?v=1708934384&width=800',
          link: 'https://drive.google.com/file/d/1Tuty-w6Oye0wA9_SaNZu3kL-v0YHmzFq/view?usp=sharing',
          year: '2025',
          featured: false,
        },
        {
          id: 'prismatic',
          title: 'Prismatic',
          description: 'In my 7th edition of my JewelArt show, I\'d like to draw your attention to the beauty of fine, design-led jewellery with coloured gem stones as the hero.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=800',
          link: 'https://drive.google.com/file/d/16UfbZE84ItGHGBYKy9bddDlT3JCcLZH9/view?usp=sharing',
          year: '2025',
          featured: true,
        },
        {
          id: 'gildedage',
          title: 'Gilded Age',
          description: 'Experience the best of jewels that transcend trends, borders and conventions.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/e-invite-Final.jpg?v=1708934384&width=800',
          link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Gildedage_without_price_compressed.pdf?v=1708935823',
          year: '2024',
          featured: false,
        },
        {
          id: 'call-for-cocktails',
          title: 'Call for Cocktails',
          description: 'A capsule of modern and fresh fine jewels to wear during the holidays and beyond.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1708934384&width=800',
          link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Call_for_the_cocktails_compressed.pdf?v=1709730900',
          year: '2023',
          featured: false,
        },
        {
          id: 'lightness-of-being',
          title: 'Lightness Of Being',
          description: 'A design-led fine jewellery show featuring pieces that embody elegance and sophistication.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=800',
          link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Lightness_of_Being_book_Price.pdf?v=1708935547',
          year: '2024',
          featured: true,
        },
        {
          id: 'shadow-games',
          title: 'Shadow Games',
          description: 'An eclectic mix of fine jewellery - to be worn often.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/6ef918_dda50d76e89e497694803b84c6141c25_mv2.webp?v=1708934384&width=800',
          link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Shadow_games_compressed.pdf?v=1709642153',
          year: '2023',
          featured: false,
        },
        {
          id: 'wave-after-wave',
          title: 'Wave After Wave',
          description: 'Wave After Wave is a show of 200 jewels, hand-picked by me from all over India featuring a myriad of contemporary styles and genres.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_154631.png?v=1708934384&width=800',
          link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Wave_After_Wave_ADS_Price-compressed_compressed_1.pdf?v=1708935358',
          year: '2025',
          featured: true,
        }
      ],
      blogs: [
        {
          id: '1',
          publication: 'Vogue India',
          date: 'October 2023',
          title: 'The New Era of Bespoke Jewellery',
          excerpt: 'Arundhati De-Sheth redefines modern luxury with her architectural approach to fine jewellery.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/WhatsAppImage2026-03-24at12.55.32PM.jpg?v=1774337386&width=800'
        },
        {
          id: '2',
          publication: "Harper's Bazaar",
          date: 'August 2023',
          title: 'Gilded Gems: A Modern Romance',
          excerpt: 'Exploring the intricate craftsmanship behind the latest Perennials collection.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/19_62d39958-6d5e-4d16-94a2-7fd33f4d9bf0.png?v=1784800252&width=800'
        },
        {
          id: '3',
          publication: 'Elle',
          date: 'May 2023',
          title: 'The Art of the Ephemeral',
          excerpt: 'How garden beads and natural motifs are shaping the future of adornment.',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=800'
        }
      ],
      testimonials: [
        {
          id: '1',
          quote: 'The geometric symmetry and light weight of these designs make them my immediate choice every morning.',
          author: 'Sophia L',
          location: 'Mumbai',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=400',
        },
        {
          id: '2',
          quote: 'Unparalleled refinement and lasting durability that truly elevates any outfit.',
          author: 'Marcus V',
          location: 'London',
          image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?v=1708934384&width=400',
        }
      ]
    };
    
    // Import PRODUCTS manually to seed
    const productsData = require('./data/products').PRODUCTS;
    initialData.products = productsData;
    
    // Import TIMELINE manually to seed
    const timelineData = require('./data/timeline').TIMELINE_EVENTS;
    initialData.timelineEvents = timelineData;
    
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

export function readDB(): Database {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  const db = JSON.parse(data);
  let migrated = false;

  // Auto-migrate: Add timelineEvents if missing
  if (!db.timelineEvents) {
    try {
      const timelineData = require('./data/timeline').TIMELINE_EVENTS;
      db.timelineEvents = timelineData.map((t: any, i: number) => ({...t, sequence: i + 1}));
      migrated = true;
    } catch (e) {
      db.timelineEvents = [];
    }
  }

  // Auto-migrate: Add analytics if missing
  if (!db.analytics) {
    db.analytics = {
      visitors: 0,
      whatsappClicks: 0,
      productViews: {},
      dailyVisitors: {},
      referrers: {}
    };
    migrated = true;
  }

  // Auto-migrate: Ensure sequence field exists on all items
  ['products', 'catalogues', 'blogs', 'testimonials', 'timelineEvents'].forEach(col => {
    if (db[col]) {
      db[col].forEach((item: any) => {
        if (item.sequence === undefined) {
          item.sequence = 999;
          migrated = true;
        }
      });
    }
  });

  if (migrated) {
    writeDB(db);
  }

  // Final sort to guarantee items are always returned ordered by sequence ascending
  ['products', 'catalogues', 'blogs', 'testimonials', 'timelineEvents'].forEach(col => {
    if (db[col]) {
      db[col].sort((a: any, b: any) => (a.sequence || 999) - (b.sequence || 999));
    }
  });

  return db;
}

export function writeDB(data: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
