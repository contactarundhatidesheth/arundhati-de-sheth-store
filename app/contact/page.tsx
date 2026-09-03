'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, CheckCircle2, Clock, Globe, Shield } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { FadeInSection } from '@/components/ui/FadeInSection';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?v=1708934384&width=1600"
            alt="Arundhati De-Sheth Atelier"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 1 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 25%)' }} />
        </div>
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
            Contact
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <FadeInSection>
        <Section background="primary" padding="lg">
          <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              {/* Contact Details */}
              <div style={{ width: '100%' }}>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '40px', fontFamily: 'var(--font-serif)' }}>
                  Studio & Advisory
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <MapPin size={20} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--text-main)', opacity: 0.6 }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>The Salon</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                        Private Viewings by Request<br />
                        Reach out to arrange a visit.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <Mail size={20} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--text-main)', opacity: 0.6 }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email Inquiries</strong>
                       <a href="mailto:contact@arundhatidesheth.com" style={{ color: 'var(--text-main)', textDecoration: 'underline', textUnderlineOffset: '3px', fontSize: '0.9rem' }}>
                        contact@arundhatidesheth.com
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <Phone size={20} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--text-main)', opacity: 0.6 }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Direct Phone / WhatsApp</strong>
                       <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                        +91 95818 22000<br />
                        <span style={{ fontSize: '0.8rem' }}>Mon – Sat, 10 AM – 7 PM IST</span>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <Clock size={20} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--text-main)', opacity: 0.6 }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Response Time</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                        All client inquiries are reviewed personally by our design team within 24 business hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button href={WHATSAPP_URL} variant="primary" target="_blank" rel="noopener noreferrer" icon={<Shield size={16} />}>
                    <span>Chat on WhatsApp</span>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </FadeInSection>

      {/* Map Section */}
      <FadeInSection>
        <Section background="primary" padding="none">
          <div style={{ width: '100%', height: '450px', filter: 'grayscale(100%) opacity(0.9)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.344840871994!2d72.8155981149021!3d18.95924748715486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce0e4b7b3b65%3A0x6b44243b6dc0f8b!2sAvantikabai%20Gokhale%20Marg%2C%20New%20Bhatwadi%2C%20Girgaon%2C%20Mumbai%2C%20Maharashtra%20400004!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Section>
      </FadeInSection>



      {/* FAQ Link */}
      <FadeInSection>
        <Section background="primary" padding="lg" borderTop>
          <Container maxWidth="800px" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>
              Have Questions?
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '40px', fontWeight: '300' }}>
              Find details about shipping, bespoke commissions, and pricing in our comprehensive FAQ.
            </p>
            <Link href="/faq" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              padding: '16px 32px', 
              border: '1px solid var(--text-main)', 
              color: 'var(--text-main)', 
              textDecoration: 'none', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              fontSize: '0.85rem', 
              fontWeight: 500,
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--text-main)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              View All FAQs
            </Link>
          </Container>
        </Section>
      </FadeInSection>
      </div>
    </div>
  );
}
