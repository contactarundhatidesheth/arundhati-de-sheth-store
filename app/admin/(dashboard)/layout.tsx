import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token')?.value;

  if (token !== 'true') {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5', color: '#111' }}>
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
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '40px', letterSpacing: '0.05em' }}>
            A.D. Admin
          </h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/admin" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Dashboard</Link>
            <Link href="/admin/orders" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Orders</Link>
            <Link href="/admin/products" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Products</Link>
            <Link href="/admin/banners" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Banners & Videos</Link>
            <Link href="/admin/coupons" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Discount Coupons</Link>
            <Link href="/admin/catalogues" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Catalogues</Link>
            <Link href="/admin/blogs" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Press & Blogs</Link>
            <Link href="/admin/testimonials" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Testimonials</Link>
            <Link href="/admin/timeline" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Timeline Events</Link>
            <Link href="/admin/inquiries" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Inquiries CRM</Link>
          </nav>
        </div>

        <div style={{ paddingTop: '28px', marginTop: '20px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <a href="/api/admin-logout" style={{ textDecoration: 'none', color: '#cc0000', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚿</span> Lock Panel (Logout)
          </a>
          <Link href="/" style={{ textDecoration: 'none', color: '#888', fontSize: '0.95rem' }}>
            &larr; View Storefront
          </Link>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px', minWidth: 0, overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}
