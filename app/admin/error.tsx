'use client';

import { useEffect } from 'react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Admin Module Exception:', error);
    }, [error]);

    return (
        <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>
            <h2 style={{ color: 'red', marginBottom: '16px', fontSize: '2rem' }}>Dashboard Module Halted</h2>
            <p style={{ marginBottom: '24px', color: '#666', fontFamily: 'Figtree, sans-serif' }}>
                {error.message.includes('maximum allowed size')
                    ? "File Upload Error: The image you attempted to save was too large. Please compress it safely under 2MB and try again."
                    : error.message.includes('mime type') || error.message.includes('format is not supported')
                        ? "File Upload Error: The image format (like AVIF) is not supported. Please upload a JPEG, PNG, or WebP image."
                        : "An unexpected backend error occurred during your request."}
            </p>
            <button
                onClick={() => reset()}
                style={{ padding: '12px 24px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Figtree, sans-serif' }}
            >
                Dismiss & Try Again
            </button>
        </div>
    );
}
