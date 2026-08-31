'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, X } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';
import { ProductCard } from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/lib/data/products';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { DiamondLoader } from '@/components/ui/DiamondLoader';

import { useCMSData } from '@/hooks/useCMSData';

export default function CollectionsPage() {
  const { data, loading } = useCMSData();
  const CATALOGUES = data.catalogues;
  const PRODUCTS = data.products;
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in viewing your fine jewellery lookbooks. Could you please share the latest catalogues?");
  const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMessage}`;

  const [collectionFilter, setCollectionFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const getEmbedLink = (url: string) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view\?usp=sharing$/, '/preview');
    }
    return url;
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePdf(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (activePdf) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePdf]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const coll = params.get('collection');
    const cat = params.get('category');
    if (coll) setCollectionFilter(coll);
    if (cat) setCategoryFilter(cat);
  }, []);

  const filteredProducts = collectionFilter
    ? PRODUCTS.filter((p) => p.collection.toLowerCase().includes(collectionFilter.toLowerCase()))
    : categoryFilter
      ? PRODUCTS.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase())
      : [];

  const showFiltered = Boolean(collectionFilter || categoryFilter);
  const filterTitle = collectionFilter
    ? collectionFilter.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    : categoryFilter
      ? categoryFilter.replace(/\b\w/g, (l) => l.toUpperCase())
      : '';

  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Header */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', overflow: 'hidden' }}>
        {/* Background removed */}
        <Container maxWidth="800px" padding="0 24px" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
            Editorial Collections
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--text-on-dark)' }}>
            Jewelry Lookbooks
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.8', fontWeight: '300', maxWidth: '520px', margin: '0 auto 40px' }}>
            Eight editorial catalogues spanning Art Deco, high jewellery, and contemporary sculptural forms.
          </p>
          <Link href={whatsappLink} style={{ background: '#FFF', color: '#000', border: '1px solid #FFF', padding: '16px 36px', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <span>Request Catalogue</span>
            <ArrowRight size={14} />
          </Link>
        </Container>
      </section>

      {/* Filtered Product Grid */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
      {showFiltered && (
        <FadeInSection>
          <Section background="primary" padding="lg">
            <Container>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
                  {collectionFilter ? 'Collection' : 'Category'}
                </p>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>
                  {filterTitle}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7', fontWeight: '300' }}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} available. All inquiries are price on request.
                </p>
                <Link href="/collections" className="btn-secondary" style={{ color: 'var(--text-main)', borderColor: 'var(--border)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span>← View All Catalogues</span>
                </Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '48px 24px' }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Container>
          </Section>
        </FadeInSection>
      )}

      {/* Catalogues - only show when not filtered */}
      {!showFiltered && (
        <div>
          {CATALOGUES.map((catalogue, idx) => {
            const isEven = idx % 2 === 0;
            const catalogueWhatsappLink = `${WHATSAPP_URL}?text=${encodeURIComponent(`Hi, I'm interested in the "${catalogue.title}" catalogue. Could you please share more details?`)}`;

            return (
              <section key={catalogue.id} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'var(--section-padding)', background: isEven ? 'var(--bg-primary)' : 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

                      {/* Image */}
                      <div style={{ position: 'relative', width: '100%', order: isEven ? 2 : 1 }} className="catalogue-image">
                        <img
                          src={catalogue.image}
                          alt={catalogue.title}
                          style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '90vh', objectFit: 'contain' }}
                        />
                        {catalogue.featured && (
                          <div style={{ position: 'absolute', top: '16px', left: '16px', padding: '6px 12px', background: 'var(--text-main)', color: 'var(--text-on-dark)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '500' }}>
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Text Content */}
                      <div style={{ order: isEven ? 1 : 2 }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px' }}>
                          Lookbook {String(idx + 1).padStart(2, '0')} • {catalogue.year}
                        </p>
                        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
                          {catalogue.title}
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '36px', fontWeight: '300', maxWidth: '420px' }}>
                          {catalogue.description}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <button onClick={() => setActivePdf(getEmbedLink(catalogue.link))} className="btn-primary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
                            <span>View Catalogue</span>
                            <ArrowRight size={14} />
                          </button>
                          <Link href={catalogueWhatsappLink} className="btn-secondary" style={{ color: 'var(--text-main)', borderColor: 'var(--border)', display: 'inline-flex', alignItems: 'center' }}>
                            <span>Inquire</span>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </Container>
                </section>
            );
          })}
        </div>
      )}

      {/* Bottom CTA */}
      <section style={{ padding: 'var(--section-padding)', background: '#1A1A1A', color: '#FAF9F7', textAlign: 'center' }}>
        <Container center>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-strong)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px' }}>
            Begin a Conversation
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '200', marginBottom: '20px', fontFamily: 'var(--font-serif)', lineHeight: '1.2', color: 'var(--text-on-dark)' }}>
            Interested in a particular piece<br />or bespoke commission?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.7', marginBottom: '40px', fontWeight: '300', maxWidth: '560px', margin: '0 auto 40px' }}>
            Each piece is crafted as a legacy creation. All inquiries are price on request — contact us directly for pricing, availability, and private studio appointments.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={whatsappLink} className="btn-dark-primary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>WhatsApp Advisory</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="btn-dark-secondary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center' }}>
              <span>Contact Studio</span>
            </Link>
          </div>
        </Container>
      </section>
      </div>

      {/* PDF Modal Viewer */}
      {activePdf && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <button 
            onClick={() => setActivePdf(null)}
            style={{ position: 'absolute', top: '24px', right: '24px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close viewer"
          >
            <X size={40} />
          </button>
          
          <div style={{ width: '90%', height: '90%', maxWidth: '1200px', background: '#fff', borderRadius: '8px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0 }}>
              <DiamondLoader />
            </div>
            <iframe 
              src={activePdf} 
              width="100%" 
              height="100%" 
              style={{ border: 'none', position: 'relative', zIndex: 1, backgroundColor: 'transparent' }}
              title="Catalogue Viewer"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .catalogue-image:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}
