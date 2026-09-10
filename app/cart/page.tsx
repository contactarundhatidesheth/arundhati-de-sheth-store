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
  const [activeStep, setActiveStep] = React.useState(1);
  const [pinLoading, setPinLoading] = React.useState(false);
  const router = useRouter();

  const handleZipChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, '').slice(0, 6);
    setGuestAddress({ ...guestAddress, zip });

    if (zip.length === 6) {
      setPinLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${zip}`);
        const data = await res.json();
        if (data && data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setGuestAddress(prev => ({
            ...prev,
            zip,
            city: postOffice.District || postOffice.Block,
            state: postOffice.State
          }));
        }
      } catch (err) {
        console.warn("Failed to autofill ZIP");
      } finally {
        setPinLoading(false);
      }
    }
  };

  const isStep1Valid = guestEmail && guestPhone;
  const isStep2Valid = guestName && guestAddress.line1 && guestAddress.city && guestAddress.state && guestAddress.zip;

  const inputStyle = { padding: '12px', border: '1px solid var(--border)', borderRadius: '4px', outline: 'none', background: 'var(--bg-primary)', width: '100%' };


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
                <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                  {/* Step 1: Contact Detail Accordion */}
                  <div style={{
                    border: '1px solid var(--border)', borderRadius: '8px', padding: 'clamp(16px, 3vw, 24px)',
                    opacity: activeStep === 1 || activeStep > 1 ? 1 : 0.6,
                    background: activeStep === 1 ? 'var(--bg-primary)' : '#fafafa',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setActiveStep(1)}>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 500, fontFamily: 'var(--font-serif)' }}>1. Contact Information</h3>
                      {activeStep > 1 && <span style={{ color: '#166534', fontSize: '0.9rem', fontWeight: 500 }}>✓ Completed</span>}
                    </div>

                    {activeStep === 1 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px', animation: 'fadeIn 0.3s' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email Address *</label>
                          <input type="email" placeholder="john@example.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required style={inputStyle} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phone Number *</label>
                          <input type="tel" placeholder="+91 98765 43210" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} required style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                          <button
                            className="btn-primary"
                            style={{ padding: '12px 32px', opacity: isStep1Valid ? 1 : 0.5 }}
                            disabled={!isStep1Valid}
                            onClick={() => setActiveStep(2)}
                          >
                            Continue to Shipping
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Shipping Details Accordion */}
                  <div style={{
                    border: '1px solid var(--border)', borderRadius: '8px', padding: 'clamp(16px, 3vw, 24px)',
                    opacity: activeStep === 2 || activeStep > 2 ? 1 : 0.6,
                    background: activeStep === 2 ? 'var(--bg-primary)' : '#fafafa',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: activeStep > 1 ? 'pointer' : 'default' }} onClick={() => activeStep > 1 && setActiveStep(2)}>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 500, fontFamily: 'var(--font-serif)' }}>2. Shipping Address</h3>
                      {activeStep > 2 && <span style={{ color: '#166534', fontSize: '0.9rem', fontWeight: 500 }}>✓ Completed</span>}
                    </div>

                    {activeStep === 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px', animation: 'fadeIn 0.3s' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Full Name *</label>
                            <input type="text" placeholder="John Doe" value={guestName} onChange={(e) => setGuestName(e.target.value)} required style={inputStyle} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Postal Code *</label>
                            <div style={{ position: 'relative' }}>
                              <input type="text" placeholder="400001" value={guestAddress.zip} onChange={handleZipChange} required style={inputStyle} />
                              {pinLoading && <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Auto-filling...</span>}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Address Line 1 *</label>
                            <input type="text" placeholder="House/Flat No., Building Name, Street" value={guestAddress.line1} onChange={(e) => setGuestAddress({ ...guestAddress, line1: e.target.value })} required style={inputStyle} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Address Line 2 (Optional)</label>
                            <input type="text" placeholder="Landmark, Area, or additional details" value={guestAddress.line2} onChange={(e) => setGuestAddress({ ...guestAddress, line2: e.target.value })} style={inputStyle} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>City *</label>
                            <input type="text" placeholder="Mumbai" value={guestAddress.city} onChange={(e) => setGuestAddress({ ...guestAddress, city: e.target.value })} required style={inputStyle} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>State *</label>
                            <input type="text" placeholder="Maharashtra" value={guestAddress.state} onChange={(e) => setGuestAddress({ ...guestAddress, state: e.target.value })} required style={inputStyle} />
                          </div>
                        </div>

                        <div style={{ marginTop: '12px' }}>
                          <button
                            className="btn-primary"
                            style={{ padding: '12px 32px', opacity: isStep2Valid ? 1 : 0.5 }}
                            disabled={!isStep2Valid}
                            onClick={() => setActiveStep(3)}
                          >
                            Proceed to Payment
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 3: Secure Payment Indicator Placeholder (Actual payload is on the right sidebar) */}
                  <div style={{
                    border: '1px solid var(--border)', borderRadius: '8px', padding: 'clamp(16px, 3vw, 24px)',
                    opacity: activeStep === 3 ? 1 : 0.6,
                    background: activeStep === 3 ? 'var(--bg-primary)' : '#fafafa',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 500, fontFamily: 'var(--font-serif)' }}>3. Secure Payment</h3>
                    </div>
                    {activeStep === 3 && (
                      <div style={{ marginTop: '16px', animation: 'fadeIn 0.3s' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Your shipping details have been securely locked. Please complete your transaction using the Order Summary panel on the right.</p>
                      </div>
                    )}
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


                <button
                  className="btn-primary"
                  style={{ width: '100%', marginBottom: '16px', opacity: (isProcessing || activeStep !== 3) ? 0.7 : 1 }}
                  onClick={handleCheckout}
                  disabled={isProcessing || activeStep !== 3}
                >
                  {isProcessing ? 'Processing SECURE CHECKOUT...' : 'Checkout Safely'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Lock size={14} /> <span>100% Secure SSL</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: 'bold' }}>₹</span> <span>Insured Shipping</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
