import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const metadata = user.user_metadata || {};

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        
        <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '8px', color: '#000' }}>
            Profile Settings
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Update your personal details and bespoke preferences.
          </p>
        </div>

        <ProfileForm initialData={metadata} email={user.email || ''} />

      </div>
    </div>
  );
}
