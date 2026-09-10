'use client';

import React, { useState } from 'react';

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState<any>(null);
    const [errorMSG, setErrorMSG] = useState('');

    const submitTracking = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMSG('');
        setOrderData(null);

        try {
            const res = await fetch('/api/track-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, emailOrPhone })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setOrderData(data.order);
        } catch (err: any) {
            setErrorMSG(err.message || 'Error tracking your order.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '600px', padding: '48px 24px' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '16px', textAlign: 'center' }}>Track Your Order</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>Enter your order checkout ID and email/phone to check the status.</p>

                {!orderData ? (
                    <form onSubmit={submitTracking} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {errorMSG && (
                            <div style={{ padding: '16px', background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '4px' }}>
                                {errorMSG}
                            </div>
                        )}
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order ID *</label>
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                required
                                placeholder="order_xyz987"
                                style={{ width: '100%', padding: '16px', fontSize: '1rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email or Phone Number *</label>
                            <input
                                type="text"
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                required
                                placeholder="you@email.com or +91..."
                                style={{ width: '100%', padding: '16px', fontSize: '1rem', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none' }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isLoading}
                            style={{ width: '100%', padding: '16px', marginTop: '16px', opacity: isLoading ? 0.7 : 1 }}
                        >
                            {isLoading ? 'Searching securely...' : 'Track Order'}
                        </button>
                    </form>
                ) : (
                    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Order Details</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Status</span>
                            <span style={{ fontWeight: '500', padding: '4px 12px', background: orderData.status === 'Pending' ? '#fff3cd' : '#d1e7dd', color: orderData.status === 'Pending' ? '#856404' : '#0f5132', borderRadius: '24px', fontSize: '0.85rem' }}>{orderData.status}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Total Amount</span>
                            <span style={{ fontWeight: '500' }}>₹{orderData.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Payment Verification</span>
                            <span style={{ fontWeight: '500' }}>{orderData.razorpay_payment_id || 'Awaiting Sync'}</span>
                        </div>

                        <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>Items</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {orderData.items.map((item: any, idx: number) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '4px', backgroundImage: `url(${item.product.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        <span style={{ fontSize: '0.9rem' }}>{item.quantity}x {item.product.title}</span>
                                    </div>
                                    <span style={{ fontSize: '0.9rem' }}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setOrderData(null)}
                            style={{ padding: '12px 24px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '4px', marginTop: '32px', width: '100%', cursor: 'pointer' }}
                        >
                            Track Another Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
