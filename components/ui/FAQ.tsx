import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const defaultItems: FAQItem[] = [
  {
    question: 'How do I care for my fine jewelry?',
    answer: 'Store each piece separately in a soft pouch or lined jewelry box to prevent scratches. Avoid contact with harsh chemicals, perfumes, and extreme temperatures. For regular cleaning, use a soft microfiber cloth and mild soapy water. We also recommend professional cleaning every 6-12 months.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We offer a 30-day return policy for all unworn items in their original packaging with all certificates. Custom pieces are non-returnable unless there is a manufacturing defect. exchanges are free of charge within 30 days of delivery.',
  },
  {
    question: 'Are your diamonds conflict-free?',
    answer: 'Yes. All our diamonds are sourced from conflict-free regions and come with full Kimberley Process certification. We are committed to ethical sourcing and sustainable practices across our entire supply chain.',
  },
  {
    question: 'Do you offer customization services?',
    answer: 'Absolutely. Our master jewelers can create bespoke pieces tailored to your vision. From engagement rings to anniversary gifts, we offer a fully personalized design experience with 3D renderings and hand-drawn sketches before crafting begins.',
  },
];

export const FAQ: React.FC<FAQProps> = ({ items = defaultItems, title = 'Frequently Asked Questions' }) => {
  return (
    <Section background="primary" padding="lg">
      <Container>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 300,
                color: 'var(--text-main)',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {title}
            </h2>
          </div>
          <div
            style={{
              borderTop: '1px solid var(--border)',
            }}
          >
            {items.map((item, index) => (
              <details
                key={index}
                style={{
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <summary
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                    fontWeight: 400,
                    color: 'var(--text-main)',
                    padding: '24px 0',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                      marginLeft: '16px',
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    paddingBottom: '24px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 300,
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
