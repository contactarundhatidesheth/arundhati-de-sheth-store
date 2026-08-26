'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCMSData } from '@/hooks/useCMSData';
import { useCart } from '@/context/CartContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { handle: string } }) {
  const { data, loading } = useCMSData();
  const { addToCart } = useCart();
  const [openAccordion, setOpenAccordion] = useState<string | null>('info');

  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />;

  const product = data.products.find(p => p.handle === params.handle);

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const whatsappMessage = encodeURIComponent(`Hello, I am interested in acquiring the ${product.title} (SKU: ${product.id.slice(0, 8).toUpperCase()}). Could you please share the pricing and arrange a private viewing?`);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
        
        {/* Left: Scrollable Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: 'var(--bg-surface)' }}>
          {product.images.map((img, idx) => (
            <div key={idx} style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#FFFFFF', overflow: 'hidden' }}>
              <Image 
                src={img} 
                alt={`${product.title} - View ${idx + 1}`} 
                fill 
                style={{ objectFit: 'contain', padding: '40px' }}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* Right: Sticky Product Info */}
        <div style={{ position: 'relative' }}>
          <div className="sticky-info-panel" style={{ position: 'sticky', top: '80px', padding: 'clamp(48px, 6vw, 80px) clamp(32px, 5vw, 64px)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            
            {/* Breadcrumbs */}
            <nav style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '32px' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>Home</Link> &nbsp; / &nbsp; 
              <Link href="/category/all-products" style={{ textDecoration: 'none' }}>Collections</Link> &nbsp; / &nbsp; 
              <span style={{ color: 'var(--text-main)' }}>{product.category}</span>
            </nav>

            {/* Title & Metadata */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500' }}>
                {product.collection}
              </p>
              <h1 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontFamily: 'var(--font-serif)', marginBottom: '16px', lineHeight: '1.1' }}>
                {product.title}
              </h1>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.isPriceOnRequest ? 'Price on Request' : `₹ ${product.price.toLocaleString('en-IN')}`}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  SKU: {product.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              <a 
                href={`https://wa.me/919581822000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" 
                style={{ width: '100%', padding: '20px', fontSize: '0.85rem' }}
              >
                Inquire & Bespoke Commission
              </a>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                Private viewings available at our Mumbai Atelier.
              </p>
            </div>

            {/* Detailed Accordions */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              
              {/* Product Story */}
              <div style={{ borderBottom: '1px solid var(--border)' }}>
                <button 
                  onClick={() => toggleAccordion('info')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  The Story
                  {openAccordion === 'info' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'info' && (
                  <div style={{ paddingBottom: '32px', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '300' }}>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div style={{ borderBottom: '1px solid var(--border)' }}>
                <button 
                  onClick={() => toggleAccordion('specs')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  Specifications
                  {openAccordion === 'specs' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'specs' && (
                  <div style={{ paddingBottom: '32px' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', padding: 0, margin: 0 }}>
                      {Object.entries({
                        'Metal': product.metal,
                        'Purity': product.specs?.purity,
                        'Gemstones': product.specs?.gemstones,
                        'Weight': product.specs?.weight,
                        'Dimensions': product.specs?.dimensions,
                      }).map(([key, value]) => value && (
                        <li key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderBottom: '1px dashed var(--border-light)', paddingBottom: '8px' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                          <span style={{ color: 'var(--text-main)', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div style={{ borderBottom: '1px solid var(--border)' }}>
                <button 
                  onClick={() => toggleAccordion('delivery')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  Delivery & Returns
                  {openAccordion === 'delivery' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'delivery' && (
                  <div style={{ paddingBottom: '32px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                    <p style={{ marginBottom: '12px' }}>Each creation is fully insured and delivered via secure couriers worldwide. A signature is required upon delivery.</p>
                    <p>Due to the bespoke nature of our high jewellery, returns are evaluated on a case-by-case basis. Please contact our advisory for specific policies regarding this piece.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sticky-info-panel::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        @media (max-width: 900px) {
          .product-layout {
            grid-template-columns: 1fr !important;
          }
          .sticky-info-panel {
            position: relative !important;
            top: 0 !important;
            height: auto !important;
            overflow-y: visible !important;
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
