'use client';

import React, { useState } from 'react';

interface FilterPillsProps {
    name: string;
    options: string[];
    defaultValue?: string;
    label: string;
    multiple?: boolean;
}

export default function FilterPills({ name, options: initialOptions, defaultValue = '', label, multiple = false }: FilterPillsProps) {
    // Ensure the default value is in the options list if it exists
    const defaultVals = multiple ? (defaultValue ? defaultValue.split(',').map(s => s.trim()).filter(Boolean) : []) : (defaultValue ? [defaultValue] : []);
    const baseOptions = [...initialOptions];
    defaultVals.forEach(val => {
        if (!baseOptions.includes(val)) {
            baseOptions.push(val);
        }
    });

    const [options, setOptions] = useState<string[]>(Array.from(new Set(baseOptions.filter(Boolean))));
    const [selected, setSelected] = useState<string[]>(defaultVals);
    const [customVal, setCustomVal] = useState('');

    const toggleSelected = (opt: string) => {
        if (multiple) {
            setSelected(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]);
        } else {
            setSelected([opt]);
        }
    };

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        const trimmed = customVal.trim();
        if (trimmed && !options.includes(trimmed)) {
            setOptions(prev => [...prev, trimmed]);
            toggleSelected(trimmed);
            setCustomVal('');
        } else if (trimmed && options.includes(trimmed)) {
            toggleSelected(trimmed);
            setCustomVal('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>{label}</label>
            <input type="hidden" name={name} value={multiple ? selected.join(', ') : (selected[0] || '')} required />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', background: '#fafafa', minHeight: '64px' }}>
                {options.map(opt => (
                    <button
                        key={opt}
                        type="button"
                        onClick={(e) => { e.preventDefault(); toggleSelected(opt); }}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            border: selected.includes(opt) ? '1px solid #000' : '1px solid #ccc',
                            background: selected.includes(opt) ? '#000' : '#fff',
                            color: selected.includes(opt) ? '#fff' : '#333',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {opt}
                    </button>
                ))}

                {options.length === 0 && <span style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>No parameters registered yet...</span>}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <input
                    type="text"
                    value={customVal}
                    onChange={(e) => setCustomVal(e.target.value)}
                    placeholder={`Or type a new ${label.toLowerCase()}...`}
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: 1, fontSize: '0.85rem' }}
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    style={{ padding: '8px 16px', background: '#eaeaea', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
