'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';

export interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
  image: string;
}

export interface TestimonialsProps {
  items?: TestimonialItem[];
}

const defaultItems: TestimonialItem[] = [
  {
    quote: 'The geometric symmetry and light weight of these designs make them my immediate choice every morning.',
    author: 'Sophia L',
    location: 'Mumbai',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=400',
  },
  {
    quote: 'Unparalleled refinement and lasting durability that truly elevates any outfit.',
    author: 'Marcus V',
    location: 'London',
    image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?v=1708934384&width=400',
  },
];

import { useCMSData } from '@/hooks/useCMSData';

export const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, loading } = useCMSData();
  
  // Use passed items if available, otherwise use DB items, fallback to empty array
  const displayItems = items || data.testimonials || [];

  const next = useCallback(() => {
    if (displayItems.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % displayItems.length);
  }, [displayItems.length]);

  const prev = useCallback(() => {
    if (displayItems.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  }, [displayItems.length]);

  useEffect(() => {
    if (displayItems.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, displayItems.length]);

  if (loading || displayItems.length === 0) {
    return <div style={{ minHeight: '400px', background: 'var(--bg-secondary)' }} />;
  }

  return (
    <Section background="secondary" padding="lg" style={{ background: 'var(--bg-secondary)', padding: '120px 24px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        
        {/* Left: Header */}
        <div>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', lineHeight: '1.2' }}>
            Client Impressions
          </h2>
        </div>

        {/* Right: Slider Card */}
        <div style={{ background: 'var(--bg-primary)', padding: '48px', display: 'flex', flexDirection: 'column', gap: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={displayItems[currentIndex].image} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '16px' }}>
                &ldquo;{displayItems[currentIndex].quote}&rdquo;
              </p>
              <p style={{ fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {displayItems[currentIndex].author}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
            <button
              onClick={prev}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-primary)',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>

            <button
              onClick={next}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-primary)',
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </Section>
  );
};
