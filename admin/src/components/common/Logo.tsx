import React from 'react';
import logoimg from '../../assets/logo.png';
import { LazyImage } from './LazyImage';
interface LogoProps {
  className?: string;
}

export const Logo = React.memo(({ className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className} w-[100%] h-[90px]`}>
      <LazyImage
        src={logoimg}
        alt="Logo"
        className="w-full h-full "
      />
    
    </div>
  );
});