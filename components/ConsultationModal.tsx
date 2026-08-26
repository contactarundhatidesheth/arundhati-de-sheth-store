'use client';

import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const ConsultationModal: React.FC = () => {
  const { isConsultationOpen, setIsConsultationOpen, selectedConsultationPiece } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    preferredTime: 'Morning (10 AM - 1 PM)',
    notes: '',
  });

  if (!isConsultationOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setIsConsultationOpen(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(26, 26, 26, 0.7)', backdropFilter: 'blur(6px)' }}
        onClick={handleClose}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
           background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          padding: '40px',
          zIndex: 121,
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <button
          onClick={handleClose}
          style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--text-main)', background: 'none', border: 'none' }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 16px' }}>
            <CheckCircle2 size={36} style={{ margin: '0 auto 16px', color: 'var(--text-main)' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Consultation Request Received</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you, <strong style={{ color: 'var(--text-main)', fontWeight: '500' }}>{formData.name}</strong>. Our senior jewellery consultant will reach out within 24 hours.
            </p>
              <button onClick={handleClose} className="btn-primary" style={{ fontSize: '0.75rem' }}>
                Return to Storefront
              </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '500', marginBottom: '8px' }}>
                Bespoke Advisory
              </p>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: '400', color: 'var(--text-main)' }}>
                Book a Private Consultation
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {selectedConsultationPiece
                  ? `Inquiring about: ${selectedConsultationPiece.title}`
                  : 'Curated one-on-one session for bespoke commissions, sizing, and fine jewellery acquisitions.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                  Full Name *
                </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', borderRadius: 'var(--radius-sm)' }}
                  />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                     placeholder="+91 95818 22000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    Preferred Date
                  </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', borderRadius: 'var(--radius-sm)' }}
                    />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                    Preferred Slot
                  </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', borderRadius: 'var(--radius-sm)' }}
                    >
                    <option>Morning (10 AM - 1 PM)</option>
                    <option>Afternoon (1 PM - 4 PM)</option>
                    <option>Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '500', color: 'var(--text-muted)' }}>
                  Specific Requirements
                </label>
                  <textarea
                    rows={3}
                    placeholder="Ring sizes, gemstone preferences, occasion dates..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-main)', outline: 'none', resize: 'vertical', lineHeight: '1.6', borderRadius: 'var(--radius-sm)' }}
                  />
              </div>

              <button type="submit" style={{ width: '100%', marginTop: '8px', padding: '14px', background: 'var(--text-main)', color: '#FAF9F7', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500', borderRadius: 'var(--radius-sm)' }}>
                <Calendar size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
                Confirm Consultation Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
