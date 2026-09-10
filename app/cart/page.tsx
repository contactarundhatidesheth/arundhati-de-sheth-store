'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useCart } from '@/context/CartContext';
import { Lock, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [guestName, setGuestName] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestPhone, setGuestPhone] = React.useState('');
  const [guestAddress, setGuestAddress] = React.useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [checkoutMessage, setCheckoutMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  const inputStyle = { padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none', background: 'var(--bg-primary)' };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setCheckoutMessage(null);

    // Validate simple required fields
    if (!guestName || !guestEmail || !guestPhone || !guestAddress.line1 || !guestAddress.city || !guestAddress.state || !guestAddress.zip) {
      setCheckoutMessage({ type: 'error', text: 'Please fill in all required contact and shipping details.' });
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: subtotal,
          cartItems: cart,
          guestName,
          guestEmail,
          guestPhone,
          shippingAddress: guestAddress
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      const options = {
        key: data.keyId,
        amount: subtotal * 100,
        currency: "INR",
        name: "Arundhati De-Sheth",
        description: "Fine Jewellery Transaction",
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });
            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              setCheckoutMessage({ type: 'success', text: 'Payment Successful! Your order has been placed. Redirecting to tracking...' });
              clearCart();
              setTimeout(() => { router.push(`/track?order=${data.orderId}`); }, 2000);
            } else {
              setCheckoutMessage({ type: 'error', text: 'Payment Verification Failed: ' + verifyData.error });
            }
          } catch (err) {
            setCheckoutMessage({ type: 'error', text: 'Error verifying payment.' });
          }
        },
        theme: {
          color: "#000000"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setCheckoutMessage({ type: 'error', text: 'Payment Failed: ' + response.error.description });
      });
      rzp.open();
    } catch (err: any) {
      setCheckoutMessage({ type: 'error', text: 'Secure Checkout is currently initializing or unavailable: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div style={{ minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)', padding: '144px 24px 64px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px' }}>

            {/* Left: Cart Items */}
            <div>
              <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'var(--font-serif)', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                My Cart
              </h1>

              {cart.length === 0 ? (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Cart is empty</p>
                  <Link href="/category/all-products" className="btn-primary">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item" style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
                      <div className="cart-item-img" style={{ position: 'relative', width: '120px', aspectRatio: '4/5', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '12px' }}>
                          <h3 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: '400', fontFamily: 'var(--font-sans)', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                            {item.product.title}
                          </h3>
                          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', flexShrink: 0 }}>₹{item.product.price.toLocaleString('en-IN')}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto', border: '1px solid var(--border)', width: 'fit-content' }}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            style={{ padding: '8px 16px', fontSize: '1rem' }}
                          >-</button>
                          <span style={{ fontSize: '0.9rem', padding: '0 12px' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            style={{ padding: '8px 16px', fontSize: '1rem' }}
                          >+</button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ alignSelf: 'flex-start', color: 'var(--text-muted)' }}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <button style={{ color: 'var(--text-main)', fontSize: '0.9rem', textDecoration: 'underline', padding: 0 }}>
                      Enter a promo code
                    </button>
                  </div>
                  <div>
                    <button style={{ color: 'var(--text-main)', fontSize: '0.9rem', textDecoration: 'underline', padding: 0 }}>
                      Add a note
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Order Summary */}
            {cart.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                  Order Summary
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
                  <Link href="#" style={{ fontSize: '0.9rem', textDecoration: 'underline' }}>
                    Estimate Shipping
                  </Link>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '500', margin: '32px 0' }}>
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {checkoutMessage && (
                  <div style={{
                    padding: '16px',
                    marginBottom: '24px',
                    backgroundColor: checkoutMessage.type === 'error' ? '#fee2e2' : '#dcfce7',
                    color: checkoutMessage.type === 'error' ? '#991b1b' : '#166534',
                    border: `1px solid ${checkoutMessage.type === 'error' ? '#f87171' : '#4ade80'}`,
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}>
                    {checkoutMessage.text}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1rem', color: '#111', fontWeight: '500', marginBottom: '8px' }}>Checkout Details</h3>
                  <input type="text" placeholder="Full Name *" value={guestName} onChange={(e) => setGuestName(e.target.value)} required style={inputStyle} />
                  <input type="email" placeholder="Email Address *" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required style={inputStyle} />
                  <input type="tel" placeholder="Phone Number *" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required style={inputStyle} />

                  <h3 style={{ fontSize: '1rem', color: '#111', fontWeight: '500', marginTop: '16px', marginBottom: '8px' }}>Shipping Address</h3>
                  <input type="text" placeholder="Address Line 1 *" value={guestAddress.line1} onChange={(e) => setGuestAddress({ ...guestAddress, line1: e.target.value })} required style={inputStyle} />
                  <input type="text" placeholder="Address Line 2 (Optional)" value={guestAddress.line2} onChange={(e) => setGuestAddress({ ...guestAddress, line2: e.target.value })} style={inputStyle} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <input type="text" placeholder="City *" value={guestAddress.city} onChange={(e) => setGuestAddress({ ...guestAddress, city: e.target.value })} required style={inputStyle} />
                    <input type="text" placeholder="State *" value={guestAddress.state} onChange={(e) => setGuestAddress({ ...guestAddress, state: e.target.value })} required style={inputStyle} />
                  </div>
                  <input type="text" placeholder="Postal Code *" value={guestAddress.zip} onChange={(e) => setGuestAddress({ ...guestAddress, zip: e.target.value })} required style={inputStyle} />
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', marginBottom: '16px', opacity: isProcessing ? 0.7 : 1 }}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing SECURE CHECKOUT...' : 'Checkout Safely'}
                </button>



                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <Lock size={14} />
                  <span>Secure Checkout</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <style jsx>{`
        @media (max-width: 900px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .cart-item {
            gap: 16px !important;
          }
          .cart-item-img {
            width: 90px !important;
          }
        }
      `}</style>
      </div>
    </>
  );
}
