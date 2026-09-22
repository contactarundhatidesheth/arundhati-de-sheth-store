import React from 'react';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import MarqueeCarousel from '@/app/components/MarqueeCarousel';

export const revalidate = 0; // Ensures fresh data load

export default async function AliaBhattPage() {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from('seen_on_features').select('*').ilike('title', '%Alia%').single();
    const images = data?.image1 ? data.image1.split(',').filter(Boolean) : [];

    return (
        <div style={{ background: '#fff', color: '#000', minHeight: '80vh', padding: '160px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#666', marginBottom: '24px' }}>Seen On</p>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '40px', fontWeight: 300, lineHeight: 1.2 }}>
                    {data?.title || 'Alia Bhatt for Filmfare Glamour & Style Awards 2019'}
                </h1>
                <div style={{ width: '40px', height: '1px', background: '#000', margin: '0 auto 64px' }} />
            </div>

            <MarqueeCarousel images={images} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '0 24px' }}>
                <p style={{ fontSize: '1.05rem', fontFamily: 'Figtree, sans-serif', lineHeight: '2.2', color: '#333', marginBottom: '84px', textAlign: 'left', maxWidth: '800px', margin: '0 auto', whiteSpace: 'pre-wrap' }}>
                    {data?.description || 'Loading...'}
                </p>

                <div style={{ textAlign: 'center', width: '100%' }}>
                    <Link href="/pages/whats-new" style={{ textDecoration: 'none', color: '#000', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', borderBottom: '1px solid #000', paddingBottom: '4px' }}>
                        &larr; Back to Press
                    </Link>
                </div>
            </div>
        </div>
    );
}
