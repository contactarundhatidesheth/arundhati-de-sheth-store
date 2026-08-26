import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Lock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeInSection } from '@/components/ui/FadeInSection';

export default function ShippingPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      <FadeInSection>
        <Section background="dark" padding="lg">
          <Container maxWidth="800px" center>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-subtle)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
              Client Policies
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: '300', marginBottom: '12px', fontFamily: 'var(--font-serif)', color: 'var(--text-on-dark)' }}>
              Shipping, Delivery & Returns
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.7', fontWeight: '300' }}>
              Our commitment to secure, fully insured transit and uncompromised fine jewellery care.
            </p>
          </Container>
        </Section>
      </FadeInSection>

      <FadeInSection>
        <Section background="primary" padding="lg">
          <Container>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px', marginBottom: '60px', background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', textAlign: 'center' }}>
                <Truck size={24} style={{ margin: '0 auto 16px', color: 'var(--text-main)' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: '400', color: 'var(--text-main)' }}>Insured Transit</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>100% insured delivery across India & international destinations.</p>
              </div>

              <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', textAlign: 'center' }}>
                <Lock size={24} style={{ margin: '0 auto 16px', color: 'var(--text-main)' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: '400', color: 'var(--text-main)' }}>Secure Dispatch</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Signature-required delivery for all high jewellery acquisitions.</p>
              </div>

              <div style={{ padding: '32px 24px', background: 'var(--bg-primary)', textAlign: 'center' }}>
                <ShieldCheck size={24} style={{ margin: '0 auto 16px', color: 'var(--text-main)' }} />
                <h4 style={{ fontSize: '1rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: '400', color: 'var(--text-main)' }}>BIS Hallmarked</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>Accompanied by stamped purity certificate & valuation sheet.</p>
              </div>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>
                  1. Dispatch Timelines
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  <strong style={{ color: 'var(--text-main)', fontWeight: '500' }}>In-Stock Perennials:</strong> Orders are dispatched within 2 to 4 business days following payment verification.<br />
                  <strong style={{ color: 'var(--text-main)', fontWeight: '500' }}>Made-to-Order & Custom Signet Rings:</strong> Require approximately 3 to 4 weeks of artisan casting, stone-setting, and hallmarking.
                </p>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>
                  2. Domestic & International Shipping Rates
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                  Complimentary shipping is included for all orders across India. International orders are shipped via DHL Express / FedEx Insured Courier with real-time tracking provided upon dispatch.
                </p>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)', fontFamily: 'var(--font-serif)', fontWeight: '400' }} id="returns">
                  3. Returns, Exchanges & Resizing
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
                  Due to the bespoke and precious metal nature of our pieces:
                </p>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>Standard pieces may be exchanged within 7 days of delivery in pristine, unworn condition with original seals intact.</li>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>Customized, engraved, or altered pieces (such as bespoke signet rings or resized bands) are final sale.</li>
                  <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>Complimentary ring resizing is available within 14 days of purchase for selected gold and silver ring styles.</li>
                </ul>
              </div>
            </div>

          </Container>
        </Section>
      </FadeInSection>

    </div>
  );
}
