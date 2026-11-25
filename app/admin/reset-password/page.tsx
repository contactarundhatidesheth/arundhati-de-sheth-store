'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { resetAdminPasswordWithToken } from '../login/actions';
import { Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Invalid or missing reset token. Please request a new link.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await resetAdminPasswordWithToken(token, password);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1500);
      } else {
        setError(res.error || 'Failed to reset password');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
            Security Recovery
          </span>
          <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', margin: '8px 0 6px', fontWeight: 400 }}>
            Set New Password
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#666', margin: 0 }}>
            Enter your new alphanumeric admin password
          </p>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', marginBottom: '24px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontSize: '0.88rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: '#f0fdf4', borderRadius: '50%', marginBottom: '16px' }}>
              <CheckCircle2 size={36} color="#16a34a" />
            </div>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 8px 0', fontWeight: 500 }}>Password Updated!</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
              Logging you into the admin panel now...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 alphanumeric characters"
                  style={{
                    width: '100%',
                    padding: '13px 44px 13px 14px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    outline: 'none',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    background: '#fdfdfd'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#888',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  background: '#fdfdfd'
                }}
                required
              />
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
                marginTop: '8px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Saving...' : 'Save Password & Enter'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
