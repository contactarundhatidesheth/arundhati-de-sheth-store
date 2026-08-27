'use client';

import React from 'react';
import Link from 'next/link';

export const NewPieces: React.FC = () => {
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0' }}>
          
          {/* Top Left: Text Panel */}
          <div style={{ padding: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--accent)', color: 'var(--text-main)' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
              New Pieces
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '32px', maxWidth: '400px' }}>
              Discover our latest fine jewellery acquisitions, crafted with precious gemstones and hallmarked gold.
            </p>
            <Link href="/collections" className="btn-primary" style={{ alignSelf: 'flex-start', background: 'var(--text-main)', color: 'var(--bg-primary)', borderColor: 'var(--text-main)' }}>
              View Lookbooks
            </Link>
          </div>

          {/* Top Right: Image */}
          <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
            <img 
              src="https://www.arundhatidesheth.com/cdn/shop/files/Untitled_design_15.png?v=1708934384&width=800" 
              alt="New Jewelry 1"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
            />
          </div>

          {/* Bottom Left: Image */}
          <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
            <img 
              src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=800" 
              alt="New Jewelry 2"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
            />
          </div>

          {/* Bottom Right: Image */}
          <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden', background: '#FFFFFF' }}>
            <img 
              src="https://www.arundhatidesheth.com/cdn/shop/files/e-invite-Final.jpg?v=1708934384&width=800" 
              alt="New Jewelry 3"
              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
            />
          </div>

        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
