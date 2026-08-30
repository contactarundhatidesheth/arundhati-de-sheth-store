'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCMSData } from '@/hooks/useCMSData';

const TABS = ['EPHEMERALS', 'PERENNIALS: GOLD', 'PERENNIALS: SILVER', 'HIGH JEWELLERY'];

export default function CategoryAllProductsPage() {
  const { data, loading } = useCMSData();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'EPHEMERALS';
  const [activeTab, setActiveTab] = useState(initialTab);

  if (loading) return <div style={{ minHeight: '100vh', background: '#FFFFFF' }} />;

  const PRODUCTS = data.products;

  const CATEGORY_FILTERS = ['EARRING', 'RING', 'NECKLACE', 'PENDANT', 'BRACELET', 'CUFF'];

  const normalize = (str: string) => (str || '').toUpperCase().replace(/[:\-\s]+/g, '');

  let filteredProducts: typeof PRODUCTS;
  if (CATEGORY_FILTERS.includes(activeTab)) {
    // Exact category match (prevents RING matching EARRING)
    filteredProducts = PRODUCTS.filter(p =>
      normalize(p.category) === normalize(activeTab)
    );
  } else {
    // Collection / tab match (EPHEMERALS, PERENNIALS: GOLD, etc.)
    filteredProducts = PRODUCTS.filter(p =>
      normalize(p.collection).includes(normalize(activeTab))
    );
  }


  // Get sample images for the 3-column footer
  const earrings = PRODUCTS.find(p => p.category.toLowerCase().includes('earring'))?.images[0] || PRODUCTS[0]?.images[0];
  const rings = PRODUCTS.find(p => p.category.toLowerCase().includes('ring'))?.images[0] || PRODUCTS[1]?.images[0];
  const necklaces = PRODUCTS.find(p => p.category.toLowerCase().includes('necklace'))?.images[0] || PRODUCTS[2]?.images[0];

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', paddingTop: '120px' }}>
      
      {/* 1. Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginBottom: '80px', overflowX: 'auto', padding: '0 24px' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0 0 8px 0',
              fontSize: '12px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              color: '#000000',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '4px solid #F6D954' : '4px solid transparent',
              transition: 'border-color 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2. 3-Column Category Grid (Moved to top) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, width: '100%', marginBottom: '80px' }}>
        
        {/* Earrings */}
        <button onClick={() => { setActiveTab('EARRING'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', padding: 0, position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', display: 'block', cursor: 'pointer' }}>
          <Image src="/products/20.png" alt="Earrings" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
          <h2 style={{ position: 'absolute', bottom: '24px', left: '28px', color: '#FFFFFF', fontSize: '20px', fontWeight: '400', letterSpacing: '3px' }}>
            EARRINGS
          </h2>
        </button>

        {/* Rings */}
        <button onClick={() => { setActiveTab('RING'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', padding: 0, position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', display: 'block', cursor: 'pointer' }}>
          <Image src="/products/30.png" alt="Rings" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
          <h2 style={{ position: 'absolute', bottom: '24px', left: '28px', color: '#FFFFFF', fontSize: '20px', fontWeight: '400', letterSpacing: '3px' }}>
            RINGS
          </h2>
        </button>

        {/* Necklaces */}
        <button onClick={() => { setActiveTab('NECKLACE'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', padding: 0, position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', display: 'block', cursor: 'pointer' }}>
          <Image src="/products/6.png" alt="Necklaces" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)' }} />
          <h2 style={{ position: 'absolute', bottom: '24px', left: '28px', color: '#FFFFFF', fontSize: '20px', fontWeight: '400', letterSpacing: '3px' }}>
            NECKLACES
          </h2>
        </button>

      </div>

      {/* 3. 5-Column Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '40px 16px',
        padding: '0 24px',
        marginBottom: '120px',
        maxWidth: '2400px',
        margin: '0 auto 120px'
      }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link href={`/product/${product.handle}`} key={product.id} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#F9F9F9', marginBottom: '16px' }}>
                <Image 
                  src={product.images[0]} 
                  alt={product.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                />
                {/* Dark Gradient Overlay for Text */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px'
                }}>
                  <p style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '400', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    {product.title}
                  </p>
                  <p style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: '500' }}>
                    {product.isPriceOnRequest ? 'Price on Request' : `USD ${(product.price / 83).toLocaleString('en-US', {maximumFractionDigits:0})}`} 
                  </p>
                </div>
              </div>
              {/* Product Line / Collection Name below image */}
              <p style={{ textAlign: 'center', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#000000', fontWeight: '500' }}>
                {product.collection || 'COLLECTION'}
              </p>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: '#666' }}>
            <p>No products found for this collection.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 1400px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        @media (max-width: 1100px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(5, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
