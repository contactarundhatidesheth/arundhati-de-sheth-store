'use client';

import React, { useState } from 'react';
import { saveCoupon } from '@/app/admin/actions';

interface ProductItem {
  id: string;
  title: string;
  price: number;
}

export function CouponCreationForm({ products }: { products: ProductItem[] }) {
  const [appliesTo, setAppliesTo] = useState<'ALL' | 'SELECTED'>('ALL');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState('');

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedProductIds(products.map(p => String(p.id)));
  };

  const clearAll = () => {
    setSelectedProductIds([]);
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <form action={saveCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'flex-start' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            Coupon Code *
          </label>
          <input
            required
            type="text"
            name="code"
            placeholder="e.g. RINGSSPECIAL20"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            Discount Type
          </label>
          <select
            name="discountType"
            defaultValue="PERCENTAGE"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
              background: '#fff',
            }}
          >
            <option value="PERCENTAGE">Percentage (%)</option>
            <option value="FIXED">Flat Amount (₹)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            Discount Value *
          </label>
          <input
            required
            type="number"
            name="discountValue"
            min="1"
            step="any"
            placeholder="e.g. 15 for 15% or 5000 for ₹5,000"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>
            Minimum Cart Order (₹)
          </label>
          <input
            type="number"
            name="minOrder"
            defaultValue="0"
            min="0"
            placeholder="0"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
            }}
          />
        </div>
      </div>

      {/* Scope: All products vs Selected products */}
      <div style={{ background: '#fafafa', padding: '16px 20px', borderRadius: '6px', border: '1px solid #eee' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px' }}>
          Applies To:
        </label>
        
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="radio"
              name="appliesTo"
              value="ALL"
              checked={appliesTo === 'ALL'}
              onChange={() => setAppliesTo('ALL')}
            />
            All Products in Store
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
            <input
              type="radio"
              name="appliesTo"
              value="SELECTED"
              checked={appliesTo === 'SELECTED'}
              onChange={() => setAppliesTo('SELECTED')}
            />
            Specific Selected Products Only
          </label>
        </div>

        {/* Selected Products Picker */}
        {appliesTo === 'SELECTED' && (
          <div style={{ marginTop: '16px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '6px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#333' }}>
                Selected ({selectedProductIds.length} of {products.length})
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={selectAll}
                  style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Clear Selection
                </button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Search products by title..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '0.85rem'
              }}
            />

            <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
              {filteredProducts.map(p => {
                const isChecked = selectedProductIds.includes(String(p.id));
                return (
                  <label
                    key={p.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '4px',
                      background: isChecked ? '#f0fdf4' : '#fafafa',
                      border: isChecked ? '1px solid #bbf7d0' : '1px solid #f0f0f0',
                      cursor: 'pointer',
                      fontSize: '0.88rem'
                    }}
                  >
                    <input
                      type="checkbox"
                      name="applicableProducts"
                      value={String(p.id)}
                      checked={isChecked}
                      onChange={() => toggleProduct(String(p.id))}
                    />
                    <span style={{ flex: 1, fontWeight: isChecked ? 500 : 400 }}>{p.title}</span>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>₹{p.price.toLocaleString('en-IN')}</span>
                  </label>
                );
              })}
            </div>
            {appliesTo === 'SELECTED' && selectedProductIds.length === 0 && (
              <p style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '8px', margin: '8px 0 0' }}>
                ⚠️ Please select at least one product this coupon applies to.
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <input type="hidden" name="status" value="active" />
        <button
          type="submit"
          disabled={appliesTo === 'SELECTED' && selectedProductIds.length === 0}
          style={{
            background: appliesTo === 'SELECTED' && selectedProductIds.length === 0 ? '#888' : '#000',
            color: '#fff',
            padding: '12px 32px',
            borderRadius: '4px',
            border: 'none',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: appliesTo === 'SELECTED' && selectedProductIds.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          + Create Coupon
        </button>
      </div>
    </form>
  );
}
