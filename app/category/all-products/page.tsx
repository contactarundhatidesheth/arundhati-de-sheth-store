'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';
import { getOptimizedImageUrl } from '@/lib/images';

/* ─── Data ─── */
const COLLECTIONS = [
  {
    id: 'EPHEMERALS',
    label: 'Ephemerals',
    subtitle: 'Pieces created in limited moments',
    image: '/images/Ephemerals%20front%20image%20.png',
  },
  {
    id: 'PERENNIALS',
    label: 'Perennials',
    subtitle: 'Pieces lasting a long time, recurrent',
    image: '/images/Perennials%20front%20image%20.png',
  },
];

const CATEGORY_TABS = [
  { id: 'RING', label: 'Rings' },
  { id: 'NECKLACE', label: 'Necklaces' },
  { id: 'EARRING', label: 'Earrings' },
  { id: 'PENDANT', label: 'Pendants' },
  { id: 'BRACELET', label: 'Bracelets' },
];

type Step = 'collection' | 'products';

const normalize = (str: string) => (str || '').toUpperCase().replace(/[:\-\s]+/g, '');

const matchCategory = (prodCategory: string | null | undefined, targetType: string | null | undefined): boolean => {
  if (!prodCategory || !targetType) return false;
  const p = normalize(prodCategory);
  const t = normalize(targetType);
  if (p === t) return true;
  // Singular / Plural matching (e.g. RING vs RINGS, EARRING vs EARRINGS, NECKLACE vs NECKLACES)
  if (p.replace(/S$/, '') === t.replace(/S$/, '')) return true;
  // Also treat CUFF as BRACELET
  if ((p.includes('BRACELET') || p.includes('CUFF')) && (t.includes('BRACELET') || t.includes('CUFF'))) return true;
  return false;
};

