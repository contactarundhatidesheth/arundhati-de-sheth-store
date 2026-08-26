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
    <Section background="primary" padding="lg">
      <Container maxWidth="800px">
        <FadeInSection>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', marginBottom: '16px', fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '48px', fontWeight: '300' }}>
            Last updated: August 2026
          </p>
        </FadeInSection>

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
  );
}
