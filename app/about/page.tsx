'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

/* ─────────────────────────────────────────────────────────
   Sticky "How We Help" panel — same mechanic as Hero
───────────────────────────────────────────────────────── */
const SERVICES = ['Sourcing', 'Curation', 'Negotiation', 'Consolidation'];

function HowWeHelpSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Fire staggered entrance once when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on the image while the panel is pinned
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
    <section
      ref={sectionRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
      }}
    >
      {/* ── Left: animated text panel ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '36px',
        padding: 'clamp(48px, 8vw, 96px)',
      }}>

        {/* Heading */}
        <div style={{ overflow: 'hidden' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            lineHeight: 1.15,
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity: visible ? 1 : 0,
            transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease',
          }}>
            How we help<br />our clients?
          </h2>
        </div>

        {/* Gold accent line */}
        <div style={{
          width: visible ? '48px' : '0px',
          height: '1px',
          background: 'var(--accent)',
          transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1) 120ms',
        }} />

        {/* Service words — cascading stagger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {SERVICES.map((svc, i) => (
            <div key={svc} style={{ overflow: 'hidden' }}>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--text-main)',
                lineHeight: 2.6,
                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                opacity: visible ? 1 : 0,
                transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${200 + i * 90}ms, opacity 0.85s ease ${200 + i * 90}ms`,
              }}>
                {svc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 600ms, opacity 0.85s ease 600ms',
          }}>
            <Link href="/contact" className="hwh-cta">
              Know More
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right: full-bleed image with parallax drift ── */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
        <div style={{
          position: 'absolute',
          inset: '-10% 0',
          transform: `translateY(${parallaxY}px)`,
          transition: 'transform 0.08s linear',
        }}>
          <img
            src="https://www.arundhatidesheth.com/cdn/shop/files/image_1_0caa02f1-d125-49c8-8ff5-12951894228a.jpg?v=1710832955"
            alt="How we help our clients"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <style jsx>{`
        .hwh-cta {
          display: inline-block;
          padding: 15px 32px;
          border: 1px solid #d4af37;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.78rem;
          font-family: var(--font-sans);
          text-decoration: none;
          transition: background 0.35s ease, color 0.35s ease;
        }
        .hwh-cta:hover {
          background: #d4af37;
          color: #fff;
          opacity: 1;
        }
        @media (max-width: 900px) {
          .hwh-section {
            grid-template-columns: 1fr !important;
            height: auto !important;
            min-height: 100vh;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   About Page
   Layering:
     zIndex 0 (sticky)  → About Hero
     zIndex 1 (scrolls) → Journey + Confluence sections
     zIndex 0 (sticky)  → HowWeHelpSection (pins like hero)
     zIndex 1 (scrolls) → JewelArt + Testimonials (slides over panel)
───────────────────────────────────────────────────────── */
import { useCMSData } from '@/hooks/useCMSData';

export default function AboutPage() {
  const { data, loading } = useCMSData();
  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-main)' }}>

      {/* ── Layer 0: Sticky About Hero ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        height: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center' }}>
          {/* Left Image */}
          <div className="hero-img-left" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '45%', aspectRatio: '3/4', zIndex: 1 }}>
            <img
              src="https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1708934384&width=1000"
              alt="Model Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>
          {/* Right Image */}
          <div className="hero-img-right" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '45%', aspectRatio: '3/4', zIndex: 1 }}>
            <img
              src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=1000"
              alt="Hand holding necklace"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>
          {/* Center ivory card */}
          <div className="hero-overlay" style={{ position: 'relative', zIndex: 10, background: 'rgba(0, 0, 0, 0.4)', padding: '64px 48px', width: '100%', maxWidth: '500px', margin: '40px 0', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center', backdropFilter: 'blur(4px)' }}>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px', color: '#FFFFFF' }}>
              About Us
            </h1>
            <p style={{ fontSize: '1rem', color: '#FFFFFF', lineHeight: '1.8' }}>
              At Arundhati De-Sheth, we harmoniously blend elegance and trends, bridging timeless sophistication with contemporary allure. Our curated fine jewellery pieces tell unique personal stories, celebrating the essence of each wearer.
            </p>
          </div>
        </div>
      </div>

      {/* ── Layer 1: Slides over hero ── */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>

          {/* 1. Arundhati's Journey */}
          <section className="editorial-block" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '160px' }}>
            <div style={{ aspectRatio: '3/4', width: '100%', overflow: 'hidden' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/DSC00807.jpg?v=1744025659" alt="Arundhati De-Sheth" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Arundhati&apos;s Journey</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <p>Arundhati De-Sheth is an expert on contemporary fine jewellery. She works with connoisseurs and aspiring collectors from around the world curating keepsakes for their private collections and often crafting individualistic jewels that bring out the personality of its wearer.</p>
                <p>In a world driven by hyper marketing, Arundhati&apos;s thoughtful approach sits on the opposite end of the spectrum — a purveyor of slow luxury, her endeavour is to show lasting pieces that can be enjoyed through the many phases of life, and then passed down to the next generation.</p>
                <p>Having graduated from the top-rated ESSEC Business School in Paris and selected to the prestigious LVMH program to specialise in Luxury Brand Management, Arundhati&apos;s first tryst with exceptional jewellery and jewelled watches was in 2008 whilst working at the Cartier Middle-East and Asia Headquarters in Dubai. Post graduation, Arundhati began working for New York-based Engagement ring specialist A. JAFFE, as they opened their first boutique in Mumbai. She continued to stay in touch with jewellery happenings from around the world by profiling the leading brands for various high-end media in India.</p>
                <p>Her unwavering interest in high jewellery also took her to the Cannes Film Festival in the summer of 2011, where she had intimate interviews and tête-à-têtes with the owners and artistic directors of Chopard and De Grisogono, to name a few. Her next role as a high jewellery sales expert with Nirav Modi allowed her to travel the world to meet connoisseurs, all the while learning about manufacturing and design from the sharpest minds in the business. This role gave her the much-needed education and exposure to the high and fine jewellery appetite of the Indian consumer. Her move to a professional jewellery advisor in August 2018 was a culmination of her focused experience garnered over a decade.</p>
              </div>
            </div>
          </section>

          {/* 2. Jewellery Confluence */}
          <section style={{ marginBottom: '160px', textAlign: 'center' }}>
            <div style={{ width: '100%', height: '60vh', overflow: 'hidden', marginBottom: '64px' }}>
              <img src="https://www.arundhatidesheth.com/cdn/shop/files/maxresdefault_1.jpg?v=1710148177" alt="Jewellery Video Poster" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Jewellery Confluence</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <p>Armed with over a decade of knowledge and experience, enhanced by a natural eye for inimitable design, Arundhati De-Sheth has been consistently committed to bringing together fine jewellery pieces from a variety of sources under her platform. She fuses her appreciation for masterful pieces and a carefully honed network of handpicked designers with a thoughtful approach to design. Arundhati&apos;s consultancy meticulously guides like-minded aesthetes as they traverse through the universe of fine jewellery. She aims to be the bridge between jewellery enthusiasts and pieces that are as well-made and wearable as they are timeless and qualitative.</p>
                <p>Her repertoire of services includes advising and acquiring standout pieces for clients, consolidating their existing personal collections, and introducing them to new-age artists. Arundhati strives to understand the deeply unique needs of each client, personally curating design-led jewellery from a close-knit cluster of superlative designers, each with a distinct point of view. Tallin Jewels, GYAN, Studio Renn, Sajjanté, Ananya, V A K, Heeramaneck &amp; Son, Umrao Jewels and Hanut Singh are some of the handpicked brands she works closely with.</p>
                <p>The bijouterie maven also works with high-end workshops in Mumbai and Jaipur to create one-of-a-kind commissioned pieces, engagement rings and resetting of special stones; often inspired by vintage European and American design languages. She also stocks a collection of exquisite masterpieces ready to be added to her clients&apos; collections. In contrast to the majority of players in India&apos;s jewellery, diamond and gemstone industry who hail from generational businesses, Arundhati&apos;s non-jewellery family background allows her a fresh, unbiased perspective. Her curatorial skills are akin to a gallerist, only furthered by a global aesthetic, keen eye, and intuitive understanding of contemporary Indian jewellery.</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Layer 0: Sticky "How We Help" panel — pins like hero ── */}
      <HowWeHelpSection />

      {/* ── Layer 1: Slides over the How We Help panel ── */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>

          {/* 3. Annual JewelArt Show */}
          <section style={{ marginBottom: '160px', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Annual &apos;JewelArt&apos; Show</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                <p>Arundhati views jewellery as a form of storytelling through the medium of wearable art — a perspective that has secured her collectors from India and around the world. She was keen to curate a show where like-minded jewellery lovers and buyers could view and shop from her selections under one roof.</p>
                <p>The first show in 2018 was a contemporary fine jewellery edit for Cecilia Morelli Parikh&apos;s multi-designer store Le Mill… Since then, the annual show is now hosted at the leading Indian auction house Pundoles, in Mumbai&apos;s historic neighbourhood of Ballard Estate. Each year is themed differently, to capture the zeitgeist while spotlighting contemporary fine jewellery designers alongside original pieces Arundhati specially creates for the occasion.</p>
                <p>In 2023, Arundhati took her annual show from Mumbai to Bangalore as well. Organizing this show for several years in Mumbai, she is excited to take it to different cities across the country.</p>
              </div>
            </div>
          </section>

          {/* 4. Testimonials */}
          <section style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '64px' }}>Testimonials</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {data.testimonials.map(t => (
                <div key={t.id} className="testimonial-box">
                  <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '24px', color: 'var(--text-main)' }}>
                    &quot;{t.quote}&quot;
                  </p>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>– {t.author}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .testimonial-box {
          background: var(--bg-secondary);
          padding: 48px 32px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .hero-img-left, .hero-img-right {
            position: relative !important;
            width: 100% !important;
            transform: none !important;
            margin-bottom: 24px;
          }
          .hero-overlay {
            margin: 0 !important;
          }
          .editorial-block {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
