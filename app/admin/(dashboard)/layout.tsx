import React from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const ADMIN_EMAILS = ['arundhati@ads.com', 'contactarundhatidesheth@gmail.com'];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    redirect('/login?message=Unauthorized Access. Admin Only.');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5', color: '#111' }}>
      <aside style={{ width: '250px', background: '#fff', borderRight: '1px solid #eaeaea', padding: '32px 24px' }}>
        <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '48px', letterSpacing: '0.05em' }}>A.D. Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Dashboard</Link>
          <Link href="/admin/orders" style={{ textDecoration: 'none', color: '#000', fontWeight: '500', fontSize: '0.95rem' }}>Orders</Link>
          <Link href="/admin/products" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Products</Link>
          <Link href="/admin/catalogues" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Catalogues</Link>
          <Link href="/admin/blogs" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Press & Blogs</Link>
          <Link href="/admin/testimonials" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Testimonials</Link>
          <Link href="/admin/timeline" style={{ textDecoration: 'none', color: '#333', fontSize: '0.95rem' }}>Timeline Events</Link>
          <Link href="/" style={{ textDecoration: 'none', color: '#888', fontSize: '0.95rem', marginTop: '48px' }}>&larr; View Storefront</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '48px' }}>
        {children}
      </main>
    </div>
  );
}
