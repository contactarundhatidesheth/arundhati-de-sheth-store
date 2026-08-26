'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';
import { Container } from '@/components/ui/Container';

import { useCMSData } from '@/hooks/useCMSData';

export default function WhatsNewPage() {
  const { data, loading } = useCMSData();
  const pressItems = data.blogs;

  const whatsappMessage = encodeURIComponent("Hi, I'm interested in viewing your press features and lookbooks.");
  const whatsappLink = `${WHATSAPP_URL}?text=${whatsappMessage}`;

  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }} />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero Header */}
      <section style={{ position: 'sticky', top: 0, zIndex: 0, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A1A', overflow: 'hidden' }}>
        <Container maxWidth="800px" padding="0 24px" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
            Media & Publications
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--text-on-dark)' }}>
            Press & Features
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.8', fontWeight: '300', maxWidth: '520px', margin: '0 auto 40px' }}>
            A curated selection of editorial features, interviews, and mentions in leading publications.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <div>
          {pressItems.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <section key={item.id} style={{ position: 'sticky', top: 0, zIndex: idx + 10, minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'var(--section-padding)', background: isEven ? 'var(--bg-primary)' : 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <Container>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

                      {/* Image */}
                      <div style={{ position: 'relative', width: '100%', order: isEven ? 2 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ position: 'relative', height: '70vh', aspectRatio: '3/4', transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} className="catalogue-image">
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>

                      {/* Text Content */}
                      <div style={{ order: isEven ? 1 : 2 }}>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px' }}>
                          {item.publication} • {item.date}
                        </p>
                        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.1', letterSpacing: '-0.01em' }}>
                          {item.title}
                        </h2>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.9', marginBottom: '36px', fontWeight: '300', maxWidth: '420px' }}>
                          {item.excerpt}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          <Link href="#" className="btn-primary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <span>Read Article</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </Container>
                </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <section style={{ padding: 'var(--section-padding)', background: '#1A1A1A', color: '#FAF9F7', textAlign: 'center' }}>
          <Container center>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-strong)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px' }}>
              Begin a Conversation
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '200', marginBottom: '20px', fontFamily: 'var(--font-serif)', lineHeight: '1.2', color: 'var(--text-on-dark)' }}>
              Interested in a particular piece<br />or bespoke commission?
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.7', marginBottom: '40px', fontWeight: '300', maxWidth: '560px', margin: '0 auto 40px' }}>
              Each piece is crafted as a legacy creation. All inquiries are price on request — contact us directly for pricing, availability, and private studio appointments.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={whatsappLink} className="btn-dark-primary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>WhatsApp Advisory</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="btn-dark-secondary" style={{ borderRadius: 'var(--radius-sm)', display: 'inline-flex', alignItems: 'center' }}>
                <span>Contact Studio</span>
              </Link>
            </div>
          </Container>
        </section>
      </div>

      <style jsx global>{`
        .catalogue-image:hover {
          transform: scale(1.03);
        }
      `}</style>
    </div>
  );
}
