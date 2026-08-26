'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(2px)' }}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          background: 'var(--bg-primary)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 101,
          animation: 'slideInRight 0.3s ease-out forwards',
        }}
        className="animate-slide-in"
      >
        {/* Header */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: '500' }}>Cart</h3>
          <button onClick={() => setIsCartOpen(false)} style={{ color: 'var(--text-main)', padding: '4px', background: 'none', border: 'none' }} aria-label="Close Cart">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Your cart is empty.
              </p>
              <button onClick={() => setIsCartOpen(false)} className="btn-primary" style={{ fontSize: '0.8rem' }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ position: 'relative', width: '90px', height: '120px', background: 'var(--bg-secondary)', flexShrink: 0 }}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '400', lineHeight: '1.4' }}>
                        {item.product.title}
                      </h4>
                      <button
                         onClick={() => removeFromCart(item.product.id)}
                         style={{ color: 'var(--text-muted)' }}
                         aria-label="Remove item"
                      >
                         <Trash2 size={16} />
                      </button>
                    </div>
                    <p style={{ fontSize: '1rem' }}>₹{item.product.price.toLocaleString('en-IN')}</p>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', border: '1px solid var(--border)', width: 'fit-content' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: '4px 12px', fontSize: '0.9rem' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', padding: '0 8px' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: '4px 12px', fontSize: '0.9rem' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid var(--border)', background: 'var(--bg-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--text-main)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.9rem' }}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
        .animate-slide-in {
          animation: slideInRight 0.3s ease-out forwards;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
