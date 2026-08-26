'use client';

import React from 'react';
import { PRODUCTS, Product } from '@/lib/data/products';
import { ProductCard } from '@/components/ui/ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';

export const ProductGrid: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in viewing your fine jewellery catalogue. Could you please share the latest collections?");
  const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMessage}`;

  return (
    <section style={{ padding: 'var(--section-padding)', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
            The Catalogue
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
            Curated fine jewellery
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '560px', marginBottom: '32px', lineHeight: '1.7', fontWeight: '300' }}>
            Each piece is crafted as a legacy creation. All our pieces are price on request — contact us directly for pricing and availability.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Enquire on WhatsApp</span>
            <ArrowRight size={14} />
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '48px 24px' }}>
          {PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <Link
            href="/collections"
            className="btn-primary"
          >
            <span>View All Catalogues</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};
