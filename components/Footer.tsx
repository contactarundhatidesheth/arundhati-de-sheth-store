'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '100px 24px 60px', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        {/* Brand Logo - Centered */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
          <Link href="/" style={{ display: 'block', width: '240px' }}>
            <img 
              src="/brand/logo-black.png" 
              alt="Arundhati De-Sheth" 
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '64px', marginBottom: '80px' }}>
          
          {/* Column 1: Explore */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Explore</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/about" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>About Us</Link>
              <Link href="/category/all-products" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Shop</Link>
              <Link href="/category/ephemerals" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Ephemerals</Link>
              <Link href="/category/perennials" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Perennials</Link>
              <Link href="/collections" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>High Jewellery</Link>
              <Link href="/pages/whats-new" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Press</Link>
            </nav>
          </div>

          {/* Column 2: Legal & Service */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Client Service</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/contact" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Contact Us</Link>
              <Link href="/faq" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>FAQ</Link>
              <Link href="/shipping" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Shipping &amp; Returns</Link>
              <Link href="/terms" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Store Policy</Link>
              <Link href="/payment" style={{ fontSize: '0.95rem', padding: '4px 0', display: 'block', transition: 'opacity 0.3s' }} onMouseOver={e => (e.currentTarget.style.opacity='0.6')} onMouseOut={e => (e.currentTarget.style.opacity='1')}>Payment Methods</Link>
            </nav>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
              <a href="mailto:contact@arundhatidesheth.com" style={{ textDecoration: 'none', color: 'inherit' }} className="nav-link">contact@arundhatidesheth.com</a>
              <p>+91 95818 22000</p>
              <div style={{ display: 'flex', gap: '20px', marginTop: '24px' }}>
                <a href="#" style={{ color: 'var(--text-main)', transition: 'opacity 0.3s' }} className="hover-opacity" aria-label="Facebook">
                  <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a href="#" style={{ color: 'var(--text-main)', transition: 'opacity 0.3s' }} className="hover-opacity" aria-label="Instagram">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                required
                style={{
                  width: '100%',
                  padding: '12px 0',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'center',
            paddingTop: '40px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Arundhati De-Sheth. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
