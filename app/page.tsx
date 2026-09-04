'use client';

import React from 'react';
import { Hero } from '@/components/Hero';


export default function HomePage() {
  return (
    <div style={{ height: '100dvh', width: '100%', overflow: 'hidden', background: 'var(--bg-primary)', position: 'fixed', inset: 0, zIndex: 0 }}>
      <Hero />
    </div>
  );
}
