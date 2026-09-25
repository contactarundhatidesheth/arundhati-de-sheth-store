'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

const PAYMENT_METHODS = [
  { name: 'Razorpay', width: 140, src: 'https://cdn.worldvectorlogo.com/logos/razorpay.svg' },
  { name: 'Visa', width: 70, src: 'https://cdn.simpleicons.org/visa/1434CB' },
  { name: 'Mastercard', width: 60, src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { name: 'American Express', width: 50, src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg' },
  { name: 'RuPay', width: 90, src: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg' },
  { name: 'UPI', width: 80, src: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg' },
];

export default function PaymentPage() {
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
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '300',
            fontFamily: 'var(--font-serif)',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic'
          }}>
            Secure Payments
          </h1>
        </div>
      </section>

      <div style={{ padding: '80px 0', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', width: '100%', padding: '0 24px', textAlign: 'center' }}>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '60px', lineHeight: '1.6', fontWeight: 300 }}>
            All domestic and international payments are securely processed via Razorpay. We accept all major credit cards, debit cards, UPI, and net banking options.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '40px 32px',
            alignItems: 'center',
            justifyItems: 'center',
            background: '#fafafa',
            padding: '48px 40px',
            border: '1px solid var(--border-light)',
            borderRadius: '4px'
          }}>
            {PAYMENT_METHODS.map((method) => (
              <div key={method.name} style={{ width: `${method.width}px`, height: '40px', position: 'relative', transition: 'transform 0.2s ease', cursor: 'pointer' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <Image
                  src={method.src}
                  alt={method.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              256-Bit Encryption • PCI DSS Compliant
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
