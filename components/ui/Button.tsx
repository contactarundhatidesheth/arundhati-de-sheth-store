import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark-primary' | 'dark-secondary';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  style = {},
  icon,
  target,
  rel,
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 36px',
    fontSize: '0.75rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    fontWeight: '500',
    fontFamily: 'var(--font-sans)',
    textDecoration: 'none',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-dark)',
      boxShadow: 'var(--shadow-rose)',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-on-dark)',
      border: '1px solid var(--text-on-dark-subtle)',
    },
    'dark-primary': {
      background: 'var(--bg-primary)',
      color: 'var(--text-main)',
    },
    'dark-secondary': {
      background: 'transparent',
      color: 'var(--text-on-dark)',
      border: '1px solid var(--text-on-dark-subtle)',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant],
    ...style,
  };

  if (href) {
    return (
      <a href={href} style={combinedStyles} className={className} target={target} rel={rel}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={combinedStyles}
      className={className}
    >
      {icon}
      {children}
    </button>
  );
};
