'use client';

import React, { useState, useTransition } from 'react';
import { updateProductInventory } from '@/app/admin/actions';

interface InventoryEditorProps {
  id: string;
  initialStock: number;
  initialMadeToOrder: boolean;
}

export default function InventoryEditor({ id, initialStock, initialMadeToOrder }: InventoryEditorProps) {
  const [stock, setStock] = useState<number>(initialStock);
  const [isMadeToOrder, setIsMadeToOrder] = useState<boolean>(initialMadeToOrder);
  const [isPending, startTransition] = useTransition();
  const [savedTick, setSavedTick] = useState(false);

  const saveInventory = (newStock: number, newMto: boolean) => {
    startTransition(async () => {
      const res = await updateProductInventory(id, newStock, newMto);
      if (res?.success) {
        setSavedTick(true);
        setTimeout(() => setSavedTick(false), 2000);
      }
    });
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const validVal = isNaN(val) ? 0 : Math.max(0, val);
    setStock(validVal);
  };

  const handleStockBlur = () => {
    if (stock !== initialStock) {
      saveInventory(stock, isMadeToOrder);
    }
  };

  const handleMtoToggle = () => {
    const nextMto = !isMadeToOrder;
    setIsMadeToOrder(nextMto);
    saveInventory(stock, nextMto);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '150px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: '#777', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Stock:</span>
        <input
          type="number"
          min="0"
          value={stock}
          onChange={handleStockChange}
          onBlur={handleStockBlur}
          disabled={isPending}
          style={{
            width: '52px',
            padding: '4px 6px',
            fontSize: '0.85rem',
            border: stock === 0 ? '1px solid #d9534f' : '1px solid #ccc',
            background: stock === 0 ? '#fff8f8' : '#fff',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: 600,
            color: stock === 0 ? '#d9534f' : '#222'
          }}
          title="Stock count. Click outside or press enter to save."
        />
        {savedTick && <span style={{ color: '#28a745', fontSize: '0.85rem', fontWeight: 'bold' }}>✓</span>}
        {isPending && <span style={{ color: '#888', fontSize: '0.75rem' }}>...</span>}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.78rem', color: isMadeToOrder ? '#946c10' : '#888', userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={isMadeToOrder}
          onChange={handleMtoToggle}
          disabled={isPending}
          style={{ cursor: 'pointer', width: '13px', height: '13px', accentColor: '#111' }}
        />
        <span>Made to Order</span>
      </label>
    </div>
  );
}
