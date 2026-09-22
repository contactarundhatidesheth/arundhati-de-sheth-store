'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { saveYoutubeVideo } from '@/app/admin/actions';
import { YoutubeVideo } from '@/lib/db';

export default function YoutubeForm({ initialData }: { initialData?: YoutubeVideo }) {
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>{initialData ? 'Edit Video' : 'Add New Video'}</h1>
                <Link href="/admin/blogs" style={{ color: '#666', textDecoration: 'underline' }}>Back to Press & Blogs</Link>
            </div>

            <form
                action={saveYoutubeVideo}
                onSubmit={() => setLoading(true)}
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}
            >
                <input type="hidden" name="id" value={initialData?.id || ''} />
                {initialData?.sequence && <input type="hidden" name="sequence" value={initialData.sequence} />}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Title</label>
                    <input type="text" name="title" defaultValue={initialData?.title || ''} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>YouTube Video ID (e.g. gceVmPM0jPM)</label>
                    <input type="text" name="video_id" defaultValue={initialData?.video_id || ''} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                <button type="submit" disabled={loading} style={{ background: '#111', color: '#fff', padding: '16px', borderRadius: '4px', border: 'none', cursor: loading ? 'wait' : 'pointer', fontSize: '1rem', marginTop: '16px' }}>
                    {loading ? 'Saving...' : 'Save Video'}
                </button>
            </form>
        </div>
    );
}
