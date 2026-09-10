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
                  <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>Name: <strong>{order.shipping_address?.name || 'N/A'}</strong></p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Email: {order.user_email}</p>
                  <p style={{ fontSize: '0.85rem', color: '#666' }}>Phone: {order.user_phone}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                  <form action={async (formData) => {
                    "use server";
                    const supabaseServer = createClient();
                    const newStatus = formData.get('status') as string;
                    const trackingNumber = formData.get('trackingNumber') as string;
                    const updatedShipping = { ...order.shipping_address, tracking_number: trackingNumber || null };
                    await supabaseServer.from('orders').update({
                      status: newStatus,
                      shipping_address: updatedShipping
                    }).eq('id', order.id);
                    const { revalidatePath } = await import('next/cache');
                    revalidatePath('/admin/orders');
                  }} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
                    <select name="status" defaultValue={order.status} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }}>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Packaging">Packaging</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <input name="trackingNumber" defaultValue={order.shipping_address?.tracking_number || ''} placeholder="Docket Tracking Number" style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem', width: '200px' }} />
                    <button type="submit" style={{ padding: '6px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Update</button>
                  </form>
                  <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>₹{order.amount.toLocaleString('en-IN')}</p>
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
                  {order.shipping_address?.line1}<br />
                  {order.shipping_address?.line2 && <>{order.shipping_address.line2}<br /></>}
                  {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip || order.shipping_address?.postalCode}<br />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
