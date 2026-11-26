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
      <main className="admin-main-content">
        {children}
      </main>
      <style>{`
        .admin-main-content {
          flex: 1;
          padding: 48px;
          min-width: 0;
          overflow-x: hidden;
        }
        @media (max-width: 900px) {
          .admin-main-content {
            padding: 80px 16px 40px !important;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
