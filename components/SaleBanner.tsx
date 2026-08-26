'use client';

import React from 'react';
import Link from 'next/link';

export const SaleBanner: React.FC = () => {
  return (
    <section style={{ 
      position: 'relative', 
      padding: '160px 24px', 
      minHeight: '90vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'url(https://www.arundhatidesheth.com/cdn/shop/files/e-invite-Final.jpg?v=1708934384&width=2000) center/cover no-repeat fixed'
    }}>
      {/* Subtle overlay for contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.15)'
      }}></div>

      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        background: 'rgba(250, 250, 248, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '64px 48px', 
        textAlign: 'center', 
        maxWidth: '500px', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: '24px',
          display: 'block'
        }}>
          Editorial Feature
        </span>
        
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
          fontFamily: 'var(--font-serif)', 
          color: 'var(--text-main)', 
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          The Private Collection
        </h2>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-muted)', 
          marginBottom: '40px',
          maxWidth: '320px',
          lineHeight: '1.6'
        }}>
          Discover our most coveted, limited-edition pieces curated exclusively for this season.
        </p>
        
        <Link
          href="/category/all-products"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 40px',
            background: 'var(--accent-gold)',
            color: '#ffffff',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: '500',
            textDecoration: 'none',
            border: '1px solid var(--accent-gold)',
            transition: 'var(--transition-smooth)',
          }}
        >
          Explore The Edit
        </Link>
      </div>
    </section>
  );
};
