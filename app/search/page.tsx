'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { useCMSData } from '@/hooks/useCMSData';

export default function SearchPage() {
    const { data, loading } = useCMSData();
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus the search input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    if (loading) return <div style={{ minHeight: '100vh', background: '#FFF' }} />;

    const PRODUCTS = data.products || [];

    // Filter products by search query
    const filteredProducts = searchQuery.trim()
        ? PRODUCTS.filter(p => (p.isActive !== false) && (
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.collection && p.collection.toLowerCase().includes(searchQuery.toLowerCase()))
        ))
        : [];

    return (
        <div className="search-wrapper" style={{ minHeight: '100vh', background: '#FFF', paddingTop: '100px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header containing search input */}
                <div style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '24px', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Search size={24} color="#000" style={{ position: 'absolute', left: 0 }} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for jewellery..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '16px 40px 16px 48px',
                                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                fontFamily: 'var(--font-serif)',
                                fontWeight: 300,
                                color: '#000'
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    display: 'flex'
                                }}
                            >
                                <X size={24} color="#000" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery.trim() ? (
                    <div>
                        <h2 style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', color: '#666' }}>
                            {filteredProducts.length} Results for &quot;{searchQuery}&quot;
                        </h2>

                        {filteredProducts.length === 0 ? (
                            <div style={{ padding: '40px 0', textAlign: 'center', color: '#888' }}>
                                <p>No results found for your search. Try different keywords.</p>
                            </div>
                        ) : (
                            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px 16px' }}>
                                {filteredProducts.map(product => (
                                    <Link href={`/product/${product.handle}`} key={product.id} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '14px' }}>
                                            <Image
                                                src={product.images?.[0] || '/placeholder.png'}
                                                alt={product.title}
                                                fill
                                                style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }}
                                                className="product-img"
                                            />
                                        </div>
                                        <div style={{ padding: '0 4px 4px' }}>
                                            <p style={{ color: '#000', fontSize: '12px', fontWeight: 400, letterSpacing: '0.3px', marginBottom: '3px' }}>{product.title}</p>
                                            <p style={{ color: '#666', fontSize: '11px', fontWeight: 400 }}>
                                                ₹ {product.price?.toLocaleString('en-IN') || 0}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ paddingTop: '40px', color: '#888' }}>
                        <p style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
                            Begin typing to search our collections...
                        </p>
                    </div>
                )}
            </div>

            <style>{`
        .product-img:hover { transform: scale(1.05); }
        
        @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { 
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px 12px !important; } 
        }
      `}</style>
        </div>
    );
}
