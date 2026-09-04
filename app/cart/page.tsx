'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useCart } from '@/context/CartContext';
import { Lock, X, LogIn } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: subtotal,
          cartItems: cart,
          shippingAddress: user?.user_metadata?.shipping_address || {}
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
              alert('Payment Successful! Your order has been placed.');
              clearCart();
              router.push('/account');
            } else {
              alert('Payment Verification Failed: ' + verifyData.error);
            }
          } catch (err) {
            alert('Error verifying payment.');
          }
        },
        theme: {
          color: "#000000"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert('Payment Failed: ' + response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      alert('Secure Checkout is currently initializing or unavailable: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div style={{ minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)', padding: '144px 24px 64px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px' }}>
          
          {/* Left: Cart Items */}
          <div>
            <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
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
                  <div key={item.product.id} style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
                    <div style={{ position: 'relative', width: '120px', aspectRatio: '4/5', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '400', fontFamily: 'var(--font-sans)' }}>
                          {item.product.title}
                        </h3>
                        <p style={{ fontSize: '1.1rem' }}>₹{item.product.price.toLocaleString('en-IN')}</p>
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

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '500', marginBottom: '32px' }}>
                <span>Total</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {user ? (
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginBottom: '16px', opacity: isProcessing ? 0.7 : 1 }}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Checkout'}
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}
                  onClick={() => router.push('/login')}
                >
                  <LogIn size={18} />
                  Login to Checkout
                </button>
              )}

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
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      </div>
    </>
  );
}
