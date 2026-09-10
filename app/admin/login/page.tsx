'use client';
import React, { useState } from 'react';
import { verifyAdminOtp } from './actions';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await verifyAdminOtp(otp);
      if (result.success) {
        window.location.href = '/admin';
      } else {
        setError(result.error || 'Invalid OTP');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred during verification');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '48px', borderRadius: '8px', width: '100%', maxWidth: '400px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '32px', textAlign: 'center' }}>Admin Access</h1>

        {error && (
          <div style={{ padding: '12px', marginBottom: '24px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#333', textAlign: 'center' }}>Enter 6-Digit OTP</label>
            <input
              type="password"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ''); // keep only numbers
                if (val.length <= 6) setOtp(val);
              }}
              style={{ width: '100%', padding: '16px', border: '1px solid #ccc', borderRadius: '8px', outline: 'none', fontSize: '2.5rem', textAlign: 'center', letterSpacing: '12px' }}
              placeholder="000000"
              required
            />
          </div>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '16px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.95rem' }}>
            Verify & Enter
          </button>
        </form>
      </div>
    </div>
  );
}
