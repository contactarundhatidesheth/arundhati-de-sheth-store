'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ui/ProductCard';
import { useCMSData } from '@/hooks/useCMSData';

export default function CategoryAllProductsPage() {
  const [maxPrice, setMaxPrice] = useState(500000);
  const { data, loading } = useCMSData();
  const PRODUCTS = data.products;

  const filteredProducts = PRODUCTS.filter(p => p.price <= maxPrice);

  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />;

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '64px 24px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
          All Products
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          {filteredProducts.length} products
        </p>
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Top Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', color: 'var(--text-muted)' }}>
              Browse Collections
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              <li>
                <Link href="/category/all-products" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500', borderBottom: '1px solid var(--text-main)', paddingBottom: '4px' }}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/garden-beads" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Garden Beads
                </Link>
              </li>
              <li>
                <Link href="/category/gilded-gems" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Gilded Gems
                </Link>
              </li>
              <li>
                <Link href="/category/silver-water" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Silver Water
                </Link>
              </li>
            </ul>
          </div>

          <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px', color: 'var(--text-muted)' }}>
              Filter by Price
            </h3>
            <input 
              type="range" 
              min="0" 
              max="500000" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', marginBottom: '12px', accentColor: 'var(--text-main)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-main)' }}>
              <span>₹0</span>
              <span>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="btn-secondary">
              Load More
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
