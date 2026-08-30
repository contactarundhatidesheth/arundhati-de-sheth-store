'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCMSData } from '@/hooks/useCMSData';

const TABS = ['EPHEMERALS', 'PERENNIALS: GOLD', 'PERENNIALS: SILVER', 'HIGH JEWELLERY'];

export default function CategoryAllProductsPage() {
  const { data, loading } = useCMSData();
  const [activeTab, setActiveTab] = useState('EPHEMERALS');

  if (loading) return <div style={{ minHeight: '100vh', background: '#FFFFFF' }} />;

  const PRODUCTS = data.products;
  
  let filteredProducts = PRODUCTS.filter(p => p.category.toUpperCase().includes(activeTab) || p.collection.toUpperCase().includes(activeTab));
  
  if (filteredProducts.length === 0) {
    filteredProducts = PRODUCTS; // fallback so the UI isn't empty during dev
  }

  // Get sample images for the 3-column footer
  const earrings = PRODUCTS.find(p => p.category.toLowerCase().includes('earring'))?.images[0] || PRODUCTS[0]?.images[0];
  const rings = PRODUCTS.find(p => p.category.toLowerCase().includes('ring'))?.images[0] || PRODUCTS[1]?.images[0];
  const necklaces = PRODUCTS.find(p => p.category.toLowerCase().includes('necklace'))?.images[0] || PRODUCTS[2]?.images[0];

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', paddingTop: '40px' }}>
      
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

      {/* 2. 5-Column Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '40px 16px',
        padding: '0 24px',
        marginBottom: '120px',
        maxWidth: '2400px',
        margin: '0 auto 120px'
      }}>
        {filteredProducts.map(product => (
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
        ))}
      </div>

      {/* 3. 3-Column Category Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, width: '100%' }}>
        
        {/* Earrings */}
        <Link href="/category/earrings" style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', display: 'block' }}>
          {earrings && <Image src={earrings} alt="Earrings" fill style={{ objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
          <h2 style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#FFFFFF', fontSize: '28px', fontWeight: '400', letterSpacing: '3px' }}>
            EARRINGS
          </h2>
        </Link>

        {/* Rings */}
        <Link href="/category/rings" style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', display: 'block' }}>
          {rings && <Image src={rings} alt="Rings" fill style={{ objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
          <h2 style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#FFFFFF', fontSize: '28px', fontWeight: '400', letterSpacing: '3px' }}>
            RINGS
          </h2>
        </Link>

        {/* Necklaces */}
        <Link href="/category/necklaces" style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', display: 'block' }}>
          {necklaces && <Image src={necklaces} alt="Necklaces" fill style={{ objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.15)' }} />
          <h2 style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#FFFFFF', fontSize: '28px', fontWeight: '400', letterSpacing: '3px' }}>
            NECKLACES
          </h2>
        </Link>

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
