'use client';

import React, { useState } from 'react';
import { verifyAdminPassword, sendAdminResetEmail } from './actions';
import { Eye, EyeOff, Lock, ArrowRight, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password Modal State
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await verifyAdminPassword(password);
      if (result.success) {
        window.location.href = '/admin';
      } else {
        setError(result.error || 'Invalid password');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReset = async () => {
    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    try {
      const res = await sendAdminResetEmail();
      if (res.success) {
        setForgotSuccess(`A secure reset link has been sent to ${res.email}. Please check your inbox.`);
      } else {
        setForgotError(res.error || 'Failed to send reset link');
      }
    } catch (err: any) {
      setForgotError('Could not send reset email. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#fafafa', padding: '24px' }}>
      <div
        style={{
          background: '#fff',
          padding: '48px 40px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid #eaeaea',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888', fontWeight: 600 }}>
            Management Portal
          </span>
          <h1 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', margin: '8px 0 6px', fontWeight: 400 }}>
            A.D. Admin
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#666', margin: 0 }}>
            Enter your admin password to continue
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', marginBottom: '24px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontSize: '0.88rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  background: '#fdfdfd'
                }}
                required
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword((prev) => !prev);
                }}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: showPassword ? '#111' : '#888',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                setIsForgotOpen(true);
                setForgotError('');
                setForgotSuccess('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#666',
                fontSize: '0.82rem',
                cursor: 'pointer',
                padding: 0,
                textDecoration: 'underline'
              }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#000',
              color: '#fff',
              padding: '14px',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.88rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              marginTop: '4px'
            }}
          >
            {loading ? 'Verifying...' : 'Sign In'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '36px',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '440px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.15)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '50%' }}>
                <Mail size={20} color="#111" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0, fontWeight: 500 }}>
                Reset Admin Password
              </h2>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              We will send a secure password reset link to the registered admin email address (<strong>contactarundhatidesheth@gmail.com</strong>).
            </p>

            {forgotSuccess && (
              <div style={{ padding: '12px', background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '20px' }}>
                {forgotSuccess}
              </div>
            )}

            {forgotError && (
              <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '20px' }}>
                {forgotError}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                style={{
                  padding: '10px 18px',
                  background: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              {!forgotSuccess && (
                <button
                  type="button"
                  onClick={handleSendReset}
                  disabled={forgotLoading}
                  style={{
                    padding: '10px 20px',
                    background: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    cursor: forgotLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 500,
                    opacity: forgotLoading ? 0.7 : 1
                  }}
                >
                  {forgotLoading ? 'Sending link...' : 'Send Reset Link'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
