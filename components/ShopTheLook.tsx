'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ParallaxSection } from '@/components/ParallaxSection';

export const ShopTheLook: React.FC = () => {
  const { openConsultationForPiece } = useCart();

  return (
    <section style={{ padding: 'var(--section-padding)', background: '#1A1A1A', color: '#FAF9F7' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
        
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
          <ParallaxSection
            imageSrc="https://www.arundhatidesheth.com/cdn/shop/files/19_62d39958-6d5e-4d16-94a2-7fd33f4d9bf0.png?v=1784800252&width=800"
            imageAlt="Arundhati De-Sheth High Jewellery Editorial"
            overlayColor="#1A1A1A"
            overlayOpacity={0.2}
            minHeight="100%"
            parallaxSpeed={0.1}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'rgba(26, 26, 26, 0.9)', border: '1px solid var(--text-on-dark-faint)', zIndex: 2 }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-subtle)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '4px' }}>FEATURED PIECE</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Moonshine Morganite Ear Pendants</h4>
                <Link href="/product/chalcedony-earring" style={{ color: '#FAF9F7', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500' }}>
                  View <ArrowRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </Link>
              </div>
            </div>
          </ParallaxSection>
        </div>

        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '16px' }}>
            Bespoke Commissions & Heritage Craft
          </p>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: '300', lineHeight: '1.15', marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>
            Designed around how fine jewellery is truly collected.
          </h2>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.8', fontWeight: '300', marginBottom: '32px' }}>
            Unlike high-volume retail storefronts, Arundhati De-Sheth operates as a personal consultancy. Each creation — from Victorian-inspired girandole drops to custom signet rings — comes with certificate provenance, gold weight specs, and bespoke customization.
          </p>

          <div style={{ borderLeft: '1px solid var(--text-on-dark-subtle)', paddingLeft: '20px', marginBottom: '32px', fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-on-dark-strong)', lineHeight: '1.6' }}>
            &quot;Jewellery should not merely decorate; it should encapsulate identity, history, and personal mythology.&quot;
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => openConsultationForPiece()}
              className="btn-dark-primary"
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              <Calendar size={14} />
              <span>Request Commission</span>
            </button>
            <Link href="/about" className="btn-dark-secondary" style={{ borderRadius: 'var(--radius-sm)' }}>
              <span>Our Story</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
