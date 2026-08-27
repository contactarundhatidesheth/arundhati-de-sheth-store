'use client';

import React from 'react';
import { Hero } from '@/components/Hero';


export default function HomePage() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <Hero />
    </div>
  );
}
