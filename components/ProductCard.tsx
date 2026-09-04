'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Calendar, Sparkles } from 'lucide-react';
import { Product } from '@/lib/data/products';
import { WHATSAPP_URL } from '@/lib/config/site';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Could you please share pricing and availability details?`
  );
  const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMessage}`;

  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={() => { setIsHovered(true); setShowActions(true); }}
      onMouseLeave={() => { setIsHovered(false); setShowActions(false); }}
    >
      <Link
        href={`/product/${product.handle}`}
        style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-surface)', display: 'block', borderRadius: 'var(--radius-md)' }}
      >
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          fill
          style={{ objectFit: 'cover', transition: 'opacity 0.6s ease' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {showActions && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px',
            opacity: showActions ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showActions ? 'auto' : 'none',
          }}
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'whatsapp_click', id: product.id })
              }).catch(() => {});
            }}
            style={{
              flex: 1, padding: '12px',
              background: product.collection?.toLowerCase().includes('high jewellery') || product.collection?.toLowerCase().includes('high jewelry')
                ? 'var(--accent-green)'
                : 'var(--accent-gold)',
              color: '#ffffff',
              fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ShoppingBag size={14} />
            Inquire
          </a>
          <Link
            href={`/product/${product.handle}`}
            style={{ padding: '12px 14px', background: 'var(--bg-primary)', color: '#1A1A1A', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)' }}
          >
            <Eye size={14} />
          </Link>
        </div>
      )}

      <div style={{ padding: '20px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '6px' }}>
            {product.collection}
          </p>
          <Link href={`/product/${product.handle}`}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '400', color: 'var(--text-main)', marginBottom: '6px', lineHeight: '1.3', fontFamily: 'var(--font-serif)' }}>
              {product.title}
            </h3>
          </Link>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>
        </div>

          <div>
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginBottom: '8px' }}>
              <span className="font-serif" style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--accent)' }}>
                Price on Request
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};
