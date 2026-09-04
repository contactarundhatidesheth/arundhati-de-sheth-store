'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCMSData } from '@/hooks/useCMSData';
import { useCart } from '@/context/CartContext';
import { ChevronDown, ChevronUp, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';

export default function ProductDetailClient({ params }: { params: { handle: string } }) {
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

  const recommendations = (() => {
    let recs = data.products.filter(p => p.id !== product.id && p.collection === product.collection);
    if (recs.length < 4) {
      const more = data.products.filter(p => p.id !== product.id && p.category === product.category && !recs.find(r => r.id === p.id));
      recs = [...recs, ...more];
    }
    if (recs.length < 4) {
      const evenMore = data.products.filter(p => p.id !== product.id && !recs.find(r => r.id === p.id));
      recs = [...recs, ...evenMore];
    }
    return recs.slice(0, 4);
  })();

  const whatsappMessage = encodeURIComponent(`Hello, I am interested in acquiring the ${product.title} (SKU: ${product.id.slice(0, 8).toUpperCase()}). Could you please share the pricing and arrange a private viewing?`);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="product-layout" style={{ display: 'grid', gridTemplateColumns: '54.5% 45.5%', gap: 0 }}>
        
        {/* Left: Image Gallery with thumbnail switcher */}
        <div className="product-image-panel" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)' }}>
          {/* Main Image */}
          <div style={{ width: '100%', padding: '40px 80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              className="main-image-container" 
              style={{ position: 'relative', width: '100%', maxWidth: '600px', aspectRatio: '4/5', overflow: 'hidden', cursor: 'crosshair' }}
              onMouseMove={(e) => {
                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                e.currentTarget.style.setProperty('--x', `${x}%`);
                e.currentTarget.style.setProperty('--y', `${y}%`);
              }}
            >
            <Image
              src={product.images[activeImage]}
              alt={`${product.title} - View ${activeImage + 1}`}
              fill
              style={{ objectFit: 'contain', background: '#fff' }}
              className="main-product-image"
              priority
            />
          </div>
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

        {/* Right: Product Info */}
        <div style={{ position: 'relative' }}>
          <div className="info-panel" style={{ padding: '60px 48px', display: 'flex', flexDirection: 'column' }}>
            
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
                <p style={{ fontSize: '17.6px', color: 'var(--text-main)', letterSpacing: '0.88px', fontWeight: '500', marginBottom: '16px' }}>
                  ₹ {product.price.toLocaleString('en-IN')}
                </p>
                <div 
                  style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: '300', lineHeight: '1.6', margin: 0, padding: 0 }}
                  dangerouslySetInnerHTML={{ __html: product.description || '' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <a 
                href={`https://wa.me/919581822000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inquire-btn"
                onClick={() => {
                  fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'whatsapp_click', id: product.id })
                  }).catch(() => {});
                }}
              >
                Inquire & Bespoke Commission
              </a>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px', padding: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                <Truck size={18} strokeWidth={1.5} />
                Complimentary Shipping Across India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                <ShieldCheck size={18} strokeWidth={1.5} />
                Secure & Insured Checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.5px', color: 'var(--text-main)', fontWeight: 500 }}>
                <BadgeCheck size={18} strokeWidth={1.5} />
                Authenticated Fine Jewellery
              </div>
            </div>

              {/* Detailed Accordions */}
              <div style={{ borderTop: '1px solid var(--border-light)' }}>
                

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

              {/* Jewel Care */}
              <div style={{ borderBottom: '1px solid var(--border-light)' }}>
                <button 
                  onClick={() => toggleAccordion('care')}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13.5px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold', background: 'transparent', border: 'none', cursor: 'pointer', color: '#000000', fontFamily: 'inherit' }}
                >
                  Jewel Care Instructions
                  {openAccordion === 'care' ? <ChevronUp size={18} strokeWidth={1.5} /> : <ChevronDown size={18} strokeWidth={1.5} />}
                </button>
                {openAccordion === 'care' && (
                  <div style={{ paddingBottom: '32px', fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                    <p style={{ marginBottom: '16px', fontWeight: '500', color: '#000000' }}>Tips to keep your jewellery in great condition -</p>
                    <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
                      <li style={{ paddingLeft: '4px' }}>Wear your jewellery after applying lotion/perfume/spray.</li>
                      <li style={{ paddingLeft: '4px' }}>Do not wear your jewellery to swim or shower.</li>
                      <li style={{ paddingLeft: '4px' }}>Clean your diamond jewellery with warm, mildly soapy water; followed by air drying it.</li>
                      <li style={{ paddingLeft: '4px' }}>Avoid cleaning coloured gemstones and pearl jewellery at home.</li>
                      <li style={{ paddingLeft: '4px' }}>When not wearing your jewel, keep it in an air-tight pouch or its jewellery box.</li>
                    </ol>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations (Upsell) */}
      {recommendations.length > 0 && (
        <div style={{ padding: '80px 48px', background: '#ffffff', borderTop: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', marginBottom: '40px', textAlign: 'center', letterSpacing: '0.05em', color: '#000000' }}>
            Perfect Pairings
          </h2>
          <div className="recommendations-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {recommendations.map(rec => (
              <Link href={`/product/${rec.handle}`} key={rec.id} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '14px', background: '#f9f9f9' }}>
                  <Image src={rec.images[0]} alt={rec.title} fill style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} className="rec-img" />
                </div>
                <div style={{ padding: '0 4px 4px', textAlign: 'center' }}>
                  <p style={{ color: '#000', fontSize: '13px', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '6px' }}>{rec.title}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 400 }}>
                    ₹ {rec.price.toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .main-product-image {
          transition: transform 0.4s ease-out;
          transform-origin: var(--x, 50%) var(--y, 50%);
        }
        @media (hover: hover) and (pointer: fine) {
          .main-image-container:hover .main-product-image {
            transform: scale(2.2);
          }
        }
        .rec-img:hover { transform: scale(1.05); }
        .add-to-cart-btn {
          width: 100%;
          padding: 20px;
          font-size: 13.6px;
          letter-spacing: 1.36px;
          background: #000000;
          color: #ffffff;
          border: 1px solid #000000;
          border-radius: 0px;
          text-align: center;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .add-to-cart-btn:hover {
          background: var(--accent-gold, #D4AF37);
          border-color: var(--accent-gold, #D4AF37);
          color: #000000;
        }
        .inquire-btn {
          width: 100%;
          padding: 20px;
          font-size: 13.6px;
          letter-spacing: 1.36px;
          background: transparent;
          color: #000000;
          border: 1px solid #000000;
          border-radius: 0px;
          text-align: center;
          text-transform: uppercase;
          font-weight: 400;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .inquire-btn:hover {
          background: #f5f5f5;
        }
        @media (max-width: 900px) {
          .product-layout { grid-template-columns: 1fr !important; }
          .info-panel { padding: 40px 24px 120px !important; }
          .recommendations-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          
          .action-buttons-container {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 16px 20px calc(16px + env(safe-area-inset-bottom, 0px)) !important;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 100;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
            margin: 0 !important;
            flex-direction: row !important;
            gap: 12px !important;
          }
          .action-buttons-container button, .action-buttons-container a {
            padding: 14px 10px !important;
            font-size: 11px !important;
            letter-spacing: 1px !important;
            flex: 1;
          }
          .trust-badges { display: none !important; }
        }
      `}</style>
    </div>
  );
}
