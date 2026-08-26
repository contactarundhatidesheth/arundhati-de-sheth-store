'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { CuratedCollections } from '@/components/CuratedCollections';
import { SaleBanner } from '@/components/SaleBanner';
import { ProductCarousel } from '@/components/ui/ProductCarousel';
import { NewPieces } from '@/components/NewPieces';
import { OurPromises } from '@/components/OurPromises';


const FadeInSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

import { useCMSData } from '@/hooks/useCMSData';

export default function HomePage() {
  const { data, loading } = useCMSData();
  
  if (loading) return <div style={{ height: '100vh', background: 'var(--bg-primary)' }} />;

  const mostCoveted = data.products.slice(0, 8);
  const newArrivals = data.products.filter(p => p.isNew).slice(0, 4);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Hero />

      {/* Curated Collections */}
      <CuratedCollections />

      {/* Seasonal Sale */}
      <SaleBanner />

      {/* Most Coveted Pieces */}
      <FadeInSection>
        <section style={{ padding: 'var(--section-padding)', background: 'var(--bg-primary)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
            <ProductCarousel products={mostCoveted} title="Most Coveted Pieces" />
          </div>
        </section>
      </FadeInSection>

      {/* New Pieces */}
      <NewPieces />

      {/* Our Promises */}
      <OurPromises />
    </div>
  );
}
