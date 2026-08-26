'use client';

import React from 'react';
import { Calendar, PhoneCall } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_URL } from '@/lib/config/site';

export const ConsultationBanner: React.FC = () => {
  const { openConsultationForPiece } = useCart();

  return (
    <section style={{ padding: 'var(--section-padding)', background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '16px' }}>
          Private Advisory
        </p>

        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
          Prefer a private virtual studio walkthrough?
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 32px', lineHeight: '1.7', fontWeight: '400' }}>
          Connect directly with Arundhati De-Sheth&apos;s studio team for high jewellery provenance details, ring sizing guidance, or tailored gemstone selections.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => openConsultationForPiece()}
            className="btn-primary"
            style={{ fontSize: '0.75rem' }}
          >
            <Calendar size={14} />
            <span>Schedule Appointment</span>
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
          >
            <PhoneCall size={14} />
            <span>WhatsApp Advisory</span>
          </a>
        </div>

      </div>
    </section>
  );
};
