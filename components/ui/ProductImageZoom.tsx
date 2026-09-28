'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageZoomProps {
    src: string;
    alt: string;
    zoomFactor?: number;
    loupeDiameter?: number;
}

export default function ProductImageZoom({
    src,
    alt,
    zoomFactor = 2.5,
    loupeDiameter = 180,
}: ProductImageZoomProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // pos: cursor position and container size in pixels
    const [pos, setPos] = useState<{
        cx: number; cy: number; cw: number; ch: number;
    } | null>(null);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setIsDesktop(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!containerRef.current || !isDesktop) return;
            const rect = containerRef.current.getBoundingClientRect();
            setPos({
                cx: e.clientX - rect.left,
                cy: e.clientY - rect.top,
                cw: rect.width,
                ch: rect.height,
            });
        },
        [isDesktop],
    );

    const handleMouseLeave = useCallback(() => setPos(null), []);

    const half = loupeDiameter / 2;

    // Clamp loupe centre so the circle stays inside the image bounds
    const loupeCx = pos ? Math.max(half, Math.min(pos.cw - half, pos.cx)) : 0;
    const loupeCy = pos ? Math.max(half, Math.min(pos.ch - half, pos.cy)) : 0;

    // ── Background-image approach (pixel-accurate, no transform-origin issues) ──
    //
    // The image is rendered at (cw × zoom) × (ch × zoom) inside the circle.
    // We want the pixel at (cx, cy) to land at (half, half) in the circle.
    //
    //   bgX = half  −  cx × zoom
    //   bgY = half  −  cy × zoom
    //
    // CSS background-position with explicit px values uses the offset from
    // the background-positioning-area's top-left, so this is direct and correct.
    const bgX = pos ? half - pos.cx * zoomFactor : 0;
    const bgY = pos ? half - pos.cy * zoomFactor : 0;
    const bgW = pos ? pos.cw * zoomFactor : 0;
    const bgH = pos ? pos.ch * zoomFactor : 0;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                cursor: isDesktop ? 'crosshair' : 'default',
            }}
        >
            {/* ── Full product image ── */}
            <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: 'contain', userSelect: 'none' }}
                priority
                draggable={false}
            />

            {/* ── Circular loupe (desktop + hover only) ── */}
            {isDesktop && pos !== null && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        left: loupeCx - half,
                        top: loupeCy - half,
                        width: loupeDiameter,
                        height: loupeDiameter,
                        borderRadius: '50%',

                        // The zoomed image as a background, pixel-positioned
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${bgW}px ${bgH}px`,
                        backgroundPosition: `${bgX}px ${bgY}px`,

                        // Loupe border & shadow
                        border: '2px solid rgba(255,255,255,0.9)',
                        outline: '1px solid rgba(0,0,0,0.15)',
                        boxShadow: '0 6px 30px rgba(0,0,0,0.2)',

                        pointerEvents: 'none',
                        zIndex: 20,
                    }}
                />
            )}

            {/* ── Zoom-in hint icon ── */}
            {isDesktop && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        bottom: 14,
                        right: 14,
                        background: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(4px)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '50%',
                        width: 34,
                        height: 34,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        opacity: pos ? 0 : 1,
                        transition: 'opacity 0.18s ease',
                        pointerEvents: 'none',
                        zIndex: 5,
                    }}
                >
                    <svg
                        width="15" height="15" viewBox="0 0 24 24"
                        fill="none" stroke="#555" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                </div>
            )}
        </div>
    );
}
