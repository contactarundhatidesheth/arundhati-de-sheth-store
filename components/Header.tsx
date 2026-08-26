'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header style={{
        position: 'fixed',
        width: '100%',
        top: isVisible ? '0' : '-80px',
        zIndex: 100,
        background: 'var(--header-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        transition: 'top 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
      }}>
        {/* Left: Log In */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <User size={20} strokeWidth={1.5} />
            <span style={{ fontSize: '0.85rem' }} className="hide-on-mobile">Log In</span>
          </button>
        </div>

        {/* Center: Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'block', width: '220px' }}>
            <img 
              src="https://www.arundhatidesheth.com/cdn/shop/files/111.png?v=1708868785" 
              alt="Arundhati De-Sheth" 
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* Right: Cart & Menu */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px' }}>
          <button 
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                background: 'var(--text-main)',
                color: 'var(--bg-primary)',
                fontSize: '10px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(true)} style={{ color: 'var(--accent-gold)' }}>
            <Menu size={24} strokeWidth={1.5} />
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
        background: '#000000',
        zIndex: 1000,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ height: '80px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 32px' }}>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={32} strokeWidth={1} color="#ffffff" />
          </button>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '32px' }}>
          <Link href="/about" className="nav-link" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
          <Link href="/category/all-products" className="nav-link" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link href="/collections" className="nav-link" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => setIsMenuOpen(false)}>CATALOGUES</Link>
          <Link href="/pages/whats-new" className="nav-link" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => setIsMenuOpen(false)}>PRESS</Link>
          <Link href="/contact" className="nav-link" style={{ fontSize: '1.5rem', color: '#ffffff' }} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
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
