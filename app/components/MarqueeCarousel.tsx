'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function MarqueeCarousel({ images }: { images: string[] }) {
    const [isPaused, setIsPaused] = useState(false);

    if (!images || images.length === 0) return null;

    // Filter out duplicates if any
    const uniqueImages = Array.from(new Set(images.map((img) => img.trim()))).filter(Boolean);

    // If 3 or fewer images, display a clean, centered responsive gallery without repetition or scrolling
    if (uniqueImages.length <= 3) {
        return (
            <div
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto 64px auto',
                    padding: '0 24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '24px',
                }}
            >
                {uniqueImages.map((src, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'relative',
                            width: 'clamp(280px, 28vw, 380px)',
                            aspectRatio: '3/4',
                            background: '#f5f5f5',
                            flexShrink: 0,
                            borderRadius: '4px',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Feature Image ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 380px"
                            style={{ objectFit: 'cover' }}
                            quality={90}
                            unoptimized={src.startsWith('http')}
                        />
                    </div>
                ))}
            </div>
        );
    }

    // 4 or more images: display infinite marquee slider
    return (
        <>
            <div style={{ width: '100vw', overflow: 'hidden', marginBottom: '40px', position: 'relative' }}>
                <div
                    className="marquee-track"
                    style={{
                        display: 'flex',
                        width: 'max-content',
                        gap: '24px',
                        padding: '0 12px',
                        animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                >
                    {[...uniqueImages, ...uniqueImages].map((src, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'relative',
                                width: 'clamp(280px, 30vw, 420px)',
                                aspectRatio: '3/4',
                                background: '#f5f5f5',
                                flexShrink: 0,
                                borderRadius: '4px',
                                overflow: 'hidden',
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Feature Image ${i + 1}`}
                                fill
                                sizes="420px"
                                style={{ objectFit: 'cover' }}
                                quality={90}
                                unoptimized={src.startsWith('http')}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '64px', width: '100%' }}>
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    style={{
                        background: 'transparent',
                        border: '1px solid #ddd',
                        color: '#666',
                        padding: '10px 32px',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        fontFamily: 'Figtree, sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#000';
                        e.currentTarget.style.color = '#000';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#ddd';
                        e.currentTarget.style.color = '#666';
                    }}
                >
                    {isPaused ? 'Resume Gallery' : 'Pause Gallery'}
                </button>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 12px)); }
          }
          .marquee-track {
            animation: marquee 20s linear infinite;
          }
        `,
                }}
            />
        </>
    );
}
