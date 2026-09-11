'use client';
import React, { useState } from 'react';

export function DeletableImageHelper({ defaultUrl, name }: { defaultUrl: string, name: string }) {
    const [url, setUrl] = useState(defaultUrl || '');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {url && (
                <div style={{ position: 'relative', width: 'fit-content' }}>
                    <img src={url} alt="Current" style={{ height: '100px', borderRadius: '4px', border: '1px solid #ddd', objectFit: 'cover' }} />
                    <button type="button" onClick={() => setUrl('')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e00000', color: 'white', borderRadius: '50%', width: '24px', height: '24px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
                </div>
            )}
            <input type="url" name={name} value={url} onChange={e => setUrl(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }} placeholder="Provide Image URL (https://...) or leave blank to delete" />
        </div>
    )
}

export function DeletableImageListHelper({ defaultUrls, name }: { defaultUrls: string[], name: string }) {
    const [rawText, setRawText] = useState((defaultUrls || []).join(', '));
    const urls = rawText.split(',').map(s => s.trim()).filter(Boolean);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {urls.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
                    {urls.map((u, i) => (
                        <div key={`${u}-${i}`} style={{ position: 'relative', width: 'fit-content' }}>
                            <img src={u} alt={"Image " + i} style={{ height: '100px', minWidth: '100px', borderRadius: '4px', border: '1px solid #ddd', objectFit: 'cover' }} />
                            <button type="button" onClick={() => {
                                const newUrls = urls.filter((_, idx) => idx !== i);
                                setRawText(newUrls.join(', '));
                            }} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e00000', color: 'white', borderRadius: '50%', width: '24px', height: '24px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&times;</button>
                        </div>
                    ))}
                </div>
            )}
            <input type="text" name={name} value={rawText} onChange={e => setRawText(e.target.value)} style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }} placeholder="Paste image URLs separated by commas..." />
        </div>
    )
}
