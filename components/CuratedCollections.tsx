'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';

const TABS = [
  { label: 'EPHEMERALS', value: 'EPHEMERALS' },
  { label: 'PERENNIALS: GOLD', value: 'PERENNIALS - Gold' },
  { label: 'PERENNIALS: SILVER', value: 'PERENNIALS - Silver' },
  { label: 'HIGH JEWELLERY', value: 'HIGH JEWELLERY' },
];

export const CuratedCollections: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const collections = [
    {
      id: 'garden-beads',
      title: 'Garden Beads',
      description: 'Handcrafted beadwork inspired by nature.',
      image: PRODUCTS.find(p => p.collection === 'EPHEMERALS')?.images[0] || 'https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1708934384&width=800',
      link: '/category/garden-beads',
      tag: 'NEW ARRIVALS',
    },
    {
      id: 'silver-water',
      title: 'Silver Water',
      description: 'Fluid designs in premium 925 sterling silver.',
      image: PRODUCTS.find(p => p.collection === 'PERENNIALS - Silver')?.images[0] || 'https://www.arundhatidesheth.com/cdn/shop/files/6ef918_dda50d76e89e497694803b84c6141c25_mv2.webp?v=1708934384&width=800',
      link: '/category/silver-water',
    },
    {
      id: 'gilded-gems',
      title: 'Gilded Gems',
      description: 'Opulent gold pieces for the modern romantic.',
      image: PRODUCTS.find(p => p.collection === 'PERENNIALS - Gold')?.images[0] || 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=800',
      link: '/category/gilded-gems',
    },
    {
      id: 'the-archive',
      title: 'The Archive',
      description: 'Explore our complete collection of bespoke and ready-to-wear pieces.',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/19_62d39958-6d5e-4d16-94a2-7fd33f4d9bf0.png?v=1784800252&width=800',
      link: '/category/all-products',
    },
  ];

  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '80px 0', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Navigation for Categories */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border)' }}>
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                paddingBottom: '16px',
                borderBottom: activeTab === tab.value ? '2px solid var(--accent)' : '2px solid transparent',
                color: activeTab === tab.value ? 'var(--text-main)' : 'var(--text-muted)',
                letterSpacing: '0.1em',
                fontSize: '0.9rem',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textTransform: 'uppercase'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 5-Column Sub-Collections Grid (Dynamic Products) */}
        <div className="pdf-sub-grid">
          {PRODUCTS.filter(p => p.collection === activeTab).slice(0, 5).map((product) => (
            <div className="pdf-sub-item" key={product.id}>
              <Link href={`/product/${product.handle}`} className="sub-image-container">
                <img src={product.images[0]} alt={product.title} />
              </Link>
              <div className="sub-title">{product.title}</div>
            </div>
          ))}
          
          {/* Fallback if a category has no products in DB yet */}
          {PRODUCTS.filter(p => p.collection === activeTab).length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              New pieces arriving soon.
            </div>
          )}
        </div>

        {/* Full Bleed Image Grid */}
        <div className="pdf-grid" style={{ marginTop: '40px' }}>
          
          <div className="pdf-item" style={{ position: 'relative' }}>
            <Link href="/category/earrings" className="image-container" style={{ position: 'relative', display: 'block' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1708934384&width=800" alt="Earrings" />
              <div className="overlay-text">EARRINGS</div>
            </Link>
          </div>

          <div className="pdf-item" style={{ position: 'relative' }}>
            <Link href="/category/rings" className="image-container" style={{ position: 'relative', display: 'block' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/6ef918_dda50d76e89e497694803b84c6141c25_mv2.webp?v=1708934384&width=800" alt="Rings" />
              <div className="overlay-text">RINGS</div>
            </Link>
          </div>

          <div className="pdf-item" style={{ position: 'relative' }}>
            <Link href="/category/necklaces" className="image-container" style={{ position: 'relative', display: 'block' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=800" alt="Necklaces" />
              <div className="overlay-text">NECKLACES</div>
            </Link>
          </div>

        </div>
      </div>

      <style jsx>{`
        .pdf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px; /* PDF has slight gap or full bleed depending on interpretation, 16px looks premium */
          align-items: stretch;
        }

        .pdf-sub-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 24px;
        }

        .pdf-sub-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .sub-image-container {
          display: block;
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 3/4;
        }

        .sub-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .sub-image-container:hover img {
          transform: scale(1.05);
        }

        .sub-title {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-main);
          text-align: center;
        }

        .pdf-item {
          display: flex;
          flex-direction: column;
        }

        .image-container {
          display: block;
          position: relative;
          overflow: hidden;
          background: #FFFFFF;
          aspect-ratio: 3/4;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .image-container:hover img {
          transform: scale(1.05);
        }

        .overlay-text {
          position: absolute;
          bottom: 32px;
          left: 32px;
          color: #ffffff;
          font-size: 1rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          z-index: 2;
        }
        
        .image-container::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 30%;
          background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
          z-index: 1;
        }

        @media (max-width: 900px) {
          .pdf-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .pdf-sub-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
};
