'use client';
import React, { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase login logic here
    console.log('Logging in with', email);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '48px', borderRadius: '8px', width: '100%', maxWidth: '400px', border: '1px solid #eaeaea', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '32px', textAlign: 'center' }}>Admin Login</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#333' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }} 
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#333' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' }} 
              required 
            />
          </div>
          <button type="submit" style={{ background: '#111', color: '#fff', padding: '14px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
