import React from 'react';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import { deleteCoupon, toggleCouponStatus } from '@/app/admin/actions';
import { CouponCreationForm } from './CouponCreationForm';

export const dynamic = 'force-dynamic';

interface CouponItem {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  status: 'active' | 'inactive';
  minOrder: number;
  appliesTo: 'ALL' | 'SELECTED';
  applicableProducts: string[];
  updatedAt?: string;
}

export default async function AdminCouponsPage() {
  const supabase = getSupabaseAdmin();
  const [
    { data: sections },
    { data: products }
  ] = await Promise.all([
    supabase.from('page_sections').select('*').like('id', 'coupon_%'),
    supabase.from('products').select('id, title, price').order('title', { ascending: true })
  ]);

  const productMap = new Map<string, string>();
  (products || []).forEach((p: any) => {
    productMap.set(String(p.id), p.title);
  });

  const coupons: CouponItem[] = (sections || []).map((s: any) => {
    let minOrder = 0;
    let appliesTo: 'ALL' | 'SELECTED' = 'ALL';
    let applicableProducts: string[] = [];

    try {
      if (s.image) {
        const parsed = JSON.parse(s.image);
        minOrder = parsed.minOrder || 0;
        appliesTo = parsed.appliesTo === 'SELECTED' ? 'SELECTED' : 'ALL';
        applicableProducts = Array.isArray(parsed.applicableProducts) ? parsed.applicableProducts : [];
      }
    } catch (e) {}

    return {
      id: s.id,
      code: s.title || s.id.replace('coupon_', ''),
      discountType: (s.subtitle === 'FIXED' ? 'FIXED' : 'PERCENTAGE') as any,
      discountValue: parseFloat(s.description) || 0,
      status: (s.link === 'inactive' ? 'inactive' : 'active') as any,
      minOrder,
      appliesTo,
      applicableProducts
    };
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
          Discount & Coupon Codes
        </h1>
        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Create and manage promotional discount coupons for the storefront checkout. Coupons can apply across all store items or be restricted to specific selected products.
        </p>
      </div>

      {/* Create New Coupon Form */}
      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #eaeaea',
          padding: '28px 32px',
          marginBottom: '40px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '20px' }}>
          Create New Coupon
        </h2>
        <CouponCreationForm products={products || []} />
      </div>

      {/* Active Coupons List */}
      <div className="admin-table-container" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666' }}>Coupon Code</th>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666' }}>Discount</th>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666' }}>Scope / Products</th>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666' }}>Min Order</th>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 500, fontSize: '0.85rem', color: '#666', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No discount coupons created yet. Create your first coupon above!
                </td>
              </tr>
            ) : (
              coupons.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 600, letterSpacing: '0.05em' }}>
                    <code style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>{c.code}</code>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>
                    {c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : `₹${c.discountValue.toLocaleString('en-IN')} OFF`}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '0.85rem' }}>
                    {c.appliesTo === 'SELECTED' ? (
                      <div>
                        <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 500, fontSize: '0.75rem', marginBottom: '4px' }}>
                          Selected ({c.applicableProducts.length} items)
                        </span>
                        <div style={{ color: '#666', fontSize: '0.75rem', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.applicableProducts.map(id => productMap.get(id) || id).join(', ')}
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: '#555' }}>All Store Products</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '0.9rem', color: '#666' }}>
                    {c.minOrder > 0 ? `₹${c.minOrder.toLocaleString('en-IN')}` : 'None'}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        background: c.status === 'active' ? '#e6f7ed' : '#fee2e2',
                        color: c.status === 'active' ? '#166534' : '#991b1b',
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <form action={async () => {
                        'use server';
                        await toggleCouponStatus(c.code, c.status);
                      }}>
                        <button
                          type="submit"
                          style={{
                            background: 'none',
                            border: '1px solid #ccc',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          {c.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </form>
                      <form action={async () => {
                        'use server';
                        await deleteCoupon(c.code);
                      }}>
                        <button
                          type="submit"
                          style={{
                            background: 'none',
                            border: '1px solid #fee2e2',
                            color: '#dc2626',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
