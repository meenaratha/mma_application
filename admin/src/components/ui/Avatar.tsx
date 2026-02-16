import React, { memo } from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_STYLES = {
  sm: { width: 32, height: 32, fontSize: 12 },
  md: { width: 40, height: 40, fontSize: 14 },
  lg: { width: 48, height: 48, fontSize: 16 },
} as const;

export const Avatar = memo(({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className,
}: AvatarProps) => (
  <MuiAvatar
    src={src}
    alt={alt}
    className={className}
    sx={{
      ...SIZE_STYLES[size],
      bgcolor: '#f3f4f6', // gray-100
      color: '#4b5563',   // gray-600
      border: '1px solid #e5e7eb', // gray-200
    }}
  >
    {fallback || alt?.charAt(0).toUpperCase()}
  </MuiAvatar>
));

Avatar.displayName = 'Avatar';