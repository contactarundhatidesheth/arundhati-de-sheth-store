'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login for frontend UI
    alert('Login feature in development. Please use the WhatsApp concierge for account inquiries.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '16px', color: '#000' }}>
          Client Login
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '48px', fontWeight: 300 }}>
          Sign in to access your bespoke commissions and private lookbooks.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid var(--border)',
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: '#000',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '16px',
                border: '1px solid var(--border)',
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: '1rem',
                color: '#000',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="#" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '18px',
              background: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: '12px'
            }}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '48px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="#" style={{ color: '#000', textDecoration: 'underline' }}>
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
