import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { saveProduct } from '@/app/admin/actions';
import AdminRichText from '@/app/admin/AdminRichText';

export default async function NewProductPage() {
  const db = await readDB();
  const uniqueCategories = Array.from(new Set(db.products.map(p => p.category).filter(Boolean)));
  const uniqueMetals = Array.from(new Set(db.products.map(p => p.metal).filter(Boolean)));
  const uniqueCollections = Array.from(new Set(db.products.map(p => p.collection).filter(Boolean)));

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
            <input type="text" name="category" list="categoryOptions" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Select or type category" />
            <datalist id="categoryOptions">
              {uniqueCategories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Metal</label>
            <input type="text" name="metal" list="metalOptions" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Select or type metal" />
            <datalist id="metalOptions">
              {uniqueMetals.map(metal => <option key={metal} value={metal} />)}
            </datalist>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Collection</label>
            <input type="text" name="collection" list="collectionOptions" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Select or type collection" />
            <datalist id="collectionOptions">
              {uniqueCollections.map(collection => <option key={collection} value={collection} />)}
            </datalist>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
          <AdminRichText name="description" placeholder="A brief description of the product..." />
        </div>

        <div style={{ padding: '24px', background: '#f8f8f8', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', fontFamily: 'var(--font-serif)' }}>Specifications & Care</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Purity</label>
              <input type="text" name="purity" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. 18K Yellow Gold" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Weight</label>
              <input type="text" name="weight" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. 5.5 GM" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Dimensions</label>
              <input type="text" name="dimensions" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. 2 x 3 cm" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Gemstones</label>
              <input type="text" name="gemstones" style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Rough Cut Diamonds 2CT" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Jewel Care Instructions (Optional Override)</label>
            <p style={{ fontSize: '0.75rem', color: '#666', margin: '-4px 0 4px 0' }}>If left blank, the global default care instructions will be shown.</p>
            <AdminRichText name="careInstructions" placeholder="Custom care instructions..." />
          </div>
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
