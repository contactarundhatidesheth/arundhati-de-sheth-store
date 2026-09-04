import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from './actions';
import { LogOut, Package, BookOpen, Star } from 'lucide-react';

export default async function AccountPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const firstName = user.user_metadata?.first_name || '';
  const lastName = user.user_metadata?.last_name || '';
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Esteemed Client';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px', borderBottom: '1px solid var(--border-light)', paddingBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '8px', color: '#000' }}>
              Welcome, {fullName}
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              {user.email}
            </p>
          </div>
          
          <form action={signOut}>
            <button type="submit" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogOut size={16} strokeWidth={1.5} />
              Sign Out
            </button>
          </form>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          
          {/* Profile Settings */}
          <div style={{ background: '#fafafa', padding: '40px 32px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ marginBottom: '24px', color: '#000' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', color: '#000' }}>Profile & Settings</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
              Manage your personal information, shipping addresses, and bespoke preferences like ring sizes.
            </p>
            <a href="/account/profile" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', borderBottom: '1px solid #000', paddingBottom: '2px', marginTop: 'auto', textDecoration: 'none' }}>
              Edit Profile
            </a>
          </div>

          {/* Order History */}
          <div style={{ background: '#fafafa', padding: '40px 32px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Package size={28} strokeWidth={1} style={{ marginBottom: '24px', color: '#000' }} />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', color: '#000' }}>Order History</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
              Track the status of your recent commissions and view past high jewellery acquisitions.
            </p>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--text-muted)', paddingBottom: '2px', marginTop: 'auto' }}>
              No recent orders
            </span>
          </div>

          {/* Private Lookbooks */}
          <div style={{ background: '#fafafa', padding: '40px 32px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <BookOpen size={28} strokeWidth={1} style={{ marginBottom: '24px', color: '#000' }} />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', color: '#000' }}>Private Lookbooks</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
              Exclusive access to unreleased collections and private viewing galleries reserved for our inner circle.
            </p>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--text-muted)', paddingBottom: '2px', marginTop: 'auto' }}>
              Unlock Access
            </span>
          </div>

          {/* Bespoke Consultation */}
          <div style={{ background: '#fafafa', padding: '40px 32px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Star size={28} strokeWidth={1} style={{ marginBottom: '24px', color: '#000' }} />
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginBottom: '12px', color: '#000' }}>Personal Stylist</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6' }}>
              Connect directly with Arundhati De-Sheth for a private consultation on your next bespoke heirloom piece.
            </p>
            <a href="https://wa.me/919581822000" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', borderBottom: '1px solid #000', paddingBottom: '2px', marginTop: 'auto', textDecoration: 'none' }}>
              Request Appointment
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
