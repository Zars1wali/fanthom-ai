import React from 'react';
import './ui.css';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cue' | 'hl' | 'live' | 'ok';
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  icon,
  className = '',
  ...props
}) => {
  const variantClass = variant !== 'default' ? `chip-${variant}` : '';
  return (
    <span className={`chip ${variantClass} ${className}`.trim()} {...props}>
      {icon && <span className="chip-icon">{icon}</span>}
      {children}
    </span>
  );
};

export const Kbd: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className = '',
  style,
}) => {
  return <kbd className={`kbd ${className}`.trim()} style={style}>{children}</kbd>;
};

export const Skeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ width, height, className = '', style }) => {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
    />
  );
};
