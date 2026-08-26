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
      <section style={{ position: 'sticky', top: 0, zIndex: 0, minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src="https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?v=1708934384&width=1600"
            alt="Arundhati De-Sheth Atelier"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.6)' }} />
        </div>
        <Container maxWidth="800px" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '80px', paddingBottom: '80px' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '24px' }}>
            Connect
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '300', marginBottom: '24px', fontFamily: 'var(--font-serif)', lineHeight: '1.05', letterSpacing: '-0.02em', color: 'var(--text-on-dark)' }}>
            Contact & Private Consultations
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-on-dark-muted)', lineHeight: '1.8', fontWeight: '300', maxWidth: '560px', margin: '0 auto' }}>
            We invite you to reach out for bespoke commissions, price inquiries, or private studio walkthroughs.
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, background: 'var(--bg-primary)' }}>
        <FadeInSection>
        <Section background="primary" padding="lg">
          <Container>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '64px' }}>

              {/* Left - Contact Details */}
              <div>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text-main)', fontWeight: '300', marginBottom: '40px', fontFamily: 'var(--font-serif)' }}>
                  Studio & Advisory
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <MapPin size={20} style={{ marginTop: '4px', flexShrink: 0, color: 'var(--text-main)', opacity: 0.6 }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '6px', fontWeight: '500', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Mumbai Atelier</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                        Sashaa Global LLP, Ground Floor, 2A, Plot-15 Iindira Niwas<br />
                        Avantikabai Gokhale Marg, New Bhatwadi, Ggirgaon<br />
                        Mumbai City, Maharashtra, 400004
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
                <Button href={WHATSAPP_URL} variant="primary" target="_blank" rel="noopener noreferrer" icon={<Shield size={16} />}>
                  <span>Chat on WhatsApp</span>
                </Button>
              </div>

               {/* Right - Form */}
               <div>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle2 size={40} style={{ margin: '0 auto 20px', color: 'var(--text-main)' }} />
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Message Sent</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '32px' }}>
                      Thank you for contacting Arundhati De-Sheth. We have received your inquiry and will respond within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="primary">
                      Send Another Message
                    </Button>
                  </div>
                 ) : (
                   <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '48px', borderRadius: 'var(--radius-md)' }}>
                    <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)' }}>
                      Send a Message
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '32px', fontWeight: '300' }}>
                      All inquiries are confidential. For immediate assistance, please WhatsApp us.
                    </p>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                     <div>
                       <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500', color: 'var(--text-muted)' }}>
                         Full Name *
                       </label>
                       <input
                         type="text"
                         required
                         placeholder="Your Name"
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-sm)' }}
                       />
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                       <div>
                         <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500', color: 'var(--text-muted)' }}>
                           Email *
                         </label>
                         <input
                           type="email"
                           required
                           placeholder="email@domain.com"
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                           style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-sm)' }}
                         />
                       </div>
                       <div>
                         <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500', color: 'var(--text-muted)' }}>
                           Phone / WhatsApp
                         </label>
                         <input
                           type="tel"
                            placeholder="+91 95818 22000"
                           value={formData.phone}
                           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                           style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-sm)' }}
                         />
                       </div>
                     </div>

                     <div>
                       <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500', color: 'var(--text-muted)' }}>
                         Subject
                       </label>
                       <select
                         value={formData.subject}
                         onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                         style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-sm)' }}
                       >
                         <option>General Inquiry</option>
                         <option>Bespoke Commission</option>
                         <option>Price / Sizing Request</option>
                         <option>Press & Media</option>
                         <option>Private Viewing</option>
                       </select>
                     </div>

                     <div>
                       <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '500', color: 'var(--text-muted)' }}>
                         Message *
                       </label>
                       <textarea
                         rows={5}
                         required
                         placeholder="How can we assist you?"
                         value={formData.message}
                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                         style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border)', fontSize: '0.9rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', resize: 'vertical', lineHeight: '1.7', fontFamily: 'var(--font-sans)', borderRadius: 'var(--radius-sm)' }}
                       />
                     </div>

                        <button type="submit" style={{ width: '100%', marginTop: '8px', padding: '16px', background: 'var(--accent)', color: 'var(--text-on-dark)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', borderRadius: 'var(--radius-sm)' }}>
                         Submit Inquiry
                       </button>
                   </div>
                 </form>
               )}
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

      {/* Map / International */}
      <FadeInSection>
        <Section background="primary" padding="lg" borderTop>
          <Container>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '16px' }}>
                Global Reach
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)' }}>
                Worldwide Presence
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
              {[
                { city: 'Mumbai', country: 'India', role: 'Headquarters & Atelier', hours: 'Mon – Sat, 10 AM – 7 PM IST' },
                { city: 'Pune', country: 'India', role: 'Design Studio', hours: 'By Appointment' },
                { city: 'London', country: 'United Kingdom', role: 'Private Viewings', hours: 'By Appointment' },
                { city: 'New York', country: 'USA', role: 'Client Liaison', hours: 'By Appointment' },
              ].map((office, idx) => (
                <div key={idx} style={{ padding: '32px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', textAlign: 'center', borderRadius: 'var(--radius-md)' }}>
                  <Globe size={20} style={{ color: 'var(--text-main)', opacity: 0.4, marginBottom: '16px' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '4px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>{office.city}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{office.country}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '500' }}>{office.role}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{office.hours}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection>
        <Section background="primary" padding="lg" borderTop id="faq">
          <Container maxWidth="800px">
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '16px' }}>
                FAQ
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: 'var(--text-main)', fontWeight: '300', fontFamily: 'var(--font-serif)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              {[
                { q: 'Are all pieces price on request?', a: 'Yes. Each piece is individually priced based on metal weight, gemstone quality, and craftsmanship complexity. We provide detailed quotes upon request.' },
                { q: 'Do you ship internationally?', a: 'Yes, we offer worldwide insured shipping via secure couriers. All shipments are fully insured and require signature upon delivery.' },
                { q: 'Can I visit the atelier?', a: 'Private viewings are available by appointment in Mumbai and Pune. For international clients, we offer virtual consultations via video call.' },
                { q: 'What is the bespoke process?', a: 'The process begins with a consultation to understand your vision. Our master artisans then create a detailed rendering before proceeding to handcraft the piece.' },
              ].map((faq, idx) => (
                <details key={idx} style={{ padding: '24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                  <summary style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '500', cursor: 'pointer', fontFamily: 'var(--font-serif)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.q}
                    <span style={{ fontSize: '1.2rem', fontWeight: '300', color: 'var(--text-muted)' }}>+</span>
                  </summary>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', marginTop: '16px', fontWeight: '300' }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
        </FadeInSection>
      </div>
    </div>
  );
}
