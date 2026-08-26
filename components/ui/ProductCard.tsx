'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <Link
      href={`/product/${product.handle}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1/1',
          overflow: 'hidden',
          background: '#FFFFFF',
          marginBottom: '24px',
        }}
      >
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          fill
          style={{
            objectFit: 'contain',
            padding: '24px',
            transition: 'transform 1.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div style={{ textAlign: 'center', padding: '0 16px' }}>
        <h3
          style={{
            fontSize: '0.85rem',
            letterSpacing: '0.05em',
            fontWeight: '400',
            fontFamily: 'var(--font-sans)',
            textTransform: 'uppercase',
            marginBottom: '8px',
            color: 'var(--text-main)',
            transition: 'color 0.3s ease'
          }}
        >
          {product.title}
        </h3>
        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-sans)',
            opacity: isHovered ? 1 : 0.6,
            transition: 'opacity 0.4s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Price on Request
        </p>
      </div>
    </Link>
  );
};
