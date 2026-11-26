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
          width: 100%;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .admin-main-content {
            padding: 72px 14px 40px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          /* Universal mobile responsiveness for admin pages */
          .admin-page-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            margin-bottom: 20px !important;
          }
          .admin-page-header h1 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
          }
          .admin-card-container {
            padding: 16px 12px !important;
          }
          /* Ensure all tables scroll cleanly horizontally without stretching screen */
          .admin-table-container {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            border-radius: 8px !important;
            margin-bottom: 20px !important;
            box-sizing: border-box !important;
          }
          .admin-table-container table {
            min-width: 580px !important;
          }
          /* Responsive form grid inputs */
          .admin-form-grid-2, .admin-form-grid-3 {
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

        /* Optimization for compact and ultra-small mobile screens (iPhone SE, Galaxy Fold, 320px - 380px) */
        @media (max-width: 420px) {
          .admin-main-content {
            padding: 68px 10px 30px !important;
          }
          .admin-page-header h1 {
            font-size: 1.3rem !important;
          }
          input, select, textarea, button {
            font-size: 14px !important;
          }
          /* Ensure stats cards stack without overflow */
          .admin-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
