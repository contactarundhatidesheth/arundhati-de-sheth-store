import React from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';

export const metadata = {
  title: 'Privacy Policy | Arundhati De-Sheth',
  description: 'Privacy policy for Arundhati De-Sheth fine jewellery consultancy.',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </div>
      </section>

      <Section background="primary" padding="lg">
        <Container maxWidth="800px">

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '300' }}>
            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>1. Introduction</h2>
              <p style={{ color: 'var(--text-muted)' }}>Sashaa Global LLP (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you when you visit our website.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>2. Information We Collect</h2>
              <p style={{ color: 'var(--text-muted)' }}>We may collect personal information such as your name, email address, phone number, and inquiry details when you contact us through our website or WhatsApp. This information is used solely to respond to your inquiry and provide our consultancy services.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>3. How We Use Your Information</h2>
              <p style={{ color: 'var(--text-muted)' }}>Your information is used to respond to inquiries, process bespoke commissions, arrange private viewings, and provide customer support. We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>4. Data Security</h2>
              <p style={{ color: 'var(--text-muted)' }}>We implement appropriate security measures to protect your personal information. All inquiries are handled with strict confidentiality, in keeping with the exclusive nature of our client relationships.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>5. Contact Us</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                For any privacy-related inquiries, please contact us at <Link href="mailto:contact@arundhatidesheth.com" style={{ color: 'var(--text-main)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>contact@arundhatidesheth.com</Link> or via WhatsApp at +91 95818 22000.
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