export default function CategoryAllProductsPage() {
  const { data, loading } = useCMSData();

  const [step, setStep] = useState<Step>('collection');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null); // null = All Pieces
  const [searchQuery, setSearchQuery] = useState('');
  const [metalFilter, setMetalFilter] = useState<string | null>(null);

  // Read URL query params on mount (e.g. ?tab=RING or ?collection=EPHEMERALS)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const colParam = params.get('collection');
      if (colParam) {
        setSelectedCollection(colParam.toUpperCase());
        setStep('products');
      } else if (tabParam) {
        setSelectedCollection('ALL');
        setStep('products');
      }
      if (tabParam) {
        setSelectedType(tabParam.toUpperCase());
      }
    }
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', background: '#FFF' }} />;

  const PRODUCTS = data.products.filter(p => p.isActive !== false);

  /* Define fixed metals for simplified filtering */
  const uniqueMetals = ['Gold', 'Silver'];

  /* Final filtered products */
  const filteredProducts = (step === 'products' || selectedCollection)
    ? PRODUCTS.filter(p => {
      // Collection Filter
      if (selectedCollection && selectedCollection !== 'ALL') {
        if (!normalize(p.collection).includes(normalize(selectedCollection))) return false;
      }

      // Type / Category Filter
      if (selectedType) {
        if (!matchCategory(p.category, selectedType)) return false;
      }

      // Search Filter
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      // Metal Filter
      if (metalFilter && !normalize(p.metal).includes(normalize(metalFilter))) return false;

      return true;
    })
    : [];

  /* ── Handlers ── */
  const pickCollection = (id: string) => {
    setSelectedCollection(id);
    setSelectedType(null);
    setStep('products');
  };

  const handleSelectType = (typeId: string | null) => {
    setSelectedType(typeId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (typeId) {
        url.searchParams.set('tab', typeId);
      } else {
        url.searchParams.delete('tab');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  const goBack = () => {
    if (step === 'products') {
      setStep('collection');
      setSelectedCollection(null);
      setSelectedType(null);
      setSearchQuery('');
      setMetalFilter(null);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('tab');
        url.searchParams.delete('collection');
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  const collectionLabel = selectedCollection === 'ALL'
    ? 'All Pieces'
    : COLLECTIONS.find(c => c.id === selectedCollection)?.label ?? 'All Pieces';

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
                : selectedCollection === 'PERENNIALS'
                  ? '/images/Perennials%20.png'
                  : '/images/Explore%20.png'
          }
          alt={step === 'collection' ? 'Explore Collections' : collectionLabel}
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
        />
        {/* Gradient Overlay for Text Legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, padding: '0 clamp(20px, 5vw, 60px) clamp(30px, 5vw, 60px)', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: '300', marginBottom: '0', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: '1', letterSpacing: '0.02em', color: '#FFFFFF', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
            {step === 'collection' ? 'Explore' : collectionLabel}
          </h1>
          {step === 'products' && selectedCollection === 'EPHEMERALS' && (
            <p style={{ color: '#FFFFFF', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', marginTop: '20px', maxWidth: '600px', lineHeight: '1.6', letterSpacing: '0.05em', fontWeight: 300, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Existing only briefly, one of a kind pieces created in limited moments
            </p>
          )}
          {step === 'products' && selectedCollection === 'PERENNIALS' && (
            <p style={{ color: '#FFFFFF', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', marginTop: '20px', maxWidth: '600px', lineHeight: '1.6', letterSpacing: '0.05em', fontWeight: 300, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Lasting a very long time, or happening repeatedly or all the time; recurrent.
            </p>
          )}
          {step === 'products' && (!selectedCollection || selectedCollection === 'ALL') && (
            <p style={{ color: '#FFFFFF', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', marginTop: '20px', maxWidth: '600px', lineHeight: '1.6', letterSpacing: '0.05em', fontWeight: 300, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              Curated acquisitions and bespoke high jewellery
            </p>
          )}
        </div>
      </section>

      {/* ── Breadcrumb / Back ── */}
      <div className="breadcrumb-wrapper" style={{ padding: '32px 40px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
        <div className="step-wrapper" style={{ padding: '48px 40px 80px' }}>
          <div className="collection-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', maxWidth: '1600px', margin: '0 auto' }}>
            {COLLECTIONS.map(col => (
              <button
                key={col.id}
                onClick={() => pickCollection(col.id)}
                style={{ border: 'none', padding: 0, cursor: 'pointer', width: '100%', display: 'flex', flexDirection: 'column', background: 'transparent' }}
                className="collection-card"
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#F9F9F9' }}>
                  <Image
                    src={col.image}
                    alt={col.label}
                    fill
                    style={{ objectFit: 'contain', padding: '24px', transition: 'transform 0.7s ease' }}
                    className="collection-img"
                  />
                </div>
                <div style={{ padding: '24px 0 16px', textAlign: 'left', width: '100%' }}>
                  <h2 style={{ color: 'var(--text-main)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.1, margin: '0 0 8px 0' }}>
                    {col.label}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {col.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => pickCollection('ALL')}
              style={{
                background: 'transparent',
                border: '1px solid #111111',
                color: '#111111',
                padding: '12px 32px',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#111111';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#111111';
              }}
            >
              Browse All Pieces
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════
          STEP 2 — Product Grid (with Filters)
      ══════════════════════════════════ */}
      {step === 'products' && (
        <div className="step-wrapper" style={{ padding: '48px 40px 120px' }}>
          {/* Filters Bar */}
          <div className="filters-bar" style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>

            {/* Collection Switcher Pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'ALL', label: 'All Collections' },
                { id: 'EPHEMERALS', label: 'Ephemerals' },
                { id: 'PERENNIALS', label: 'Perennials' },
              ].map(col => {
                const isActive = (selectedCollection === col.id) || (col.id === 'ALL' && (!selectedCollection || selectedCollection === 'ALL'));
                return (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.id)}
                    style={{
                      background: isActive ? '#000000' : 'transparent',
                      color: isActive ? '#ffffff' : '#666666',
                      border: '1px solid',
                      borderColor: isActive ? '#000000' : '#EAEAEA',
                      borderRadius: '24px',
                      padding: '6px 18px',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      fontWeight: isActive ? 500 : 400,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {col.label}
                  </button>
                );
              })}
            </div>

            {/* Category Tabs — Pixel Perfect to User Design */}
            <div className="category-tabs" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(8px, 2.5vw, 24px)', WebkitOverflowScrolling: 'touch', borderBottom: '1px solid #EAEAEA', paddingBottom: '0px' }}>
              <button
                onClick={() => handleSelectType(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '10px 14px',
                  borderBottom: selectedType === null ? '2px solid #000000' : '2px solid transparent',
                  color: selectedType === null ? '#000000' : '#888888',
                  fontWeight: selectedType === null ? 600 : 400,
                  transition: 'color 0.2s, border-color 0.2s',
                  marginBottom: '-1px',
                }}
              >
                All Pieces
              </button>
              {CATEGORY_TABS.map(tab => {
                const isSelected = selectedType !== null && matchCategory(tab.id, selectedType);
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectType(tab.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '0.78rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      padding: '10px 14px',
                      borderBottom: isSelected ? '2px solid #000000' : '2px solid transparent',
                      color: isSelected ? '#000000' : '#888888',
                      fontWeight: isSelected ? 600 : 400,
                      transition: 'color 0.2s, border-color 0.2s',
                      marginBottom: '-1px',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Metal Controls */}
            <div className="filter-controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #eaeaea', paddingBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '10px 16px', border: '1px solid #eaeaea', borderRadius: '4px', outline: 'none', fontSize: '0.85rem', width: '250px' }}
                className="search-input"
              />
              <div className="metal-filters" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {uniqueMetals.map(metal => (
                  <button
                    key={metal}
                    onClick={() => setMetalFilter(metalFilter === metal ? null : metal)}
                    style={{
                      background: metalFilter === metal ? '#111' : 'transparent',
                      color: metalFilter === metal ? '#fff' : '#666',
                      border: '1px solid',
                      borderColor: metalFilter === metal ? '#111' : '#eaeaea',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
              <p>No pieces available in this selection.</p>
            </div>
          ) : (
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 16px', maxWidth: '2400px', margin: '0 auto' }}>
              {filteredProducts.map(product => (
                <Link href={`/product/${product.handle?.trim()}`} key={product.id} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', overflow: 'hidden', marginBottom: '14px', background: '#ffffff' }}>
                    <Image src={getOptimizedImageUrl(product.images[0], 600)} alt={product.title} fill style={{ objectFit: 'contain', padding: '12px', transition: 'transform 0.8s ease' }} className="product-img" />
                  </div>
                  <div style={{ padding: '0 4px 4px' }}>
                    <p style={{ color: '#000', fontSize: '12px', fontWeight: 400, letterSpacing: '0.3px', marginBottom: '3px' }}>{product.title}</p>
                    <p style={{ color: '#666', fontSize: '11px', fontWeight: 400 }}>
                      {product.isPriceOnRequest ? 'Price on Request' : `₹ ${product.price.toLocaleString('en-IN')}`}
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

        @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 768px) {
          /* Hero is full-bleed under the fixed header — remove extra top padding */
          .shop-wrapper { padding-top: 0 !important; }
          .breadcrumb-wrapper { padding: 24px 16px 16px !important; }
          .step-wrapper { padding: 16px 16px 120px !important; }
          .collection-grid { grid-template-columns: 1fr !important; }
          .product-grid { grid-template-columns: repeat(2,1fr) !important; gap: 24px 12px !important; }
          
          /* Filters Mobile Fixes */
          .filters-bar { gap: 16px !important; margin-bottom: 24px !important; }
          .filter-controls { flex-direction: column; align-items: stretch !important; gap: 12px !important; border-bottom: none !important; padding-bottom: 0 !important; }
          .search-input { width: 100% !important; margin-bottom: 8px; }
          .metal-filters { width: 100%; justify-content: space-between; }
          .metal-filters button { flex: 1; }
          
          /* Horizontal Swipeable Tabs */
          .category-tabs { flex-wrap: nowrap !important; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid #eaeaea; justify-content: flex-start !important; mask-image: linear-gradient(to right, black 85%, transparent 100%); -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%); }
          .category-tabs::-webkit-scrollbar { display: none; }
          .category-tabs button { flex-shrink: 0; }
        }
      `}</style>
    </div>
  );
}
