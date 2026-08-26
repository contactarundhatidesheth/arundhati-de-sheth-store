import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Revenue</h3>
          <p style={{ fontSize: '2rem', fontWeight: '300' }}>₹0.00</p>
        </div>
        
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <h3 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: '300' }}>0</p>
        </div>

      </div>
    </div>
  );
}
