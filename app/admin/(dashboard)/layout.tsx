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
            padding: 76px 14px 40px !important;
            width: 100%;
          }
          /* Universal mobile responsiveness for admin pages */
          .admin-page-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
            margin-bottom: 24px !important;
          }
          .admin-page-header h1 {
            font-size: 1.6rem !important;
          }
          .admin-card-container {
            padding: 20px 16px !important;
          }
          /* Ensure all tables scroll cleanly horizontally without stretching screen */
          .admin-table-container {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            border-radius: 8px !important;
            margin-bottom: 24px !important;
          }
          .admin-table-container table {
            min-width: 650px !important;
          }
          /* Responsive form grid inputs */
          .admin-form-grid-2 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .admin-form-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          /* Action buttons stack gracefully */
          .admin-action-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
          }
          .admin-action-row > * {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
