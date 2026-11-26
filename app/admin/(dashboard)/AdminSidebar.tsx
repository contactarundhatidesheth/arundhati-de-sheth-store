'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <aside
      className="admin-sidebar"
      style={{
        width: '260px',
        minWidth: '260px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#fff',
        borderRight: '1px solid #eaeaea',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        boxSizing: 'border-box',
        zIndex: 40,
      }}
    >
      <style>{`
        .admin-sidebar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
      <div>
        <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '36px', letterSpacing: '0.05em' }}>
          A.D. Admin
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {NAV_LINKS.map((item) => {
            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#000' : '#555',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.92rem',
                  padding: '8px 12px',
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
        <a href="/api/admin-logout" style={{ textDecoration: 'none', color: '#cc0000', fontSize: '0.92rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}>
          <span>⚿</span> Lock Panel (Logout)
        </a>
        <Link href="/" style={{ textDecoration: 'none', color: '#888', fontSize: '0.92rem', padding: '6px 12px' }}>
          &larr; View Storefront
        </Link>
      </div>
    </aside>
  );
}
