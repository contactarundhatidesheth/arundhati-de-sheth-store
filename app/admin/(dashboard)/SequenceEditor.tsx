'use client';

import React, { useTransition } from 'react';
import { updateSequence } from '@/app/admin/actions';

export default function SequenceEditor({ collection, id, initialSequence }: { collection: string, id: string, initialSequence: number }) {
  const [isPending, startTransition] = useTransition();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newSeq = parseInt(e.target.value);
    if (!isNaN(newSeq) && newSeq !== initialSequence) {
      startTransition(() => {
        updateSequence(collection, id, newSeq);
      });
    }
  };

  return (
    <input 
      type="number"
      defaultValue={initialSequence}
      onBlur={handleBlur}
      disabled={isPending}
      style={{ 
        width: '60px', 
        padding: '8px', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        opacity: isPending ? 0.5 : 1
      }}
      title="Click outside to save"
    />
  );
}
