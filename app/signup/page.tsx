'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/login/actions';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    
    const error = await signup(formData);
    
    if (error) {
      setErrorMsg(error);
      setIsLoading(false);
    }
    // if successful, signup action redirects to /login with a message
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '16px', color: '#000' }}>
          Request Access
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '48px', fontWeight: 300 }}>
          Apply for an account to view our private collections and commission bespoke pieces.
        </p>

        {errorMsg && (
          <div style={{ padding: '12px', marginBottom: '24px', background: '#FFF0F0', color: '#D32F2F', fontSize: '0.85rem' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                First Name
              </label>
              <input 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                Last Name
              </label>
              <input 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
          </div>

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
              minLength={6}
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
            {isLoading ? 'Submitting...' : 'Apply for Access'}
          </button>
        </form>

        <div style={{ marginTop: '48px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#000', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
