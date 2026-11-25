'use client';

import React, { useState } from 'react';
import { changeAdminPassword } from '@/app/admin/login/actions';
import { Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';

export default function AdminSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const res = await changeAdminPassword(currentPassword, newPassword);
      if (res.success) {
        setSuccess('Admin password updated successfully! Future logins will require this new password.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(res.error || 'Failed to update password');
      }
    } catch (err: any) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
          Admin Security & Password
        </h1>
        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Manage your master admin access password and security recovery details.
        </p>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '8px',
          border: '1px solid #eaeaea',
          padding: '32px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          marginBottom: '32px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
          <div style={{ padding: '8px', background: '#f5f5f5', borderRadius: '50%' }}>
            <KeyRound size={20} color="#111" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 500, margin: 0 }}>Change Access Password</h2>
            <p style={{ fontSize: '0.85rem', color: '#777', margin: 0 }}>
              Primary admin recovery email: <strong>contactarundhatidesheth@gmail.com</strong>
            </p>
          </div>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', marginBottom: '20px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ padding: '12px 16px', marginBottom: '20px', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '6px', fontSize: '0.88rem' }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
              Current Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
              New Alphanumeric Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                required
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 14px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
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
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#000',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
