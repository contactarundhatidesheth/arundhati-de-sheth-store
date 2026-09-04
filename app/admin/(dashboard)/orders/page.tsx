import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function OrdersAdminPage() {
  const supabase = createClient();
  
  // Fetch orders directly, thanks to our RLS policy we get all orders if admin
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Orders</h1>
      
      {(!orders || orders.length === 0) ? (
        <div style={{ padding: '32px', background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          No orders found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map((order) => (
            <div key={order.id} style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>Order #{order.id.slice(0, 8)}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Placed on {new Date(order.created_at).toLocaleString()}</p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Client: {order.user_email}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    background: order.status === 'Paid' ? '#e6f4ea' : '#fce8e6',
                    color: order.status === 'Paid' ? '#1e8e3e' : '#d93025'
                  }}>
                    {order.status}
                  </span>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '8px' }}>₹{order.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>
              
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Items</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {(order.items as any[]).map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span>{item.quantity}x {item.product.title}</span>
                      <span>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shipping Details</h4>
                <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5 }}>
                  {order.shipping_address?.line1}<br/>
                  {order.shipping_address?.line2 && <>{order.shipping_address.line2}<br/></>}
                  {order.shipping_address?.landmark && <>Landmark: {order.shipping_address.landmark}<br/></>}
                  {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.postalCode}<br/>
                  {order.shipping_address?.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
