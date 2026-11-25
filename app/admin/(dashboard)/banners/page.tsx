import React from 'react';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import { saveBannerSection } from '@/app/admin/actions';

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
    label: 'About Us Hero Video / Image',
    page: 'About Us (/about)',
    description: 'Background hero video or image for the About Us page.',
    defaultMedia: '/videos/about-video.mp4',
    supportsVideo: true,
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
    label: 'Explore Page - Ephemerals Card Image',
    page: 'Shop Explore (/category/all-products)',
    description: 'The featured card preview image for Ephemerals on the Explore collection selection page.',
    defaultMedia: '/images/Ephemerals%20front%20image%20.png',
  },
  {
    id: 'banner_shop_ephemerals',
    label: 'Shop - Ephemerals Hero Banner',
    page: 'Shop Ephemerals (/category/all-products?collection=EPHEMERALS)',
    description: 'Hero cover banner displayed at the top when viewing the Ephemerals collection products.',
    defaultMedia: '/images/Ephemerals%20.png',
  },
  {
    id: 'card_shop_perennials',
    label: 'Explore Page - Perennials Card Image',
    page: 'Shop Explore (/category/all-products)',
    description: 'The featured card preview image for Perennials on the Explore collection selection page.',
    defaultMedia: '/images/Perennials%20front%20image%20.png',
  },
  {
    id: 'banner_shop_perennials',
    label: 'Shop - Perennials Hero Banner',
    page: 'Shop Perennials (/category/all-products?collection=PERENNIALS)',
    description: 'Hero cover banner displayed at the top when viewing the Perennials collection products.',
    defaultMedia: '/images/Perennials%20.png',
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
            <div
              key={banner.id}
              style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #eaeaea',
                padding: '28px 32px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', fontWeight: 600 }}>
                    {banner.page}
                  </span>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '4px 0 6px' }}>
                    {banner.label}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#666', margin: 0 }}>
                    {banner.description}
                  </p>
                </div>
              </div>

              {/* Preview of current media */}
              <div style={{ marginBottom: '20px', padding: '12px', background: '#fafafa', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '0.8rem', color: '#888', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Current Active Source:
                </p>
                <div style={{ fontSize: '0.85rem', color: '#111', wordBreak: 'break-all' }}>
                  {currentImage || currentVideo ? (
                    <div>
                      {currentImage && <div><strong>Image:</strong> {currentImage}</div>}
                      {currentVideo && <div><strong>Video URL:</strong> {currentVideo}</div>}
                    </div>
                  ) : (
                    <span style={{ color: '#999', fontStyle: 'italic' }}>Default: {banner.defaultMedia}</span>
                  )}
                </div>
              </div>

              <form action={saveBannerSection} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input type="hidden" name="id" value={banner.id} />
                <input type="hidden" name="title" value={banner.label} />

                <div style={{ display: 'grid', gridTemplateColumns: banner.supportsVideo ? '1fr 1fr' : '1fr', gap: '16px' }}>
                  {/* Image URL or upload */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                      Image URL (or upload below)
                    </label>
                    <input
                      type="text"
                      name="image"
                      defaultValue={currentImage}
                      placeholder={banner.defaultMedia}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '0.9rem',
                      }}
                    />
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '4px' }}>
                        Or upload new image file:
                      </label>
                      <input
                        type="file"
                        name="imageFile"
                        accept="image/*"
                        style={{ fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  {/* Video URL if supported */}
                  {banner.supportsVideo && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
                        Video URL (.mp4 / stream URL)
                      </label>
                      <input
                        type="text"
                        name="link"
                        defaultValue={currentVideo}
                        placeholder={banner.defaultMedia.endsWith('.mp4') ? banner.defaultMedia : 'https://.../video.mp4'}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          fontSize: '0.9rem',
                        }}
                      />
                      <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '6px', lineHeight: '1.4' }}>
                        If provided, this video will play in the hero background.
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button
                    type="submit"
                    style={{
                      background: '#000',
                      color: '#fff',
                      padding: '10px 24px',
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                    }}
                  >
                    Save Banner
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
