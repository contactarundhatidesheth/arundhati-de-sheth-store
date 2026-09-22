'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { deleteProduct } from '@/app/admin/actions';
import SequenceEditor from '../(dashboard)/SequenceEditor';

export default function ProductTableClient({ products }: { products: any[] }) {
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

    // Filter products based on selections, then sort by sequence
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesMetal = selectedMetal === 'All' || (p.metal && p.metal.includes(selectedMetal));
            const matchesCollection = selectedCollection === 'All' || p.collection === selectedCollection;
            return matchesMetal && matchesCollection;
        }).sort((a, b) => (a.sequence ?? 999) - (b.sequence ?? 999));
    }, [products, selectedMetal, selectedCollection]);

    return (
        <div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>Filter by Metal</label>
                    <select
                        value={selectedMetal}
                        onChange={(e) => setSelectedMetal(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}
                    >
                        {uniqueMetals.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '500', color: '#666' }}>Filter by Collection</label>
                    <select
                        value={selectedCollection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', background: '#fff' }}
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
                                    <td style={{ padding: '16px 24px', color: '#666' }}>₹{p.price.toLocaleString('en-IN')}</td>
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
