'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/lib/db';

const VIDEOS = [
    { id: "Eq5pvXOYCBQ", title: "A Love For Exquisite Jewels With Arundhati De-Sheth" },
    { id: "gceVmPM0jPM", title: "Arundhati De-Sheth | France Alumni Ambassador 2021-23" },
    { id: "8Nox5-GGDus", title: "Everyday Diamond Essentials | Vogue India x Natural Diamond" },
    { id: "ef33KBbhz-c", title: "In conversation with Arundhati De Seth" }
];

export default function WhatsNewClient({ blogs }: { blogs: Blog[] }) {
    // Sort blogs by sequence 
    const sortedBlogs = [...blogs].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

    return (
        <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', paddingBottom: '120px' }}>

            {/* Hero Header */}
            <section style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden', background: '#000' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                    <img
                        src="/brand/logo-white.png"
                        alt="Press & Editorial"
                        style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 1, padding: '40px' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)' }} />
                </div>
                <div style={{ position: 'absolute', bottom: 'clamp(30px, 5vw, 60px)', left: 'clamp(20px, 5vw, 60px)', right: '20px', zIndex: 10 }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        fontWeight: '300',
                        fontFamily: 'var(--font-serif)',
                        color: '#fff',
                        margin: '0 0 16px 0',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        fontStyle: 'italic'
                    }}>
                        Press
                    </h1>
                    <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontWeight: '300', maxWidth: '560px', marginBottom: '32px' }}>
                        A selection of editorial features, interviews, and celebrity stylings.
                    </p>
                </div>
            </section>

            {/* 1. In The News */}
            <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px 80px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
                    {sortedBlogs.map((article, idx) => (
                        <a key={article.id || idx} href={article.link || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '24px', background: '#F5F5F5' }}>
                                <Image src={article.image || '/brand/logo-black.png'} alt={article.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <h3 style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', fontWeight: '400', marginBottom: '16px' }}>
                                {article.title}
                            </h3>
                            <p style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', color: '#666', marginTop: 'auto' }}>
                                {article.publication}
                            </p>
                        </a>
                    ))}
                </div>
            </section>

            {/* 2. WATCH */}
            <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
                <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '64px', textAlign: 'center' }}>
                    WATCH
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
                    {VIDEOS.map((video) => (
                        <div key={video.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '24px' }}>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                            <h3 style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', fontWeight: '400' }}>
                                {video.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Seen On */}
            <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>
                <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '80px', textAlign: 'center' }}>
                    Seen On
                </h2>

                {/* Disha Patani */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/disha2.jpg" alt="Disha Patani" fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Disha Patani</h4>
                        <h6 style={{ fontSize: '19.1px', fontFamily: 'var(--font-serif)', marginBottom: '32px', color: '#666' }}>for Cosmopolitan, Feb &apos;20</h6>
                        <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
                        <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
                            Disha Patani is on the cover of Cosmopolitan India in rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black enamel detailing and colourless diamond solitaires.
                        </p>
                        <Link href="https://www.arundhatidesheth.com/pages/disha-patani" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
                            See More
                        </Link>
                    </div>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/disha1.jpg" alt="Disha Patani" fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Alia Bhatt */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/alia2.jpg" alt="Alia Bhatt" fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Alia Bhatt</h4>
                        <h6 style={{ fontSize: '19.1px', fontFamily: 'var(--font-serif)', marginBottom: '32px', color: '#666' }}>styled in Rings from Arundhati&apos;s line at Le Mill<br />for Filmfare 2019</h6>
                        <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
                        <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
                            She is wearing multiple rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black and white enamel detailing and colourless diamond solitaires. The pieces are contemporary and extremely easy to wear daily, or for occasions.
                        </p>
                        <Link href="https://www.arundhatidesheth.com/pages/alia-bhatt-for-filmfare-glamour-style-awards-2019" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
                            See More
                        </Link>
                    </div>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/alia1.jpg" alt="Alia Bhatt" fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Priyanka Chopra */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/PC_Reception_Mumbai.jpg" alt="Priyanka Chopra" fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ textAlign: 'center', padding: '0 24px' }}>
                        <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Priyanka Chopra Wedding Reception</h4>
                        <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
                        <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '16px' }}>
                            A last-minute phone call from Bride - Priyanka Chopra&apos;s garment designers, led to a 48-hour hunt, identifying jewellery pieces for the ace actor&apos;s glamorous Mumbai reception for her Bollywood fraternity.
                        </p>
                        <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
                            She wore a two-row diamond rivière necklace with two magnificent, yellow cut-cornered Cushion-shaped diamonds, Classic Diamond drop earrings featuring a pair of stellar natural Yellow hexagonal-shaped diamonds and a ring with a fancy yellow 7 carat cushion-cut diamond center.
                        </p>
                        <Link href="https://www.arundhatidesheth.com/pages/priyanka-chopra" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
                            See More
                        </Link>
                    </div>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                        <Image src="/whatsnewimages/IMG-5690.jpg" alt="Jewelry" fill style={{ objectFit: 'cover' }} />
                    </div>
                </div>

            </section>

            <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
}
