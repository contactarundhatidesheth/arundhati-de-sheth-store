'use client';

import React from 'react';
import { Leaf, Truck, ShieldCheck } from 'lucide-react';

export const OurPromises: React.FC = () => {
  const promises = [
    {
      icon: <Leaf size={24} />,
      title: 'Conscious Materials',
      description: 'We source ethically and use sustainable materials to ensure every piece is as kind to the planet as it is to you.',
    },
    {
      icon: <Truck size={24} />,
      title: 'Complimentary Delivery',
      description: 'Experience effortless elegance with free shipping on all orders, delivered with care to your doorstep.',
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Two Year Warranty',
      description: 'Our commitment to quality means every piece comes with a comprehensive two-year warranty against manufacturing defects.',
    },
  ];

  return (
    <section style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)', paddingBottom: '80px' }}>
      {/* Banner */}
      <div style={{ width: '100%', height: '50vh', position: 'relative', marginBottom: '80px' }}>
        <img 
          src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_154631.png?v=1708934384&width=2000" 
          alt="Our Promises"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', objectPosition: 'center 30%' }}
        />
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '400',
              color: 'var(--text-main)',
              fontFamily: 'var(--font-serif)',
              marginBottom: '12px',
            }}
          >
            Our Promises
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {promises.map((promise, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: '32px 24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'var(--accent-green)',
                  border: '1px solid var(--accent-green)',
                }}
              >
                {promise.icon}
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: 'var(--text-main)',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {promise.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: '1.6',
                  fontWeight: '300',
                }}
              >
                {promise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
