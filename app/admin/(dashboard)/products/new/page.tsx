import React from 'react';
import Link from 'next/link';
import { saveProduct } from '@/app/admin/actions';
import AdminRichText from '@/app/admin/AdminRichText';

export default function NewProductPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Add New Product</h1>
        <Link href="/admin/products" style={{ color: '#666', textDecoration: 'none' }}>&larr; Cancel</Link>
      </div>

      <form action={saveProduct} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sequence / Display Order</label>
          <input type="number" name="sequence" defaultValue="999" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="1" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Product Title</label>
          <input type="text" name="title" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. The Gatsby Earrings" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Handle (URL Slug)</label>
          <input type="text" name="handle" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. the-gatsby-earrings" />
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Price (₹)</label>
            <input type="number" name="price" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="50000" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Category</label>
            <select name="category" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="Earring">Earring</option>
              <option value="Ring">Ring</option>
              <option value="Necklace">Necklace</option>
              <option value="Bracelet">Bracelet</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Metal</label>
            <select name="metal" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="18K Gold">18K Gold</option>
              <option value="14K Gold">14K Gold</option>
              <option value="925 Silver">925 Silver</option>
              <option value="Multi-Metal">Multi-Metal</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Collection</label>
            <select name="collection" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
              <option value="EPHEMERALS">EPHEMERALS</option>
              <option value="PERENNIALS - Gold">PERENNIALS - Gold</option>
              <option value="PERENNIALS - Silver">PERENNIALS - Silver</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
          <AdminRichText name="description" placeholder="A brief description of the product..." />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Image (Upload or URL)</label>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <input type="file" name="imageFile" accept="image/*,video/*" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '-8px' }}>OR</span>
            <input type="url" name="image" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Provide Image URL (https://...)" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Tags (comma separated)</label>
          <input type="text" name="tags" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="diamond, vintage, evening" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="checkbox" name="isNew" id="isNew" />
          <label htmlFor="isNew" style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Mark as &quot;New Arrival&quot;</label>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%' }}>
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
