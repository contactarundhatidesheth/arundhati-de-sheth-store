import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteTestimonial } from '@/app/admin/actions';
import SequenceEditor from '../SequenceEditor';

export default function AdminTestimonials() {
  const db = readDB();
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Testimonials</h1>
        <Link href="/admin/testimonials/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Testimonial
        </Link>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Photo</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Author</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Location</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No testimonials found. Create one to get started.
                </td>
              </tr>
            ) : (
              db.testimonials.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <SequenceEditor collection="testimonials" id={t.id} initialSequence={t.sequence || 999} />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <img src={t.image} alt={t.author} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }} />
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{t.author}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>{t.location}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                    <Link href={`/admin/testimonials/${t.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteTestimonial(t.id);
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
