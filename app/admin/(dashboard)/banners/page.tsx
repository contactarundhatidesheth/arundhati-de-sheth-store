import React from 'react';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import { BannerMediaCard } from './BannerMediaCard';

export const dynamic = 'force-dynamic';

interface BannerConfig {
  id: string;
  label: string;
  page: string;
  description: string;
  defaultMedia: string;
  supportsVideo?: boolean;
}

const BANNERS_CONFIG: BannerConfig[] = [
  {
    id: 'banner_about',
    label: 'About Us - Main Hero Video / Image',
    page: 'About Us (/about)',
    description: 'Full-bleed background hero video or image for the About Us page.',
    defaultMedia: '/videos/about-video.mp4',
    supportsVideo: true,
  },
  {
    id: 'banner_high_jewellery',
    label: 'High Jewellery Hero Image / Video',
    page: 'High Jewellery Lookbooks (/collections)',
    description: 'Hero header image or video displayed on the High Jewellery page.',
    defaultMedia: '/images/High%20Jewellery%20.jpg',
    supportsVideo: true,
  },
  {
    id: 'banner_about_portrait',
    label: 'About Us - Her Story Portrait Image',
    page: 'About Us (/about)',
    description: "Portrait image alongside Arundhati's Story in the top editorial section.",
    defaultMedia: '/images/arundhati-portrait.webp',
  },
  {
    id: 'banner_about_confluence',
    label: 'About Us - Jewellery Confluence Image',
    page: 'About Us (/about)',
    description: 'Wide image displayed in the Jewellery Confluence philosophy section.',
    defaultMedia: '/images/WhatsApp%20Image%202026-08-31%20at%203.11.01%20PM.jpeg',
  },
  {
    id: 'banner_shop_explore',
    label: 'Shop - Explore Hero Banner',
    page: 'Shop Collection Landing (/category/all-products)',
    description: 'Top header image displayed on the main Shop/Explore collection view.',
    defaultMedia: '/images/All%20jewellery%20banner.png',
  },
  {
    id: 'card_shop_ephemerals',
    label: 'Explore Page - Ephemerals Box (Box 1)',
    page: 'Shop Explore (/category/all-products)',
    description: 'The featured card preview image for Ephemerals on the Explore collection selection page.',
    defaultMedia: '/images/Ephemerals%20front%20image%20.png',
  },
  {
    id: 'card_shop_perennials',
    label: 'Explore Page - Perennials Box (Box 2)',
    page: 'Shop Explore (/category/all-products)',
    description: 'The featured card preview image for Perennials on the Explore collection selection page.',
    defaultMedia: '/images/Perennials%20front%20image%20.png',
  },
  {
    id: 'banner_shop_ephemerals',
    label: 'Shop - Ephemerals Hero Banner',
    page: 'Shop Ephemerals (/category/all-products?collection=EPHEMERALS)',
    description: 'Hero cover banner displayed at the top when viewing the Ephemerals collection products.',
    defaultMedia: '/images/Ephemerals%20.png',
  },
  {
    id: 'banner_shop_perennials',
    label: 'Shop - Perennials Hero Banner',
    page: 'Shop Perennials (/category/all-products?collection=PERENNIALS)',
    description: 'Hero cover banner displayed at the top when viewing the Perennials collection products.',
    defaultMedia: '/images/Perennials%20.png',
  },
  {
    id: 'banner_press',
    label: 'Press Page Hero Banner',
    page: 'Press & Editorial (/press)',
    description: 'Top hero banner image on the Press & Editorial features page.',
    defaultMedia: '/pressimages/press-hero.png',
  },
  {
    id: 'banner_contact',
    label: 'Contact Page Hero Banner',
    page: 'Contact (/contact)',
    description: 'Hero image displayed at the top of the Contact Atelier page.',
    defaultMedia: '/images/contact%20picture%20.jpg',
  },
];

export default async function AdminBannersPage() {
  const supabase = getSupabaseAdmin();
  const { data: sections } = await supabase.from('page_sections').select('*');

  const sectionMap = new Map<string, any>();
  (sections || []).forEach((s: any) => {
    sectionMap.set(s.id, s);
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
          Banner Image & Video Management
        </h1>
        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Update hero images and background video URLs for About Us, Shop, High Jewellery, Press, and Contact pages.
          Changes take effect immediately across the live site.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {BANNERS_CONFIG.map((banner) => {
          const current = sectionMap.get(banner.id);
          const currentImage = current?.image || '';
          const currentVideo = current?.link || '';

          return (
            <BannerMediaCard
              key={banner.id}
              banner={banner}
              currentImage={currentImage}
              currentVideo={currentVideo}
            />
          );
        })}
      </div>
    </div>
  );
}
