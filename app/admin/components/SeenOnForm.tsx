'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { saveSeenOnFeature } from '@/app/admin/actions';
import { SeenOnFeature } from '@/lib/db';

export default function SeenOnForm({ initialData }: { initialData?: SeenOnFeature }) {
    const [loading, setLoading] = useState(false);

    let existingImages: string[] = [];
    if (initialData?.image1) {
        if (initialData.image1.includes(',')) existingImages = initialData.image1.split(',').filter(Boolean);
        else existingImages = [initialData.image1];
    }
    if (initialData?.image2 && (!initialData?.image1 || !initialData.image1.includes(','))) {
        existingImages.push(initialData.image2);
    }

    const [images, setImages] = useState<string[]>(existingImages);

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const res = await saveSeenOnFeature(formData);
        if (res && res.error) {
            alert(res.error);
            setLoading(false);
        } else {
            window.location.href = '/admin/blogs';
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>{initialData ? 'Edit Seen On Feature' : 'Add Seen On Feature'}</h1>
                <Link href="/admin/blogs" style={{ color: '#666', textDecoration: 'underline' }}>Back to Press & Blogs</Link>
            </div>

            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}
            >
                <input type="hidden" name="id" value={initialData?.id || ''} />
                <input type="hidden" name="existing_images" value={images.join(',')} />
                {initialData?.sequence && <input type="hidden" name="sequence" value={initialData.sequence} />}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '500', fontSize: '0.9rem' }}>Feature Images (Multiple Supported)</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        {images.map((img, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                                <img src={img} alt={`Feature ${i}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                <button type="button" onClick={() => handleRemoveImage(i)} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', border: 'none', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' }}>×</button>
                            </div>
                        ))}
                    </div>
                    <input type="file" name="imageFiles" accept="image/*" multiple style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>You can select multiple files at once. They will be appended to the current list. The first 2 images will be used on the Overview card.</p>
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
                    <textarea name="description" defaultValue={initialData?.description || ''} rows={6} required style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', lineHeight: '1.5' }} />
                </div>

                {/* Link URL field completely automated out! */}

                <button type="submit" disabled={loading} style={{ background: '#111', color: '#fff', padding: '16px', borderRadius: '4px', border: 'none', cursor: loading ? 'wait' : 'pointer', fontSize: '1rem', marginTop: '16px' }}>
                    {loading ? 'Saving Feature...' : 'Save Seen On Feature'}
                </button>
            </form>
        </div>
    );
}
