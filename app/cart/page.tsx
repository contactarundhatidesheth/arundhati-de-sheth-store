'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Lock, X } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)', padding: '64px 24px' }}>
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

              <button className="btn-primary" style={{ width: '100%', marginBottom: '16px' }}>
                Checkout
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
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
