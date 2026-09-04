import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';

export default async function AdminDashboard() {
  const db = await readDB();
  
  const totalProducts = db.products.length;
  const totalCatalogues = db.catalogues.length;
  const totalBlogs = db.blogs.length;
  
  const analytics = db.analytics || {
    visitors: 0,
    whatsappClicks: 0,
    productViews: {},
    dailyVisitors: {},
    referrers: {}
  };

  // Calculate Top 3 Products
  const sortedProducts = [...db.products].sort((a, b) => {
    const viewsA = analytics.productViews[a.handle] || 0;
    const viewsB = analytics.productViews[b.handle] || 0;
    return viewsB - viewsA;
  });
  const topProducts = sortedProducts.slice(0, 3);

  // Format daily visitors for chart
  const today = new Date();
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: dateStr,
      value: analytics.dailyVisitors[dateStr] || 0
    };
  });

  const maxDaily = Math.max(...last7Days.map(d => d.value), 10);
  const chartPoints = last7Days.map((d, i) => {
    const x = (i / 6) * 1000;
    const y = 250 - ((d.value / maxDaily) * 170); // 80 to 250 range
    return [x, y];
  });
  
  const pathD = `M 0 250 ` + chartPoints.map(p => `L ${p[0]} ${p[1]}`).join(' ');
  const fillPathD = pathD + ` L 1000 300 L 0 300 Z`;

  // Calculate Traffic Sources percentages
  const ref = analytics.referrers || {};
  const totalRef = Object.values(ref).reduce((sum, v) => sum + v, 0) || 1; // avoid /0
  
  const getPct = (source: string) => Math.round(((ref[source] || 0) / totalRef) * 100);
  const igPct = getPct('Instagram');
  const googlePct = getPct('Google Search');
  const directPct = getPct('Direct');
  
  const igEnd = igPct;
  const googleEnd = igPct + googlePct;

  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: '#111' }}>Command Center</h1>
        <span style={{ fontSize: '0.85rem', color: '#666', background: '#eaeaea', padding: '6px 12px', borderRadius: '4px' }}>
          Real-time Analytics Active
        </span>
      </div>

      {/* Summary Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Total Visitors</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#111' }}>{analytics.visitors.toLocaleString()}</p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>WhatsApp Inquiries</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <p style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#111' }}>{analytics.whatsappClicks.toLocaleString()}</p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Active Products</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#111' }}>{totalProducts}</p>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Catalogues & Press</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, color: '#111' }}>{totalCatalogues + totalBlogs}</p>
        </div>

      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
        
        {/* Line Chart Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: '#111', margin: '0 0 24px 0' }}>Visitor Traffic (7 Days)</h3>
          
          <div style={{ height: '300px', position: 'relative', width: '100%', borderBottom: '1px solid #eaeaea', borderLeft: '1px solid #eaeaea' }}>
            {/* SVG Line Chart */}
            <svg viewBox="0 0 1000 300" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(17,17,17,0.15)" />
                  <stop offset="100%" stopColor="rgba(17,17,17,0)" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              {[0, 100, 200].map(y => (
                <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#f0f0f0" strokeWidth="1" />
              ))}
              
              {/* Data Path */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="#111" 
                strokeWidth="3" 
              />
              
              {/* Fill Area */}
              <path 
                d={fillPathD} 
                fill="url(#lineGrad)" 
              />
              
              {/* Data Points */}
              {chartPoints.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="5" fill="#fff" stroke="#111" strokeWidth="2" />
              ))}
            </svg>
            
            {/* X-Axis Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', color: '#888', fontSize: '0.75rem' }}>
              {last7Days.map((d, i) => <span key={i}>{d.label}</span>)}
            </div>
          </div>
        </div>

        {/* Donut Chart Section */}
        <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: '#111', margin: '0 0 32px 0', width: '100%' }}>Traffic Sources</h3>
          
          {/* CSS Donut Chart */}
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: `conic-gradient(#111 0% ${igEnd}%, #666 ${igEnd}% ${googleEnd}%, #d4af37 ${googleEnd}% 100%)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: '#fff'
            }} />
          </div>
          
          {/* Legend */}
          <div style={{ width: '100%', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#111' }} />
                <span>Instagram (Direct)</span>
              </div>
              <span style={{ fontWeight: '500' }}>{igPct}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#666' }} />
                <span>Google Search</span>
              </div>
              <span style={{ fontWeight: '500' }}>{googlePct}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#d4af37' }} />
                <span>Direct / Other</span>
              </div>
              <span style={{ fontWeight: '500' }}>{directPct}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Top Performing Pieces */}
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: '#111', margin: '0 0 24px 0' }}>Top Performing Pieces</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eaeaea', color: '#888', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '0 0 16px 0', fontWeight: '500' }}>Product</th>
              <th style={{ padding: '0 0 16px 0', fontWeight: '500' }}>Collection</th>
              <th style={{ padding: '0 0 16px 0', fontWeight: '500' }}>Page Views</th>
              <th style={{ padding: '0 0 16px 0', fontWeight: '500', textAlign: 'right' }}>WhatsApp Inquiries</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p, idx) => (
              <tr key={p.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                <td style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <img src={p.images[0]} alt={p.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ fontWeight: '500', color: '#111' }}>{p.title}</span>
                </td>
                <td style={{ padding: '20px 0', color: '#666', fontSize: '0.9rem' }}>{p.collection}</td>
                <td style={{ padding: '20px 0', color: '#666', fontSize: '0.9rem' }}>{analytics.productViews[p.handle] || 0}</td>
                <td style={{ padding: '20px 0', color: '#111', fontSize: '0.9rem', textAlign: 'right', fontWeight: '500' }}>-</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/admin/products" style={{ fontSize: '0.85rem', color: '#0066cc', textDecoration: 'underline' }}>View Full Inventory</Link>
        </div>
      </div>

    </div>
  );
}
