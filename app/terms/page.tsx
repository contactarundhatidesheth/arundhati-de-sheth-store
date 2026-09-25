import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';

export const metadata = {
  title: 'Terms of Service | Arundhati De-Sheth',
  description: 'Terms of service for Arundhati De-Sheth fine jewellery consultancy.',
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dense-logo-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <image href="/brand/logo-white.png" x="-25" y="-25" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dense-logo-pattern)" />
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)', zIndex: 2 }} />

        <div style={{ position: 'absolute', bottom: 'clamp(30px, 5vw, 60px)', left: 'clamp(20px, 5vw, 60px)', right: '20px', zIndex: 10 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '300',
            fontFamily: 'var(--font-serif)',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic'
          }}>
            Terms of Service
          </h1>
        </div>
      </section>

      <Section background="primary" padding="lg">
        <Container maxWidth="800px">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '300' }}>
            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>1. Acceptance of Terms</h2>
              <p style={{ color: 'var(--text-muted)' }}>By accessing this website or engaging our consultancy services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>2. Consultancy Services</h2>
              <p style={{ color: 'var(--text-muted)' }}>Arundhati De-Sheth operates as a fine jewellery consultancy. All pieces are bespoke or curated acquisitions, priced individually. Quotes are provided upon request following a private consultation. No piece is considered sold until a formal agreement is executed.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>3. Intellectual Property</h2>
              <p style={{ color: 'var(--text-muted)' }}>All content on this website, including images, designs, and text, is the property of Sashaa Global LLP and is protected by international copyright laws. Unauthorized use is prohibited.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>4. Limitation of Liability</h2>
              <p style={{ color: 'var(--text-muted)' }}>While we strive for accuracy, we do not warrant that the information on this website is complete, accurate, or current. We are not liable for any damages arising from the use of this website or our consultancy services.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>5. Governing Law</h2>
              <p style={{ color: 'var(--text-muted)' }}>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>6. Contact</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                For questions regarding these terms, please contact <Link href="mailto:contact@arundhatidesheth.com" style={{ color: 'var(--text-main)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>contact@arundhatidesheth.com</Link>.
              </p>
            </section>
          </div>

          <FadeInSection>
            <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', color: 'var(--text-main)', textDecoration: 'none' }}>
                ← Back to Home
              </Link>
            </div>
          </FadeInSection>
        </Container>
      </Section>
    </div>
  );
}
