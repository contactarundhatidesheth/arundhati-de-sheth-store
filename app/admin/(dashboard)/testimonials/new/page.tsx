import React from 'react';
import Link from 'next/link';
import { saveTestimonial } from '@/app/admin/actions';

export default function NewTestimonialPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Add Testimonial</h1>
        <Link href="/admin/testimonials" style={{ color: '#666', textDecoration: 'none' }}>&larr; Cancel</Link>
      </div>

      <form action={saveTestimonial} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Client Name</label>
            <input type="text" name="author" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Arundhati De-Sheth" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Location / Title</label>
            <input type="text" name="location" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Mumbai, Fashion Entrepreneur" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Testimonial Quote</label>
          <textarea name="quote" required rows={4} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} placeholder="What makes her special is her eye..."></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Client Photo URL</label>
          <input type="url" name="image" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="https://..." />
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%' }}>
            Save Testimonial
          </button>
        </div>
      </form>
    </div>
  );
}
