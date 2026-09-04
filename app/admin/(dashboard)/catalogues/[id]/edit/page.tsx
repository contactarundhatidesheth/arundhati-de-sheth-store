import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readDB } from '@/lib/db';
import { saveCatalogue } from '@/app/admin/actions';

export default function EditCataloguePage({ params }: { params: { id: string } }) {
  const db = readDB();
  const catalogue = db.catalogues.find(c => c.id === params.id);
  
  if (!catalogue) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Edit Catalogue</h1>
        <Link href="/admin/catalogues" style={{ color: '#666', textDecoration: 'none' }}>&larr; Cancel</Link>
      </div>

      <form action={saveCatalogue} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <input type="hidden" name="id" value={catalogue.id} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sequence / Display Order</label>
          <input type="number" name="sequence" defaultValue={catalogue.sequence || 999} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="1" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Catalogue Title</label>
          <input type="text" name="title" defaultValue={catalogue.title} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Wave After Wave" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Release Year</label>
          <input type="text" name="year" defaultValue={catalogue.year} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. 2025" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
          <textarea name="description" defaultValue={catalogue.description} required rows={3} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} placeholder="A brief description of the catalogue..."></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Cover Image (Upload or URL)</label>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <input type="file" name="imageFile" accept="image/*,video/*" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '-8px' }}>OR</span>
            <input type="url" name="image" defaultValue={catalogue.image} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Provide Image URL (https://...)" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>PDF Download Link</label>
          <input type="url" name="link" defaultValue={catalogue.link} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="https://drive.google.com/..." />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="checkbox" name="featured" id="featured" defaultChecked={catalogue.featured} />
          <label htmlFor="featured" style={{ fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }}>Mark as Featured</label>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%' }}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
