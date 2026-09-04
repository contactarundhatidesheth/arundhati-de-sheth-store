import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteBlog } from '@/app/admin/actions';
import SequenceEditor from '../SequenceEditor';

export default async function AdminBlogs() {
  const db = await readDB();
  const sortedBlogs = [...db.blogs].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Press & Blogs</h1>
        <Link href="/admin/blogs/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Press Article
        </Link>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Cover</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Publication</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.blogs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No press articles found. Create one to get started.
                </td>
              </tr>
            ) : (
              sortedBlogs.map(b => (
                <tr key={b.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <SequenceEditor collection="blogs" id={b.id} initialSequence={b.sequence ?? ''} />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <img src={b.image} alt={b.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{b.publication}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>{b.title}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                    <Link href={`/admin/blogs/${b.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteBlog(b.id);
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
