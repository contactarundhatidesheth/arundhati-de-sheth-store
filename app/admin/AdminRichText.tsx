'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface AdminRichTextProps {
  defaultValue?: string;
  name: string;
  placeholder?: string;
}

export default function AdminRichText({ defaultValue = '', name, placeholder }: AdminRichTextProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div style={{ background: '#fff', color: '#000' }}>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue}
        placeholder={placeholder}
        style={{ minHeight: '150px', paddingBottom: '40px' }}
      />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
