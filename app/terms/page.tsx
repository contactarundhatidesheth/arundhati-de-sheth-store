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
    <Section background="primary" padding="lg">
      <Container maxWidth="800px">
        <FadeInSection>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '16px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '48px', fontWeight: '300' }}>
            Last updated: August 2026
          </p>
        </FadeInSection>

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
  );
}
