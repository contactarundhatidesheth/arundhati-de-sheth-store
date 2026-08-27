'use client';

import React from 'react';
import { WHATSAPP_URL } from '@/lib/config/site';

export const AnnouncementBar: React.FC = () => {
  return (
    <div style={{
      background: '#1A1A1A',
      color: '#FAF9F7',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.7rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      fontWeight: '500',
      borderBottom: '1px solid var(--text-on-dark-faint)',
    }}>
      <span style={{ opacity: 0.85 }}>Private Client Inquiries </span>
      <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
      <span style={{ opacity: 0.85 }}>Worldwide Shipping Insured </span>
      <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'var(--accent-gold)',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          opacity: 1,
          transition: 'opacity 0.2s',
        }}
      >
        WhatsApp Advisory
      </a>
    </div>
  );
};
