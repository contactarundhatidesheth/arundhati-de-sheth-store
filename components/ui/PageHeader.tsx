import React from 'react';
import { ParallaxSection } from '@/components/ParallaxSection';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  overlayColor?: string;
  overlayOpacity?: number;
  minHeight?: string | number;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  overlayColor = '#1A1A1A',
  overlayOpacity = 0.5,
  minHeight = '70vh',
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
}) => {
  return (
    <ParallaxSection
      imageSrc={backgroundImage}
      imageAlt={title}
      overlayColor={overlayColor}
      overlayOpacity={overlayOpacity}
      minHeight={minHeight}
    >
      <Container>
        <div
          style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '120px 0 80px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: '#FAF9F7',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                fontWeight: 300,
                color: 'var(--text-on-dark-80)',
                lineHeight: 1.6,
                marginBottom: '40px',
                letterSpacing: '0.02em',
              }}
            >
              {subtitle}
            </p>
          )}
          {(ctaText || secondaryCtaText) && (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {ctaText && ctaHref && (
                <Button href={ctaHref} variant="primary">
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="secondary">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </ParallaxSection>
  );
};
