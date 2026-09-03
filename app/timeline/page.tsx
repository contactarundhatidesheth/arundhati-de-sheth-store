'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TIMELINE_EVENTS } from '@/lib/data/timeline';

export default function TimelinePage() {
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
          height: `${TIMELINE_EVENTS.length * 100}vh`,
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
              padding: '0 50vw 0 10vw', // Start with offset, end with offset
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
            {TIMELINE_EVENTS.map((event, index) => (
              <div 
                key={event.id} 
                style={{ 
                  width: '600px', 
                  flexShrink: 0, 
                  display: 'flex', 
                  flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
                  gap: '40px',
                  justifyContent: 'center',
                  height: '80vh'
                }}
              >
                {event.images && event.images.length > 0 && (
                  <div style={{ display: 'flex', gap: '20px', width: '100%', height: '50vh', background: 'transparent', overflowX: 'auto', overflowY: 'hidden', paddingBottom: '10px', scrollbarWidth: 'thin' }}>
                    {event.images.map((imgSrc, imgIndex) => (
                      <div key={imgIndex} style={{ position: 'relative', height: '100%', minWidth: event.images.length > 1 ? '85%' : '100%', flexShrink: 0 }}>
                        <Image 
                          src={imgSrc}
                          alt={`${event.title} image ${imgIndex + 1}`}
                          fill
                          unoptimized
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-main)', marginBottom: '8px' }}>
                    {event.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '16px', fontWeight: 500 }}>
                    {event.date}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, fontWeight: 300, marginBottom: '24px' }}>
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
                        paddingBottom: '4px',
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
          </div>
        </div>
      </div>
    </div>
  );
}
