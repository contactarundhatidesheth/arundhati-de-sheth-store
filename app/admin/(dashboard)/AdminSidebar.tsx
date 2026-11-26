'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/banners', label: 'Banners & Videos' },
  { href: '/admin/coupons', label: 'Discount Coupons' },
  { href: '/admin/catalogues', label: 'Catalogues' },
  { href: '/admin/blogs', label: 'Press & Blogs' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/timeline', label: 'Timeline Events' },
  { href: '/admin/inquiries', label: 'Inquiries CRM' },
  { href: '/admin/security', label: 'Security & Password' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on navigation
  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top App Bar with Hamburger Toggle */}
      <div className="admin-mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open Admin Menu"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              color: '#111'
            }}
          >
            <Menu size={24} />
          </button>
          <span style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.04em' }}>
            A.D. Admin
          </span>
        </div>
        <a
          href="/api/admin-logout"
          style={{ textDecoration: 'none', color: '#cc0000', fontSize: '0.85rem', fontWeight: 500 }}
        >
          Logout
        </a>
      </div>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="admin-mobile-backdrop"
        />
      )}

      {/* Sidebar container (desktop sticky side pane, mobile slide-in drawer) */}
      <aside
        className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0, letterSpacing: '0.05em' }}>
              A.D. Admin
            </h2>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="admin-mobile-close-btn"
              aria-label="Close Admin Menu"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#666',
                display: 'none',
              }}
            >
              <X size={22} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {NAV_LINKS.map((item) => {
              const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  style={{
                    textDecoration: 'none',
                    color: isActive ? '#000' : '#555',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.92rem',
                    padding: '9px 14px',
                    borderRadius: '6px',
                    background: isActive ? '#f5f5f5' : 'transparent',
                    transition: 'background 0.15s ease, color 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ paddingTop: '24px', marginTop: '16px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="/api/admin-logout"
            style={{ textDecoration: 'none', color: '#cc0000', fontSize: '0.92rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}
          >
            <span>⚿</span> Lock Panel (Logout)
          </a>
          <Link
            href="/"
            onClick={handleNavClick}
            style={{ textDecoration: 'none', color: '#888', fontSize: '0.92rem', padding: '6px 12px' }}
          >
            &larr; View Storefront
          </Link>
        </div>
      </aside>

      <style jsx global>{`
        .admin-mobile-header {
          display: none;
        }

        .admin-sidebar {
          width: 260px;
          min-width: 260px;
          height: 100vh;
          position: sticky;
          top: 0;
          background: #fff;
          border-right: 1px solid #eaeaea;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          overflow-y: auto;
          scrollbar-width: none;
          box-sizing: border-box;
          z-index: 100;
        }

        .admin-sidebar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @media (max-width: 900px) {
          .admin-mobile-header {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: #fff;
            border-bottom: 1px solid #eaeaea;
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
            z-index: 90;
          }

          .admin-mobile-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(2px);
            z-index: 150;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            max-width: 85vw;
            height: 100vh;
            transform: translateX(-100%);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 200;
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .admin-mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
