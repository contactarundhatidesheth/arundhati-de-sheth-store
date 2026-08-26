import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { ShieldCheck, Gem, Truck, Award } from 'lucide-react';

export interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TrustBarProps {
  items: TrustItem[];
}

const defaultItems: TrustItem[] = [
  {
    icon: <Gem size={28} strokeWidth={1.5} />,
    title: 'Certified Authenticity',
    description: 'Every piece comes with a certificate of authenticity and lifetime guarantee.',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Lifetime Warranty',
    description: 'Comprehensive coverage on all craftsmanship and materials.',
  },
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: 'Complimentary Shipping',
    description: 'Free insured worldwide delivery on all orders over ₹5,00,000.',
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: 'Master Artisans',
    description: 'Handcrafted by our team of world-renowned jewelry makers.',
  },
];

export const TrustBar: React.FC<TrustBarProps> = ({ items = defaultItems }) => {
  return (
    <Section background="primary" padding="sm">
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            textAlign: 'center',
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  fontWeight: 400,
                  color: 'var(--text-main)',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '280px',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
