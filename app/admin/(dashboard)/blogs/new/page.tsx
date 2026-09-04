import React from 'react';
import Link from 'next/link';
import { saveBlog } from '@/app/admin/actions';

export default function NewBlogPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Add Press Article</h1>
        <Link href="/admin/blogs" style={{ color: '#666', textDecoration: 'none' }}>&larr; Cancel</Link>
      </div>

      <form action={saveBlog} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sequence / Display Order</label>
          <input type="number" name="sequence" defaultValue="999" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="1" />
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Publication Name</label>
            <input type="text" name="publication" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Vogue India" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Date / Issue</label>
            <input type="text" name="date" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. October 2023" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Headline / Title</label>
          <input type="text" name="title" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. The New Era of Bespoke Jewellery" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Excerpt / Summary</label>
          <textarea name="excerpt" required rows={3} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} placeholder="Arundhati De-Sheth redefines modern luxury..."></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Article Image (Upload or URL)</label>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <input type="file" name="imageFile" accept="image/*,video/*" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '-8px' }}>OR</span>
            <input type="url" name="image" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="Provide Image URL (https://...)" />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%' }}>
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
}
