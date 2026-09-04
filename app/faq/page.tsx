'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';
import { MessageCircle, Plus, Minus } from 'lucide-react';
interface FAQItem {
  question: string;
  answer: React.ReactNode;
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
        answer: (
          <>
            You may browse our collections online and add pieces to your cart. For High Jewellery acquisitions, you may connect with our sales team via <a href="https://wa.me/919581822000" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>whatsapp</a>.
          </>
        ),
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
          'Yes. A detailed order confirmation will be sent to your registered email address within moments of your purchase. This will include your order summary, estimated dispatch timeline, and your personal sales contact for any queries.',
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
          'Yes, we ship globally. All international orders are dispatched via DHL Express or FedEx Insured Courier, fully insured and with real-time tracking. Shipping fees and timelines vary by destination and will be confirmed at checkout or by sales team.',
      },
      {
        question: 'How long will my order take to arrive?',
        answer:
          'In-stock Perennials are dispatched within 2–4 business days. Made-to-order and custom pieces require approximately 3–4 weeks of artisan craftsmanship, stone-setting, and BIS hallmarking. You will receive a precise timeline upon order confirmation.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your piece is dispatched, you will receive an email with your tracking number and a direct link to the courier\'s live tracking portal. Our sales team is also available at any time to assist with delivery updates.',
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
          'As a general policy, all purchases made through us are considered final sale. However, should you notice any defect or issue with your piece upon delivery, please notify us within 48 hours of receipt, and we will be happy to assist you.',
      },
      {
        question: 'How do I initiate a return or exchange?',
        answer:
          'Please contact our sales team at contact@arundhatidesheth.com with your order number and reason for return. We will arrange a fully insured reverse pickup at no cost to you within India. International returns may be subject to shipping fees.',
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

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden', background: '#000' }}>
        {/* Dense SVG Logo Pattern */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
          <svg width="100%" height="100%">
            <defs>
              {/* The pattern width/height is the spacing between logos. We make it tight (50px). */}
              <pattern id="dense-logo-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                {/* We scale the image up (100px) inside the 50px cell to eliminate any padding in the file */}
                <image href="/brand/logo-white.png" x="-25" y="-25" width="100" height="100" preserveAspectRatio="xMidYMid slice" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dense-logo-pattern)" />
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)', zIndex: 2 }} />
        
        <div style={{ position: 'absolute', bottom: 'clamp(30px, 5vw, 60px)', left: 'clamp(20px, 5vw, 60px)', right: '20px', zIndex: 10 }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 6rem)', 
            fontWeight: '300', 
            fontFamily: 'var(--font-serif)', 
            color: '#fff', 
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic'
          }}>
            FAQ
          </h1>
        </div>
      </section>

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
                Still have questions?
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
