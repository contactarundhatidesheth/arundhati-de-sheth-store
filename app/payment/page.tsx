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
    <div style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%', padding: '0 24px', textAlign: 'center' }}>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <ShieldCheck size={48} strokeWidth={1} color="var(--text-main)" />
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-serif)', marginBottom: '16px', fontWeight: 300 }}>
          Secure Payments
        </h1>

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
  );
}
