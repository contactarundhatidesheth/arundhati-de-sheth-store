'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Quote } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeInSection } from '@/components/ui/FadeInSection';

const PRESS = [
  {
    id: '1',
    publication: 'Vogue India',
    title: 'The New Guard of Indian High Jewellery',
    excerpt: 'Arundhati De-Sheth is redefining what it means to be a contemporary high jewellery designer in India.',
    date: 'March 2025',
    image: '/pressimages/press-1.png',
    link: '#',
  },
  {
    id: '2',
    publication: "Harper's Bazaar",
    title: 'Sculptural Silver: The Perennials Collection',
    excerpt: 'Rock crystals and architectural forms collide in this stunning new collection from Mumbai-based Arundhati De-Sheth.',
    date: 'January 2025',
    image: '/pressimages/press-2.jpg',
    link: '#',
  },
  {
    id: '3',
    publication: 'Jewellery Focus Asia',
    title: 'Bespoke by Design: A Conversation with Arundhati De-Sheth',
    excerpt: 'On building a consultancy-first model, gemstone provenance, and the art of the private client relationship.',
    date: 'November 2024',
    image: '/pressimages/press-3.jpg',
    link: '#',
  },
  {
    id: '4',
    publication: 'The Jewellery Editor',
    title: 'JewelArt 2024: The Highlights',
    excerpt: "A curated selection of the most compelling pieces from this year's edition of JewelArt, featuring Arundhati De-Sheth.",
    date: 'October 2024',
    image: '/pressimages/press-4.png',
    link: '#',
  },
];

export default function PressPage() {
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in press and media inquiries. Could you please share the press kit?");
  const whatsappLink = WHATSAPP_URL + "?text=" + whatsappMessage;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A1A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src="/pressimages/press-hero.png"
            alt="Prismatic Collection Editorial"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.6)' }} />
        </div>
        <Container maxWidth="800px" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-light)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '24px' }}>
            Press & Editorial
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '200', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--text-on-dark-strong)' }}>
            In the Press
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.8', fontWeight: '300', maxWidth: '560px', margin: '0 auto 40px' }}>
            A selection of editorial features, interviews, and exhibition reviews.
          </p>
          <Button href={whatsappLink} variant="primary" icon={<ArrowRight size={14} />}>
            <span>Request Press Kit</span>
          </Button>
        </Container>
      </section>

      {/* Quote */}
      <Section background="secondary" padding="lg" borderBottom>
        <Container maxWidth="900px" style={{ textAlign: 'center' }}>
          <FadeInSection>
            <Quote size={32} style={{ color: 'var(--text-muted)', marginBottom: '24px', opacity: 0.3 }} />
            <blockquote style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontFamily: 'var(--font-serif)', fontWeight: '300', lineHeight: '1.6', color: 'var(--text-main)', margin: '0 0 24px', fontStyle: 'italic' }}>
              &quot;Arundhati De-Sheth stands at the forefront of a new generation of Indian jewellers — sophisticated, globally minded, and utterly original.&quot;
            </blockquote>
            <cite style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '500', fontStyle: 'normal' }}>
              — Vogue India
            </cite>
          </FadeInSection>
        </Container>
      </Section>

      {/* Press Grid */}
      <Section background="primary" padding="lg">
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {PRESS.map((article, idx) => (
              <FadeInSection key={article.id}>
                <article style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '12px' }}>
                      {article.publication} — {article.date}
                    </p>
                    <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: '400', marginBottom: '12px', fontFamily: 'var(--font-serif)', lineHeight: '1.2', flex: 1 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300', marginBottom: '24px' }}>
                      {article.excerpt}
                    </p>
                    <Button href={article.link} variant="secondary" target="_blank" rel="noopener noreferrer" icon={<ExternalLink size={12} />}>
                      <span>Read Article</span>
                    </Button>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </Section>

      {/* Press Kit CTA */}
      <Section background="dark" padding="lg" borderTop>
        <Container maxWidth="700px" style={{ textAlign: 'center' }}>
          <FadeInSection>
            <p style={{ fontSize: '0.7rem', color: 'var(--accent-light)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '20px' }}>
              Media Inquiries
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '200', marginBottom: '20px', fontFamily: 'var(--font-serif)', lineHeight: '1.2', color: 'var(--text-on-dark-strong)' }}>
              Request the Press Kit
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.7', marginBottom: '40px', fontWeight: '300' }}>
              For editorial requests, high-resolution imagery, or interview arrangements, please contact our press office.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href={whatsappLink} variant="dark-primary" icon={<ArrowRight size={14} />}>
                <span>WhatsApp Press Office</span>
              </Button>
              <Button variant="dark-secondary" href="/contact">
                Email Us
              </Button>
            </div>
          </FadeInSection>
        </Container>
      </Section>
    </div>
  );
}
