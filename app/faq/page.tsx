'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { MessageCircle, Plus, Minus } from 'lucide-react';
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'orders',
    label: 'Orders & Payment',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'You may browse our collections online and add pieces to your cart. For high-jewellery acquisitions or bespoke commissions, we warmly invite you to connect with our concierge team directly via WhatsApp or email for a private, personalised consultation.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards, UPI, net banking, and bank transfers. For international orders, payments may be processed via wire transfer. All transactions are secured with SSL encryption and processed through trusted payment gateways.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Orders may be amended or cancelled within 12 hours of placement, provided production has not commenced. Please contact our team immediately. Bespoke and made-to-order pieces cannot be cancelled once crafting has begun.',
      },
      {
        question: 'Will I receive an order confirmation?',
        answer:
          'Yes. A detailed order confirmation will be sent to your registered email address within moments of your purchase. This will include your order summary, estimated dispatch timeline, and your personal concierge contact for any queries.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    items: [
      {
        question: 'Do you offer international shipping?',
        answer:
          'Yes, we ship globally. All international orders are dispatched via DHL Express or FedEx Insured Courier, fully insured and with real-time tracking. Shipping fees and timelines vary by destination and will be confirmed at checkout or by our concierge team.',
      },
      {
        question: 'How long will my order take to arrive?',
        answer:
          'In-stock Perennials are dispatched within 2–4 business days. Made-to-order and custom pieces require approximately 3–4 weeks of artisan craftsmanship, stone-setting, and BIS hallmarking. You will receive a precise timeline upon order confirmation.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your piece is dispatched, you will receive an email with your tracking number and a direct link to the courier\'s live tracking portal. Our concierge is also available at any time to assist with delivery updates.',
      },
      {
        question: 'Is my jewellery insured during transit?',
        answer:
          'Absolutely. Every order is fully insured for its declared value and dispatched with a signature-required delivery requirement. Your piece will only be released upon receipt of your signature, ensuring the utmost security.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Exchanges',
    items: [
      {
        question: 'What is your return policy?',
        answer:
          'Standard pieces may be exchanged within 7 days of delivery in their pristine, unworn condition with all original packaging, certificates, and seals intact. Please note that bespoke, engraved, personalized, and resized pieces are final sale.',
      },
      {
        question: 'How do I initiate a return or exchange?',
        answer:
          'Please contact our concierge team at contact@arundhatidesheth.com with your order number and reason for return. We will arrange a fully insured reverse pickup at no cost to you within India. International returns may be subject to shipping fees.',
      },
      {
        question: 'Do you offer ring resizing?',
        answer:
          'Complimentary ring resizing is available within 14 days of purchase for selected gold and silver ring styles. Please reach out with your order details and we will assess the feasibility and arrange the process at our Mumbai atelier.',
      },
    ],
  },
  {
    id: 'jewellery',
    label: 'Our Jewellery',
    items: [
      {
        question: 'Can I request a bespoke or custom piece?',
        answer:
          'We specialize in creating entirely bespoke jewellery tailored to your vision. Our design process begins with a private consultation, followed by hand-drawn sketches and 3D renderings before a single gram of metal is cast. Please reach out via our contact page to begin.',
      },
      {
        question: 'Are your diamonds and gemstones ethically sourced?',
        answer:
          'Yes. All diamonds are conflict-free and comply with the Kimberley Process Certification Scheme. Our gemstones are sourced from traceable, responsible suppliers. Each piece is accompanied by a full certificate of authenticity and a BIS hallmark.',
      },
      {
        question: 'How should I care for my fine jewellery?',
        answer:
          'Store each piece individually in the provided soft pouch or lined jewellery box to prevent abrasion. Avoid contact with perfumes, lotions, chlorine, and extreme temperatures. For regular maintenance, use a soft microfibre cloth. We recommend professional polishing every 12 months.',
      },
      {
        question: 'Do you offer jewellery repairs?',
        answer:
          'Yes. We stand behind the integrity of every piece that leaves our atelier. Should your jewellery require repair, polishing, or re-setting, please contact us with your order details. An assessment will be arranged at our Mumbai studio.',
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '28px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={isOpen}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontWeight: 400,
            color: isOpen ? 'var(--text-main)' : 'var(--text-main)',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {item.question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease, border-color 0.3s ease',
            background: isOpen ? 'var(--text-main)' : 'transparent',
          }}
        >
          {isOpen ? (
            <Minus size={12} color={isOpen ? '#fff' : 'var(--text-main)'} />
          ) : (
            <Plus size={12} color="var(--text-main)" />
          )}
        </span>
      </button>

      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '400px' : '0',
          transition: 'max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            paddingBottom: '28px',
            maxWidth: '640px',
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory)!;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Dark Hero Header */}
      <FadeInSection>
        <Section background="dark" padding="lg">
          <Container maxWidth="800px" center>
            <p
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
                marginBottom: '16px',
              }}
            >
              Client Support
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 300,
                color: '#FAF9F7',
                lineHeight: 1.15,
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              Frequently Asked Questions
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              Answers to the questions we are most often asked. If you cannot find what you are looking for, our concierge team is always happy to assist.
            </p>
          </Container>
        </Section>
      </FadeInSection>

      {/* Category Tabs */}
      <FadeInSection>
        <div
          style={{
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-primary)',
            position: 'sticky',
            top: '80px',
            zIndex: 10,
          }}
        >
          <Container>
            <div
              className="faq-tab-bar"
              style={{
                display: 'flex',
                gap: '0',
                overflowX: 'auto',
                scrollbarWidth: 'none',
              }}
            >
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    padding: '20px 28px',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeCategory === cat.id ? '2px solid var(--text-main)' : '2px solid transparent',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: activeCategory === cat.id ? 500 : 400,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: activeCategory === cat.id ? 'var(--text-main)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                    marginBottom: '-1px',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Container>
        </div>
      </FadeInSection>

      {/* Accordion Content */}
      <FadeInSection>
        <Section background="primary" padding="lg">
          <Container maxWidth="760px">
            <div style={{ borderTop: '1px solid var(--border-light)' }}>
              {currentCategory.items.map((item, index) => (
                <AccordionItem
                  key={`${activeCategory}-${index}`}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              ))}
            </div>
          </Container>
        </Section>
      </FadeInSection>

      {/* Contact CTA */}
      <FadeInSection>
        <Section background="primary" padding="lg">
          <Container maxWidth="800px" center>
            <div
              style={{
                border: '1px solid var(--border-light)',
                padding: 'clamp(48px, 6vw, 80px)',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginBottom: '12px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              >
                Still have questions?
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 300,
                  color: 'var(--text-main)',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                Speak with Our Concierge
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  marginBottom: '40px',
                  maxWidth: '480px',
                  margin: '0 auto 40px',
                }}
              >
                Our team is available to assist with any inquiry — from order details to bespoke consultations. We endeavour to respond within a few hours.
              </p>
              <div className="faq-cta-buttons" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/919581822000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 36px',
                    background: 'var(--text-main)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    border: '1px solid var(--text-main)',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--text-main)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '16px 36px',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    border: '1px solid var(--text-main)',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--text-main)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-main)';
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </FadeInSection>

      <style>{`
        @media (max-width: 768px) {
          .faq-tab-bar { justify-content: flex-start !important; }
          .faq-tab-bar::-webkit-scrollbar { display: none; }
          .faq-cta-buttons { flex-direction: column !important; }
          .faq-cta-buttons a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </div>
  );
}
