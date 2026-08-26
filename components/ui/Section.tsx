import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  background?: 'primary' | 'secondary' | 'surface' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  borderBottom?: boolean;
  borderTop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

const backgrounds: Record<string, string> = {
  primary: 'var(--bg-primary)',
  secondary: 'var(--bg-secondary)',
  surface: 'var(--bg-surface)',
  dark: '#1A1A1A',
};

const paddings: Record<string, string> = {
  none: '0',
  sm: '48px 24px',
  md: '80px 24px',
  lg: 'var(--section-padding)',
};

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'primary',
  padding = 'lg',
  borderBottom = false,
  borderTop = false,
  className = '',
  style = {},
  id,
}) => {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: 'relative',
        background: backgrounds[background],
        padding: paddings[padding],
        borderTop: borderTop ? '1px solid var(--border)' : 'none',
        borderBottom: borderBottom ? '1px solid var(--border)' : 'none',
        ...(background === 'dark' && { color: '#FAF9F7' }),
        ...style,
      }}
    >
      {children}
    </section>
  );
};
