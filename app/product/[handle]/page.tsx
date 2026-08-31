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
  const [activeImage, setActiveImage] = useState(0);

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
      <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '54.5% 45.5%', gap: 0 }}>
        
        {/* Left: Image Gallery with thumbnail switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', position: 'sticky', top: '80px', height: 'calc(100vh - 80px)' }}>
          {/* Main Image */}
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
            <Image
              src={product.images[activeImage]}
              alt={`${product.title} - View ${activeImage + 1}`}
              fill
              style={{ objectFit: 'contain', background: '#fff' }}
              priority
            />
          </div>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '2px', padding: '12px', background: '#fff', overflowX: 'auto', flexShrink: 0 }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  style={{
                    flexShrink: 0,
                    width: '72px',
                    height: '72px',
                    position: 'relative',
                    border: activeImage === idx ? '2px solid #000' : '2px solid transparent',
                    padding: 0,
                    cursor: 'pointer',
                    background: '#f5f5f5',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sticky Product Info */}
        <div style={{ position: 'relative' }}>
          <div className="sticky-info-panel" style={{ position: 'sticky', top: '80px', padding: '60px 48px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            
            {/* Breadcrumbs */}
            <nav style={{ fontSize: '11.2px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.68px', marginBottom: '32px', fontWeight: '400' }}>
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> &nbsp; / &nbsp; 
              <Link href="/category/all-products" style={{ textDecoration: 'none', color: 'inherit' }}>Collections</Link> &nbsp; / &nbsp; 
              <span style={{ color: '#000000' }}>{product.category}</span>
            </nav>

            {/* Title & Metadata */}
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '12.8px', color: 'var(--accent-gold)', letterSpacing: '1.92px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: '500' }}>
                {product.collection}
              </p>
              <h1 style={{ fontSize: '38.4px', fontFamily: 'var(--font-serif)', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-0.768px', color: '#000000' }}>
                {product.title}
              </h1>
              <div style={{ paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
                <p style={{ fontSize: '17.6px', color: 'var(--text-main)', letterSpacing: '0.88px', fontWeight: '500', marginBottom: '8px' }}>
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: '300', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '13.6px',
                  letterSpacing: '1.36px',
                  background: 'var(--accent-gold)',
                  color: '#000000',
                  border: '0.67px solid var(--accent-gold)',
                  borderRadius: '0px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
              >
                Add to Cart
              </button>
              <a 
                href={`https://wa.me/919581822000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  width: '100%', 
                  padding: '20px', 
                  fontSize: '13.6px', 
                  letterSpacing: '1.36px',
                  background: '#000000',
                  color: '#ffffff',
                  border: '0.67px solid #000000',
                  borderRadius: '0px',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  fontWeight: '400'
                }}
              >
                Inquire & Bespoke Commission
              </a>
            </div>

            {/* Detailed Accordions */}
            <div style={{ borderTop: '1px solid var(--border-light)' }}>
              
              {/* Product Story */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => toggleAccordion('info')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: '#000000', fontFamily: 'inherit' }}
                >
                  The Story
                  {openAccordion === 'info' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'info' && (
                  <div style={{ paddingBottom: '32px', fontSize: '15.2px', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '300' }}>
                    <p>{product.description}</p>
                  </div>
                )}
              </div>

              {/* Specifications */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => toggleAccordion('specs')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: '#000000', fontFamily: 'inherit' }}
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
                        <li key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15.2px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', fontWeight: '300' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{key}</span>
                          <span style={{ color: '#000000', textAlign: 'right', maxWidth: '60%' }}>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => toggleAccordion('delivery')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: '#000000', fontFamily: 'inherit' }}
                >
                  Delivery & Returns
                  {openAccordion === 'delivery' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'delivery' && (
                  <div style={{ paddingBottom: '32px', fontSize: '15.2px', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                    <p style={{ marginBottom: '12px' }}>Each creation is fully insured and delivered via secure couriers worldwide. A signature is required upon delivery.</p>
                    <p>Due to the bespoke nature of our high jewellery, returns are evaluated on a case-by-case basis. Please contact our advisory for specific policies regarding this piece.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sticky-info-panel::-webkit-scrollbar { width: 0; background: transparent; }
        @media (max-width: 900px) {
          .product-layout { grid-template-columns: 1fr !important; }
          .product-image-panel { position: relative !important; top: 0 !important; height: auto !important; }
          .product-image-panel > div:first-child { height: 60vw !important; min-height: 280px; }
          .sticky-info-panel { position: relative !important; top: 0 !important; height: auto !important; overflow-y: visible !important; padding: 40px 24px !important; }
        }
      `}</style>
    </div>
  );
}
