'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ParallaxSection } from '@/components/ParallaxSection';

const CATEGORIES = [
  {
    title: 'EPHEMERALS',
    subtitle: 'One-off High Jewellery',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/MOLTENNUGGETPENDANT4.jpg?v=1706967224&width=800',
    link: '/collections?collection=EPHEMERALS',
  },
  {
    title: 'PERENNIALS — Gold',
    subtitle: '18K Gold & Natural Diamonds',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/StonesinShapesRing3.2_1.jpg?v=1743743592&width=800',
    link: '/collections?collection=PERENNIALS%20-%20Gold',
  },
  {
    title: 'PERENNIALS — Silver',
    subtitle: '925 Silver & Rock Crystals',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/PASTELGIRANDOLEEARRINGS1_1.jpg?v=1708934384&width=800',
    link: '/collections?collection=PERENNIALS%20-%20Silver',
  },
  {
    title: 'Girandole Earrings',
    subtitle: 'Victorian Inspired Sculptures',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/webshop_change_and_update_pieces_1.png?v=1785909327&width=800',
    link: '/collections?category=earring',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section style={{ padding: 'var(--section-padding)', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
            Collections
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)' }}>
            Explore by aesthetic
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', display: 'block', background: '#1A1A1A', textDecoration: 'none' }}
              className="category-item"
            >
              <ParallaxSection
                imageSrc={cat.image}
                imageAlt={cat.title}
                overlayColor="#1A1A1A"
                overlayOpacity={0.75}
                minHeight="100%"
                parallaxSpeed={0.15}
              >
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', color: '#FAF9F7', zIndex: 2 }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '8px' }}>
                    {cat.subtitle}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: '400', fontFamily: 'var(--font-serif)', color: '#FAF9F7' }}>
                      {cat.title}
                    </h3>
                    <ArrowRight size={16} style={{ opacity: 0.9, transition: 'all 0.3s ease' }} className="arrow-icon" />
                  </div>
                </div>
              </ParallaxSection>
            </Link>
          ))}
        </div>

        <style jsx>{`
          .category-item:hover img {
            transform: scale(1.05);
          }
          .category-item:hover h3 {
            color: var(--accent) !important;
          }
          .category-item:hover .arrow-icon {
            color: var(--accent) !important;
            transform: translateX(4px);
          }
          @media (max-width: 768px) {
            section > div > div:last-child {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
