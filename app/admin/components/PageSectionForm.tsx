'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { savePageSection } from '@/app/admin/actions';

export default function PageSectionForm({
    sectionId,
    titlePrefix,
    initialData,
    showSubtitle = false,
    showImage = false,
    showLink = false
}: {
    sectionId: string;
    titlePrefix: string;
    initialData: any;
    showSubtitle?: boolean;
    showImage?: boolean;
    showLink?: boolean;
}) {
    const [loading, setLoading] = useState(false);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Edit {titlePrefix}</h1>
                <Link href="/admin/blogs" style={{ color: '#666', textDecoration: 'underline' }}>Back to Press & Blogs</Link>
            </div>

            <form
                action="/api/actions/savePageSection" // This will be handled by server action via action prop
                onSubmit={() => setLoading(true)}
                method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}
            >
                <input type="hidden" name="id" value={sectionId} />
                {initialData?.image && <input type="hidden" name="image" value={initialData.image} />}

                {showImage && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Image {initialData?.image && "(Upload new to replace)"}</label>
                        {initialData?.image && (
                            <img src={initialData.image} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                        )}
                        <input type="file" name="imageFile" accept="image/*" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Title</label>
                    <input type="text" name="title" defaultValue={initialData?.title || ''} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                {showSubtitle && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Subtitle</label>
                        <input type="text" name="subtitle" defaultValue={initialData?.subtitle || ''} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Description</label>
                    <textarea name="description" defaultValue={initialData?.description || ''} rows={4} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>

                {showLink && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Action Link</label>
                        <input type="text" name="link" defaultValue={initialData?.link || ''} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                )}

                <button type="submit" disabled={loading} style={{ background: '#111', color: '#fff', padding: '16px', borderRadius: '4px', border: 'none', cursor: loading ? 'wait' : 'pointer', fontSize: '1rem', marginTop: '16px' }}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}
