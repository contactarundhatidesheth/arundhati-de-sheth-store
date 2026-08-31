'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useCMSData } from '@/hooks/useCMSData';

/* ─────────────────────────────────────────────────────────
   How We Help Section
───────────────────────────────────────────────────────── */
const SERVICES = ['Sourcing', 'Curation', 'Negotiation', 'Consolidation'];

function HowWeHelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handle = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / (viewH / 2);
      setParallaxY(progress * 50);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <section ref={sectionRef} className="hwh-section" style={{ position: 'sticky', top: 0, zIndex: 0, height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: '36px', padding: 'clamp(48px, 8vw, 96px)' }}>
        <div style={{ overflow: 'hidden' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.15, transform: visible ? 'translateY(0)' : 'translateY(110%)', opacity: visible ? 1 : 0, transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease' }}>
            How we help<br />our clients?
          </h2>
        </div>
        <div style={{ width: visible ? '48px' : '0px', height: '1px', background: 'var(--accent)', transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1) 120ms' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {SERVICES.map((svc, i) => (
            <div key={svc} style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-main)', lineHeight: 2.6, transform: visible ? 'translateY(0)' : 'translateY(110%)', opacity: visible ? 1 : 0, transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${200 + i * 90}ms, opacity 0.85s ease ${200 + i * 90}ms` }}>
                {svc}
              </p>
            </div>
          ))}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ transform: visible ? 'translateY(0)' : 'translateY(110%)', opacity: visible ? 1 : 0, transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 600ms, opacity 0.85s ease 600ms' }}>
            <Link href="/contact" className="hwh-cta">Know More</Link>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'absolute', inset: '-10% 0', transform: `translateY(${parallaxY}px)`, transition: 'transform 0.08s linear' }}>
          <img src="https://www.arundhatidesheth.com/cdn/shop/files/image_1_0caa02f1-d125-49c8-8ff5-12951894228a.jpg?v=1710832955" alt="How we help our clients" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <style>{`
        .hwh-cta { display: inline-block; padding: 15px 32px; border: 1px solid #d4af37; color: #d4af37; text-transform: uppercase; letter-spacing: 0.15em; font-size: 0.78rem; font-family: var(--font-sans); text-decoration: none; transition: background 0.35s ease, color 0.35s ease; }
        .hwh-cta:hover { background: #d4af37; color: #fff; opacity: 1; }
        @media (max-width: 768px) {
          .hwh-section { grid-template-columns: 1fr !important; height: auto !important; min-height: 100svh; }
          .hwh-section > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   About Page
───────────────────────────────────────────────────────── */
export default function AboutPage() {
  const { data, loading } = useCMSData();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Video autoplay failed:", e));
    }
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-main)' }}>

      {/* ── Hero: Full-bleed video background ── */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Video background — swapped to Drive video once downloaded */}
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          {/* Use local video once downloaded via download_about_assets.js */}
          <source src="/videos/about-video.mp4" type="video/mp4" />
          {/* Fallback to Shopify CDN video */}
          <source src="https://www.arundhatidesheth.com/cdn/shop/videos/c/vp/bd1c0827a8744a549b5e3e7bc2e9f745/bd1c0827a8744a549b5e3e7bc2e9f745.HD-1080p-7.2Mbps-36693499.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay - changed to subtle bottom gradient for text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 25%)' }} />

        {/* Hero text - bottom-left */}
        <div className="about-hero-text" style={{ position: 'absolute', bottom: '48px', left: '48px', zIndex: 2, textAlign: 'left', color: '#FFFFFF' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.7 }}>
            Fine Jewellery Consultancy
          </p>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.1, marginBottom: '16px' }}>
            Arundhati<br />De-Sheth
          </h1>
          <div style={{ width: '32px', height: '1px', background: '#d4af37' }} />
        </div>
      </div>

      {/* ── Arundhati&apos;s Journey ── */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <div className="about-journey" style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>

          <section className="editorial-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '160px' }}>
            <div style={{ aspectRatio: '3/4', width: '100%', overflow: 'hidden' }}>
              {/* Portrait — use local file once downloaded, falls back to Shopify CDN */}
              <img
                src="/images/arundhati-portrait.webp"
                alt="Arundhati De-Sheth"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.arundhatidesheth.com/cdn/shop/files/DSC00807.jpg?v=1744025659'; }}
              />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>Her Story</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '32px', fontWeight: 400 }}>Arundhati&apos;s Journey</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.9' }}>
                <p>Arundhati De-Sheth is an expert on contemporary fine jewellery. She works with connoisseurs and aspiring collectors from around the world curating keepsakes for their private collections and often crafting individualistic jewels that bring out the personality of its wearer.</p>
                <p>In a world driven by hyper marketing, Arundhati&apos;s thoughtful approach sits on the opposite end of the spectrum — a purveyor of slow luxury, her endeavour is to show lasting pieces that can be enjoyed through the many phases of life, and then passed down to the next generation.</p>
                <p>Having graduated from the top-rated ESSEC Business School in Paris and selected to the prestigious LVMH program to specialise in Luxury Brand Management, Arundhati&apos;s first tryst with exceptional jewellery was in 2008 whilst working at the Cartier Middle-East and Asia Headquarters in Dubai.</p>
                <p>Her unwavering interest in high jewellery also took her to the Cannes Film Festival in 2011, where she had intimate interviews with the owners and artistic directors of Chopard and De Grisogono. Her next role as a high jewellery sales expert with Nirav Modi allowed her to travel the world, learning about manufacturing and design from the sharpest minds in the business.</p>
              </div>
            </div>
          </section>

          {/* ── Jewellery Confluence: Video Section ── */}
          <section style={{ marginBottom: '160px' }}>
            <div className="confluence-video" style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden', marginBottom: '80px', borderRadius: '2px' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/maxresdefault_1.jpg?v=1710148177" alt="Jewellery Video" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
              <div className="confluence-caption" style={{ position: 'absolute', bottom: '48px', left: '48px' }}>
                <p style={{ color: '#FFFFFF', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.7 }}>Philosophy</p>
                <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>Jewellery Confluence</h2>
              </div>
            </div>
            <div className="confluence-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1100px', margin: '0 auto' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.9' }}>
                Armed with over a decade of knowledge and experience, enhanced by a natural eye for inimitable design, Arundhati De-Sheth has been consistently committed to bringing together fine jewellery pieces from a variety of sources under her platform. She fuses her appreciation for masterful pieces with a carefully honed network of handpicked designers.
              </p>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.9' }}>
                Her repertoire of services includes advising and acquiring standout pieces for clients, consolidating their existing personal collections, and introducing them to new-age artists. Arundhati strives to understand the deeply unique needs of each client, personally curating design-led jewellery from a close-knit cluster of superlative designers — Tallin Jewels, GYAN, Studio Renn, Sajjanté, Ananya, VAK, and Hanut Singh among them.
              </p>
            </div>
          </section>

        </div>
      </div>

      <style>{`
        .testimonial-box { background: var(--bg-secondary); padding: 48px 32px; border-radius: 2px; display: flex; flex-direction: column; justify-content: center; border-left: 2px solid #d4af37; }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; transform: scaleY(1); } 50% { opacity: 0.8; transform: scaleY(1.2); } }
        @media (max-width: 900px) {
          .editorial-block { grid-template-columns: 1fr !important; gap: 40px !important; }
          .confluence-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-journey { padding: 60px 16px !important; }
          .about-hero-text { bottom: 24px !important; left: 24px !important; }
          .confluence-video { height: 50vh !important; }
          .confluence-caption { bottom: 24px !important; left: 24px !important; }
        }
      `}</style>
    </div>
  );
}
