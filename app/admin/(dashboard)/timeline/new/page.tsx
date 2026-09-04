import React from 'react';
import Link from 'next/link';
import { saveTimelineEvent } from '@/app/admin/actions';

export default function NewTimelinePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Add Timeline Event</h1>
        <Link href="/admin/timeline" style={{ color: '#666', textDecoration: 'none' }}>&larr; Cancel</Link>
      </div>

      <form action={saveTimelineEvent} style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sequence / Display Order</label>
          <input type="number" name="sequence" defaultValue="999" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="1" />
          <span style={{ fontSize: '0.8rem', color: '#888' }}>Lower numbers appear first. Use 999 for items that should appear at the end.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Event Title</label>
          <input type="text" name="title" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. Masaba X Amrapali" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Date / Label</label>
          <input type="text" name="date" required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="e.g. February 2025" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Description</label>
          <textarea name="description" required rows={4} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} placeholder="A brief description of the event..."></textarea>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Images (Upload or URLs)</label>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            <input type="file" name="imageFiles" accept="image/*,video/*" multiple style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.8rem', color: '#666', marginTop: '-8px' }}>OR URLs (comma separated)</span>
            <textarea name="images" rows={3} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }} placeholder="/timeline/img1.jpg, /timeline/img2.jpg"></textarea>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#888' }}>You can upload multiple files or provide multiple URLs. Leave blank if no images.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Optional Link</label>
          <input type="url" name="link" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} placeholder="https://..." />
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px 32px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.05em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', width: '100%' }}>
            Save Event
          </button>
        </div>
      </form>
    </div>
  );
}
