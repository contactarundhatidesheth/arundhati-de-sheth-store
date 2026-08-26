'use client';

import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export interface PressStripProps {
  publications: string[];
  label?: string;
}

const defaultPublications = [
  'VOGUE',
  "Harper's Bazaar",
  'ELLE',
  'Vanity Fair',
  'Tatler',
  'The Business of Fashion',
  'Robb Report',
  'Town & Country',
];

export const PressStrip: React.FC<PressStripProps> = ({
  publications = defaultPublications,
  label = 'As Seen In',
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <Section background="surface" padding="sm">
      <Container>
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '32px',
            }}
          >
            {label}
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px 56px',
            }}
          >
            {publications.map((pub, index) => (
              <span
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtle)',
                  opacity: hoveredIndex === index ? 1 : 0.55,
                  transition: 'var(--transition-premium)',
                  whiteSpace: 'nowrap',
                  cursor: 'default',
                }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
