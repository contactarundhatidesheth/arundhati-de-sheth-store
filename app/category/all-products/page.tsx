'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';

/* ─── Data ─── */
const COLLECTIONS = [
  {
    id: 'EPHEMERALS',
    label: 'Ephemerals',
    subtitle: 'Seasonal & Limited Edition',
    image: '/products/20.png',
  },
  {
    id: 'PERENNIALS',
    label: 'Perennials',
    subtitle: 'Timeless Creations',
    image: '/products/30.png',
  },
];

const JEWELLERY_TYPES = [
  { id: 'EARRING',  label: 'Earrings',  image: '/products/20.png' },
  { id: 'RING',     label: 'Rings',     image: '/products/30.png' },
  { id: 'NECKLACE', label: 'Necklaces', image: '/products/6.png'  },
  { id: 'PENDANT',  label: 'Pendants',  image: '/products/6.png'  },
  { id: 'BRACELET', label: 'Bracelets', image: '/products/30.png' },
  { id: 'CUFF',     label: 'Cuffs',     image: '/products/20.png' },
];

type Step = 'collection' | 'products';

export default function CategoryAllProductsPage() {
  const { data, loading } = useCMSData();

  const [step, setStep]             = useState<Step>('collection');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedType, setSelectedType]             = useState<string | null>(null); // null = All

  if (loading) return <div style={{ minHeight: '100vh', background: '#FFF' }} />;

  const PRODUCTS = data.products;

  const normalize = (str: string) => (str || '').toUpperCase().replace(/[:\-\s]+/g, '');

  /* Which types exist in the chosen collection? */
  const typesInCollection = selectedCollection
    ? JEWELLERY_TYPES.filter(t =>
        PRODUCTS.some(
          p =>
            normalize(p.collection).includes(normalize(selectedCollection)) &&
            normalize(p.category) === normalize(t.id),
        ),
      )
    : JEWELLERY_TYPES;

  if (selectedCollection === 'EPHEMERALS') {
    typesInCollection.push({ id: 'COLLAB', label: 'Collab Collection', image: '' });
  }

  /* Final filtered products */
  const filteredProducts = selectedCollection
    ? PRODUCTS.filter(p => {
        if (!normalize(p.collection).includes(normalize(selectedCollection))) return false;
        if (!selectedType) return true;
        if (selectedType === 'COLLAB') {
          return normalize(p.collection).includes('COLLAB') || 
                 normalize(p.category).includes('COLLAB') || 
                 normalize(p.title).includes('COLLAB');
        }
        return normalize(p.category) === normalize(selectedType);
      })
    : [];

  /* ── Handlers ── */
  const pickCollection = (id: string) => {
    setSelectedCollection(id);
    setSelectedType(null);
    setStep('products');
  };

  const goBack = () => {
    if (step === 'products') { 
      setStep('collection'); 
      setSelectedCollection(null); 
      setSelectedType(null);
    }
  };

  const collectionLabel = COLLECTIONS.find(c => c.id === selectedCollection)?.label ?? '';

  /* ── Render ── */
  return (
    <div className="shop-wrapper" style={{ minHeight: '100vh', background: '#FFF' }}>

      {/* Hero Header */}
      <section style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', background: '#000000', overflow: 'hidden' }}>
        <Image
          src={
            step === 'collection' 
              ? '/images/Explore%20.png' 
              : selectedCollection === 'EPHEMERALS' 
              ? '/images/Ephemerals%20.png' 
              : '/images/Perennials%20.png'
          }
          alt={step === 'collection' ? 'Explore Collections' : collectionLabel}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'relative', zIndex: 10, padding: '0 clamp(20px, 5vw, 60px) clamp(30px, 5vw, 60px)', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: '300', marginBottom: '0', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: '1', letterSpacing: '0.02em', color: '#FFFFFF', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
            {step === 'collection' ? 'Explore' : collectionLabel}
          </h1>
        </div>
      </section>

      {/* ── Breadcrumb / Back ── */}
      <div style={{ padding: '32px 40px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {step !== 'collection' && (
          <button
            onClick={goBack}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', padding: 0 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back
          </button>
        )}
        <nav style={{ fontSize: '0.72rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => { setStep('collection'); setSelectedCollection(null); setSelectedType(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', color: step === 'collection' ? '#000' : '#888', padding: 0 }}>
            Shop
          </button>
          {selectedCollection && (
            <>
              <span>/</span>
              <span style={{ color: '#000' }}>{collectionLabel}</span>
            </>
          )}
        </nav>
      </div>

      {/* ══════════════════════════════════
          STEP 1 — Choose Collection
      ══════════════════════════════════ */}
      {step === 'collection' && (
        <div style={{ padding: '48px 40px 80px' }}>
          <div className="collection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', maxWidth: '1600px', margin: '0 auto' }}>
            {COLLECTIONS.map(col => (
                <button
                  key={col.id}
                  onClick={() => pickCollection(col.id)}
                  style={{ border: 'none', padding: 0, cursor: 'pointer', position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', display: 'block', background: 'transparent' }}
                  className="collection-card"
                >
                  <Image
                    src={col.image}
                    alt={col.label}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.7s ease', opacity: 1 }}
                    className="collection-img"
                  />
                  <div style={{ position: 'absolute', bottom: '32px', left: '28px', right: '28px', textAlign: 'left' }}>
                    <p style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 500 }}>
                      {col.subtitle}
                    </p>
                    <h2 style={{ color: '#000', fontSize: 'clamp(1.3rem, 2vw, 2rem)', fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.1 }}>
                      {col.label}
                    </h2>
                  </div>
                  <div className="collection-arrow" style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0, transition: 'opacity 0.3s ease' }}>
                    <ArrowRight size={20} color="#000" strokeWidth={1.5} />
                  </div>
                </button>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          STEP 2 — Product Grid (with Filters)
      ══════════════════════════════════ */}
      {step === 'products' && (
        <div style={{ padding: '48px 40px 120px' }}>
          {/* Filters Bar */}
          {typesInCollection.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <button 
                onClick={() => setSelectedType(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase', 
                  cursor: 'pointer', 
                  padding: '8px 16px', 
                  borderBottom: selectedType === null ? '1px solid #000' : '1px solid transparent',
                  color: selectedType === null ? '#000' : '#888',
                  transition: 'color 0.2s, border-color 0.2s'
                }}
              >
                All Pieces
              </button>
              {typesInCollection.map(type => (
                <button 
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '0.75rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    cursor: 'pointer', 
                    padding: '8px 16px', 
                    borderBottom: selectedType === type.id ? '1px solid #000' : '1px solid transparent',
                    color: selectedType === type.id ? '#000' : '#888',
                    transition: 'color 0.2s, border-color 0.2s'
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
              <p>No pieces available in this selection.</p>
            </div>
          ) : (
            <div className="product-5col" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '40px 16px', maxWidth: '2400px', margin: '0 auto' }}>
              {filteredProducts.map(product => (
                <Link href={`/product/${product.handle}`} key={product.id} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '14px' }}>
                    <Image src={product.images[0]} alt={product.title} fill style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }} className="product-img" />
                  </div>
                  <div style={{ padding: '0 4px 4px' }}>
                    <p style={{ color: '#000', fontSize: '12px', fontWeight: 400, letterSpacing: '0.3px', marginBottom: '3px' }}>{product.title}</p>
                    <p style={{ color: '#666', fontSize: '11px', fontWeight: 400 }}>
                      ₹ {product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {step !== 'products' && (
        <style>{`
          footer { display: none !important; }
        `}</style>
      )}

      <style>{`
        .collection-card:hover .collection-img,
        .product-img:hover { transform: scale(1.05); }
        .collection-card:hover .collection-arrow { opacity: 1 !important; }

        @media (max-width: 1400px) { .product-5col { grid-template-columns: repeat(4,1fr) !important; } }
        @media (max-width: 1100px) { .product-5col { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 768px) {
          .shop-wrapper { padding-top: 80px !important; }
          .shop-wrapper > div { padding: 32px 16px 80px !important; }
          .collection-grid { grid-template-columns: 1fr !important; }
          .product-5col { grid-template-columns: repeat(2,1fr) !important; gap: 24px 10px !important; }
        }
        /* Removed 420px 1-column breakpoint to maintain 2-columns on small screens */
      `}</style>
    </div>
  );
}
