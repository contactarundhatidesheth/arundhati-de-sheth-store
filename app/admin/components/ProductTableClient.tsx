'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { deleteProduct } from '@/app/admin/actions';
import SequenceEditor from '../(dashboard)/SequenceEditor';

export default function ProductTableClient({ products }: { products: any[] }) {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedMetal, setSelectedMetal] = useState<string>('All');
    const [selectedCollection, setSelectedCollection] = useState<string>('All');

    // Extract unique metals and collections for the dropdowns
    const uniqueMetals = useMemo(() => {
        const metals = new Set<string>();
        products.forEach(p => {
            if (p.metal) {
                p.metal.split(',').forEach((m: string) => metals.add(m.trim()));
            }
        });
        return ['All', ...Array.from(metals).filter(Boolean)];
    }, [products]);

    const uniqueCollections = useMemo(() => {
        const collections = new Set<string>();
        products.forEach(p => {
            if (p.collection) collections.add(p.collection);
        });
        return ['All', ...Array.from(collections).filter(Boolean)];
    }, [products]);

    // Filter products based on selections and search query, then sort by sequence
    const filteredProducts = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();
        return products.filter(p => {
            const matchesMetal = selectedMetal === 'All' || (p.metal && p.metal.includes(selectedMetal));
            const matchesCollection = selectedCollection === 'All' || p.collection === selectedCollection;
            const matchesSearch = !q || (
                (p.title && p.title.toLowerCase().includes(q)) ||
                (p.handle && p.handle.toLowerCase().includes(q)) ||
                (p.collection && p.collection.toLowerCase().includes(q)) ||
                (p.metal && p.metal.toLowerCase().includes(q)) ||
                (p.category && p.category.toLowerCase().includes(q)) ||
                (p.id && p.id.toLowerCase().includes(q))
            );
            return matchesMetal && matchesCollection && matchesSearch;
        }).sort((a, b) => (a.sequence ?? 999) - (b.sequence ?? 999));
    }, [products, selectedMetal, selectedCollection, searchQuery]);

    return (
        <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: '1', minWidth: '260px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>Search Products</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Search by title, handle, category, metal..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '9px 36px 9px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', fontSize: '0.9rem', outline: 'none' }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '1.1rem', lineHeight: 1 }}
                                title="Clear search"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '160px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>Filter by Metal</label>
                    <select
                        value={selectedMetal}
                        onChange={(e) => setSelectedMetal(e.target.value)}
                        style={{ padding: '9px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', fontSize: '0.9rem' }}
                    >
                        {uniqueMetals.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '180px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>Filter by Collection</label>
                    <select
                        value={selectedCollection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        style={{ padding: '9px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff', fontSize: '0.9rem' }}
                    >
                        {uniqueCollections.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Image</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Product Name</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Metal</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Collection</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Price</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                    No products match the selected filters.
                                </td>
                            </tr>
                        ) : (
                            filteredProducts.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <SequenceEditor collection="products" id={p.id} initialSequence={p.sequence ?? ''} />
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <img src={p.images[0]} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '16px 24px', fontWeight: '500' }}>{p.title}</td>
                                    <td style={{ padding: '16px 24px', color: '#666' }}>{p.metal}</td>
                                    <td style={{ padding: '16px 24px', color: '#666' }}>{p.collection}</td>
                                    <td style={{ padding: '16px 24px', color: '#666' }}>
                                        {p.isPriceOnRequest ? (
                                            <span style={{ display: 'inline-block', background: '#f4f4f4', border: '1px solid #e0e0e0', color: '#555', padding: '3px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                                                Price on Request
                                            </span>
                                        ) : (
                                            `₹${p.price.toLocaleString('en-IN')}`
                                        )}
                                    </td>
                                    <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                                        <Link href={`/admin/products/${p.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                                        <form action={async () => { await deleteProduct(p.id); }}>
                                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
