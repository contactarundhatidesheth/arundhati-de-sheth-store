import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteTimelineEvent } from '@/app/admin/actions';
import SequenceEditor from '../SequenceEditor';

export default function AdminTimeline() {
  const db = readDB();
  const sortedTimelineEvents = [...db.timelineEvents].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Timeline Events</h1>
        <Link href="/admin/timeline/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Event
        </Link>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Images</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Date</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.timelineEvents.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No timeline events found. Create one to get started.
                </td>
              </tr>
            ) : (
              sortedTimelineEvents.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <SequenceEditor collection="timelineEvents" id={t.id} initialSequence={t.sequence || 999} />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {t.images.slice(0, 3).map((img, i) => (
                         <img key={i} src={img} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                      ))}
                      {t.images.length > 3 && <span style={{ color: '#888', fontSize: '0.8rem', alignSelf: 'center' }}>+{t.images.length - 3}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{t.title}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>{t.date}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                    <Link href={`/admin/timeline/${t.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteTimelineEvent(t.id);
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
