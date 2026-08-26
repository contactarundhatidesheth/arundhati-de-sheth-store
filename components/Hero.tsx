'use client';

import React from 'react';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 0, 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      background: '#000000'
    }}>
      
      {/* Background Video */}
      <video
        src="https://cdn.shopify.com/videos/c/o/v/6d27410b952b4975a39cd2451f0ec4ec.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* Overlay to ensure text readability */}
      <div style={{
        position: 'absolute',
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'rgba(0, 0, 0, 0.25)',
        zIndex: 1
      }} />


    </section>
  );
};
