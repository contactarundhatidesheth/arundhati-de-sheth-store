'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TimelineClient({ timelineEvents }: { timelineEvents: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.clientHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled within the container
      const scrollDelta = scrollY - containerTop;
      const maxScrollVertical = containerHeight - windowHeight;
      
      if (scrollDelta >= 0 && scrollDelta <= maxScrollVertical) {
        // We are inside the sticky section
        const progress = scrollDelta / maxScrollVertical;
        
        // Calculate max horizontal scroll
        const trackWidth = trackRef.current.scrollWidth;
        const maxScrollHorizontal = trackWidth - window.innerWidth;
        
        setTranslateX(-(progress * maxScrollHorizontal));
      } else if (scrollDelta < 0) {
        setTranslateX(0);
      } else if (scrollDelta > maxScrollVertical) {
        const trackWidth = trackRef.current.scrollWidth;
        const maxScrollHorizontal = trackWidth - window.innerWidth;
        setTranslateX(-maxScrollHorizontal);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)' }}>
      {/* 
        The container height dictates how much vertical scrolling is required 
        to complete the horizontal panning. We use 100vh per item for a smooth pace.
      */}
      <div 
        ref={containerRef} 
        style={{ 
          position: 'relative', 
          height: `${(timelineEvents.length + 1) * 100}vh`,
          background: 'var(--bg-primary)'
        }}
      >
        <div 
          style={{ 
            position: 'sticky', 
            top: '80px', 
            height: 'calc(100vh - 80px)', 
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div 
            ref={trackRef}
            style={{ 
              display: 'flex',
              gap: '120px',
              padding: '0 10vw 0 10vw', // Start with offset, end with standard offset
              transform: `translateX(${translateX}px)`,
              willChange: 'transform',
              transition: 'transform 0.1s ease-out' // Small smoothing
            }}
          >
            {/* Intro Slide */}
            <div style={{ width: '400px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Brand Journey
              </p>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, lineHeight: 1.1, color: '#000' }}>
                A Decade of<br />Expert Curation.
              </h1>
              <p style={{ marginTop: '24px', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, fontWeight: 300 }}>
                Scroll to explore the evolution of our fine jewellery narrative.
              </p>
            </div>

            {/* Timeline Events */}
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id} 
                style={{ 
                  width: 'clamp(800px, 85vw, 1400px)', 
                  flexShrink: 0, 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: '60px',
                  alignItems: 'center',
                  height: 'calc(100vh - 80px)'
                }}
              >
                <div style={{ width: '55%', height: '75vh', display: 'flex', gap: '20px', background: 'transparent', overflow: 'hidden', paddingBottom: '0' }}>
                  {event.images && event.images.length > 0 && event.images.map((imgSrc: string, imgIndex: number) => (
                    <div key={imgIndex} style={{ position: 'relative', height: '100%', flex: 1, minWidth: 0, overflow: 'hidden' }}>
                      <Image 
                        src={imgSrc}
                        alt={`${event.title} image ${imgIndex + 1}`}
                        fill
                        unoptimized
                        style={{ objectFit: 'contain', borderRadius: '4px' }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ width: '45%', padding: '0 20px' }}>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.1 }}>
                    {event.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '24px', fontWeight: 500 }}>
                    {event.date}
                  </p>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px', maxWidth: '500px' }}>
                    {event.description}
                  </p>
                  {event.link && event.link !== '#' && (
                    <Link 
                      href={event.link}
                      style={{
                        display: 'inline-block',
                        color: 'var(--text-main)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.75rem',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--accent-gold)',
                        paddingBottom: '6px',
                        transition: 'opacity 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.6'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      Discover More
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* Outro Logo Slide */}
            <div style={{ width: '40vw', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)', opacity: 0.9 }}>
                <Image 
                  src="/brand/logo-black.png" 
                  alt="Arundhati De-Sheth Logo" 
                  fill 
                  unoptimized
                  style={{ objectFit: 'contain' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
