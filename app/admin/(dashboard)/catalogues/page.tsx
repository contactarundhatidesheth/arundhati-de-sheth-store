import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteCatalogue } from '@/app/admin/actions';
import SequenceEditor from '../SequenceEditor';

export default function AdminCatalogues() {
  const db = readDB();
  const sortedCatalogues = [...db.catalogues].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Catalogues & Lookbooks</h1>
        <Link href="/admin/catalogues/new" style={{ background: '#111', color: '#fff', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-block' }}>
          Add Catalogue
        </Link>
      </div>
      
      <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Cover</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Year</th>
              <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {db.catalogues.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                  No catalogues found. Create one to get started.
                </td>
              </tr>
            ) : (
              sortedCatalogues.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <SequenceEditor collection="catalogues" id={c.id} initialSequence={c.sequence || 999} />
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <img src={c.image} alt={c.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{c.title}</td>
                  <td style={{ padding: '16px 24px', color: '#666' }}>{c.year}</td>
                  <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                    <Link href={`/admin/catalogues/${c.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                    <form action={async () => {
                      'use server';
                      await deleteCatalogue(c.id);
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
