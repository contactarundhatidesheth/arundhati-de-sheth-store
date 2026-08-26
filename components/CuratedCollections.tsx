'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data/products';

export const CuratedCollections: React.FC = () => {
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
    <section style={{ position: 'relative', zIndex: 1, padding: '120px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        {/* Editorial Asymmetrical Layout */}
        <div className="editorial-grid">
          
          {/* Item 1 */}
          <div className="editorial-item item-1">
            <Link href={collections[0].link} className="image-container">
              <img src={collections[0].image} alt={collections[0].title} className="hover-scale" />
            </Link>
            <div className="minimal-content">
              <span className="minimal-count">01</span>
              <h3 className="minimal-title">{collections[0].title}</h3>
            </div>
          </div>

          {/* Item 2 */}
          <div className="editorial-item item-2">
             <Link href={collections[1].link} className="image-container">
              <img src={collections[1].image} alt={collections[1].title} className="hover-scale" />
            </Link>
            <div className="minimal-content">
              <span className="minimal-count">02</span>
              <h3 className="minimal-title">{collections[1].title}</h3>
            </div>
          </div>

          {/* Item 3 */}
          <div className="editorial-item item-3">
             <Link href={collections[2].link} className="image-container">
              <img src={collections[2].image} alt={collections[2].title} className="hover-scale" />
            </Link>
            <div className="minimal-content">
              <span className="minimal-count">03</span>
              <h3 className="minimal-title">{collections[2].title}</h3>
            </div>
          </div>

          {/* Item 4 */}
          <div className="editorial-item item-4">
             <Link href={collections[3].link} className="image-container">
              <img src={collections[3].image} alt={collections[3].title} className="hover-scale" />
            </Link>
            <div className="minimal-content">
              <span className="minimal-count">04</span>
              <h3 className="minimal-title">{collections[3].title}</h3>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .editorial-item {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .item-1 {
          grid-column: 1 / 7;
          margin-top: 40px;
        }

        .item-2 {
          grid-column: 8 / 13;
          margin-top: 0;
        }

        .item-3 {
          grid-column: 2 / 7; 
          margin-top: 80px;
        }

        .item-4 {
          grid-column: 7 / 12;
          margin-top: 40px;
        }

        .image-container {
          display: block;
          position: relative;
          overflow: hidden;
          background: #FFFFFF;
        }

        .item-1 .image-container { aspect-ratio: 1/1; }
        .item-2 .image-container { aspect-ratio: 1/1; }
        .item-3 .image-container { aspect-ratio: 1/1; }
        .item-4 .image-container { aspect-ratio: 1/1; }

        .hover-scale {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 24px;
          transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .image-container:hover .hover-scale {
          transform: scale(1.04);
        }

        .minimal-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          margin-top: 4px;
        }

        .minimal-count {
          font-size: 0.75rem;
          color: var(--accent-gold);
          font-family: var(--font-sans);
          opacity: 0.9;
        }

        .minimal-title {
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-main);
          font-weight: 400;
        }

        .editorial-item {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        @media (max-width: 900px) {
          .editorial-grid {
            display: flex;
            flex-direction: column;
            gap: 60px;
          }
          .item-1, .item-2, .item-3, .item-4 {
            margin-top: 0;
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </section>
  );
};
