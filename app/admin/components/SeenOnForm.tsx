'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { saveSeenOnFeature } from '@/app/admin/actions';
import { SeenOnFeature } from '@/lib/db';

export default function SeenOnForm({ initialData }: { initialData?: SeenOnFeature }) {
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>{initialData ? 'Edit Seen On Feature' : 'Add Seen On Feature'}</h1>
                <Link href="/admin/blogs" style={{ color: '#666', textDecoration: 'underline' }}>Back to Press & Blogs</Link>
            </div>

            <form
                action={saveSeenOnFeature}
                onSubmit={() => setLoading(true)}
                method="POST"
                encType="multipart/form-data"
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}
            >
                <input type="hidden" name="id" value={initialData?.id || ''} />
                {initialData?.image1 && <input type="hidden" name="image1" value={initialData.image1} />}
                {initialData?.image2 && <input type="hidden" name="image2" value={initialData.image2} />}
                {initialData?.sequence && <input type="hidden" name="sequence" value={initialData.sequence} />}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Main Image (Portrait format ideal)</label>
                    {initialData?.image1 && (
                        <img src={initialData.image1} alt="Current 1" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                    <input type="file" name="imageFile1" accept="image/*" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Secondary Image (Portrait format ideal)</label>
                    {initialData?.image2 && (
                        <img src={initialData.image2} alt="Current 2" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                    <input type="file" name="imageFile2" accept="image/*" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Celebrity Name</label>
                    <input type="text" name="title" defaultValue={initialData?.title || ''} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Subtitle / Occasion (e.g. for Cosmopolitan, Feb &apos;20)</label>
                    <input type="text" name="subtitle" defaultValue={initialData?.subtitle || ''} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Description Text</label>
                    <textarea name="description" defaultValue={initialData?.description || ''} rows={4} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>"See More" Link URL (optional)</label>
                    <input type="text" name="link" defaultValue={initialData?.link || ''} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <button type="submit" disabled={loading} style={{ background: '#111', color: '#fff', padding: '16px', borderRadius: '4px', border: 'none', cursor: loading ? 'wait' : 'pointer', fontSize: '1rem', marginTop: '16px' }}>
                    {loading ? 'Saving...' : 'Save Feature'}
                </button>
            </form>
        </div>
    );
}
