'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Pages with a light/white background at the top — logo must always be black
const LIGHT_BG_PATHS = ['/category/ephemerals', '/category/perennials', '/shipping', '/terms', '/privacy', '/payment', '/press', '/cart', '/product', '/shop-the-look', '/pages/jewelry-lookbooks', '/timeline'];

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Force opaque white header + black logo on light-background pages
  const isLightPage = LIGHT_BG_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down past 80px, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isAtTop = lastScrollY <= 10 && !isLightPage;

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Announcement Banner */}
      <div style={{
        background: 'var(--accent-gold, #D4AF37)',
        color: '#000000',
        textAlign: 'center',
        padding: '10px clamp(10px, 3vw, 20px)',
        fontSize: 'clamp(8px, 2.5vw, 11px)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 500,
        position: 'fixed',
        top: isVisible ? '0' : '-40px',
        width: '100%',
        zIndex: 101,
        transition: 'top 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      }}>
        Complimentary Shipping on All Orders Across India
      </div>

      <header style={{
        position: 'fixed',
        width: '100%',
        top: isVisible ? '32px' : '-80px',
        zIndex: 100,
        background: isAtTop ? 'transparent' : 'var(--header-bg)',
        backdropFilter: isAtTop ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: isAtTop ? 'none' : 'blur(12px)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        color: isAtTop ? '#ffffff' : 'var(--text-main)',
      }}>
        {/* Left: Menu & Links */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button onClick={() => setIsMenuOpen(true)} style={{ color: 'var(--accent)' }}>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Center: Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'block', width: '220px' }}>
            <img 
              src="https://www.arundhatidesheth.com/cdn/shop/files/111.png?v=1708868785" 
              alt="Arundhati De-Sheth" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                objectFit: 'contain',
                filter: isAtTop ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.4s ease'
              }}
            />
          </Link>
        </div>

        {/* Right: Cart & User */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
          <Link href="/login" style={{ display: 'flex', alignItems: 'center', color: 'inherit' }} className="hide-on-mobile">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <button 
            style={{ position: 'relative', display: 'flex', alignItems: 'center', color: 'inherit' }}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                background: isAtTop ? '#ffffff' : 'var(--text-main)',
                color: isAtTop ? '#000000' : 'var(--bg-primary)',
                fontSize: '10px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s ease'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}>
        <div style={{ height: '80px', flexShrink: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 32px' }}>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={32} strokeWidth={1} color="#ffffff" />
          </button>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '20px 0 calc(60px + env(safe-area-inset-bottom, 0px)) 0' }}>
          <Link href="/about" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
          <Link href="/timeline" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>JOURNEY</Link>
          <Link href="/category/all-products" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link href="/collections" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>HIGH JEWELLERY</Link>
          <Link href="/pages/whats-new" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>PRESS</Link>
          <Link href="/contact" className="nav-link" style={{ fontSize: '1.2rem', color: '#ffffff', letterSpacing: '0.15em' }} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
