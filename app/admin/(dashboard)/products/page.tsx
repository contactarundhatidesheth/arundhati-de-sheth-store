import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteProduct } from '@/app/admin/actions';

export default function AdminProducts() {
  const db = readDB();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Products</h1>
        <Link href="/admin/products/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Product
        </Link>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Image</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Product Name</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Collection</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Price</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No products found. Create one to get started.
                </td>
              </tr>
            ) : (
              db.products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <img src={p.images[0]} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{p.title}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>{p.collection}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>₹{p.price.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                    <Link href={`/admin/products/${p.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteProduct(p.id);
                    }}>
                      <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                    </form>
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
