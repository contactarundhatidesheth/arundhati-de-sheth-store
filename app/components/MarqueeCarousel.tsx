'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function MarqueeCarousel({ images }: { images: string[] }) {
    const [isPaused, setIsPaused] = useState(false);

    if (!images || images.length === 0) return null;

    return (
        <>
            <div style={{ width: '100vw', overflow: 'hidden', marginBottom: '40px', position: 'relative' }}>
                <div className="marquee-track" style={{ display: 'flex', width: 'max-content', gap: '24px', padding: '0 12px', animationPlayState: isPaused ? 'paused' : 'running' }}>
                    {[...images, ...images].map((src, i) => (
                        <div key={i} style={{ position: 'relative', width: 'clamp(280px, 30vw, 420px)', aspectRatio: '3/4', background: '#f5f5f5', flexShrink: 0 }}>
                            <Image src={src} alt={`Feature Image ${i + 1}`} fill sizes="420px" style={{ objectFit: 'cover' }} quality={90} unoptimized={src.startsWith('http')} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '64px', width: '100%' }}>
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    style={{ background: 'transparent', border: '1px solid #ddd', color: '#666', padding: '10px 32px', borderRadius: '30px', cursor: 'pointer', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.color = '#000'; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#666'; }}
                >
                    {isPaused ? 'Resume Gallery' : 'Pause Gallery'}
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }
          .marquee-track {
            animation: marquee 20s linear infinite;
          }
        `
            }} />
        </>
    );
}
