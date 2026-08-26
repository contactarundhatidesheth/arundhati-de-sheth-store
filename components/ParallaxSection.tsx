'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxSectionProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  overlayColor?: string;
  overlayOpacity?: number;
  minHeight?: string | number;
  className?: string;
  priority?: boolean;
  parallaxSpeed?: number;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageSrc,
  imageAlt,
  children,
  overlayColor = '#1A1A1A',
  overlayOpacity = 0.6,
  minHeight = '60vh',
  className = '',
  priority = false,
  parallaxSpeed = 0.3,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let animationFrameId: number;
    let currentScroll = 0;
    let targetScroll = 0;

    const updateParallax = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate when section is in view
      if (rect.bottom < 0 || rect.top > windowHeight) {
        animationFrameId = requestAnimationFrame(updateParallax);
        return;
      }

      // Calculate how far through the viewport the section is
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const parallaxOffset = (scrollProgress - 0.5) * rect.height * parallaxSpeed;

      bg.style.transform = `translateY(${parallaxOffset}px)`;
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [parallaxSpeed]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: 'relative',
        minHeight,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Parallax Background Image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          willChange: 'transform',
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {children}
      </div>
    </div>
  );
};
