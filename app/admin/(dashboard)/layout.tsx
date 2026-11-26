import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session_token')?.value;

  if (token !== 'true') {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5', color: '#111' }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: '48px', minWidth: 0, overflowX: 'hidden' }}>
        {children}
      </main>
    </div>
  );
}
