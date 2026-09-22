import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteProduct } from '@/app/admin/actions';
import ProductTableClient from '@/app/admin/components/ProductTableClient';

export default async function AdminProducts() {
  const db = await readDB();
  const sortedProducts = [...db.products].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Products</h1>
        <Link href="/admin/products/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Product
        </Link>
      </div>

      <ProductTableClient products={db.products} />
    </div>
  );
}
