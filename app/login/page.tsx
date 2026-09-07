'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { login } from './actions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const message = searchParams?.get('message');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const error = await login(formData);

    if (error) {
      setErrorMsg(error);
      setIsLoading(false);
    }
    // if successful, login action will redirect
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

        {message && (
          <div style={{ padding: '12px', marginBottom: '24px', background: '#F5F5F5', color: '#000', fontSize: '0.85rem' }}>
            {message}
          </div>
        )}

        {errorMsg && (
          <div style={{ padding: '12px', marginBottom: '24px', background: '#FFF0F0', color: '#D32F2F', fontSize: '0.85rem' }}>
            {errorMsg}
          </div>
        )}

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
            <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
              Forgot Password?
            </Link>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '18px',
              background: '#000',
              color: '#fff',
              border: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'wait' : 'pointer',
              marginTop: '12px',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '48px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#000', textDecoration: 'underline' }}>
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
