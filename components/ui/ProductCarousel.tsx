'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/lib/data/products';

interface ProductCarouselProps {
  products: Product[];
  title: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{ position: 'relative', padding: '80px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
          {title}
        </h2>
        <Link href="/category/all-products" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
          Shop All Pieces
        </Link>
      </div>

      {/* Navigation Arrows positioned on edges */}
      <button
        onClick={() => scroll('left')}
        style={{
          position: 'absolute',
          left: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
        aria-label="Previous"
      >
        <ChevronLeft size={24} strokeWidth={1} />
      </button>

      <button
        onClick={() => scroll('right')}
        style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '48px',
          height: '48px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
        aria-label="Next"
      >
        <ChevronRight size={24} strokeWidth={1} />
      </button>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '16px',
          scrollSnapType: 'x mandatory',
        }}
        className="hide-scrollbar"
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              minWidth: '280px',
              maxWidth: '280px',
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
