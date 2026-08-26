import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  center?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'var(--container-max)',
  padding = '0 24px',
  center = true,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        maxWidth,
        margin: center ? '0 auto' : '0',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
