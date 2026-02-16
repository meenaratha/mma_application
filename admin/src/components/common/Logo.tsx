import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center shadow-lg">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C13.42 21 14.76 20.61 15.92 19.94L18.5 22.5L21 20L18.5 17.5C19.72 15.91 20.43 13.98 20.43 11.93C20.43 7.03 16.4 3 11.43 3H12ZM12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5Z"
            fill="white"
          />
        </svg>
      </div>
      <span className="text-xl font-bold text-gray-800">purplecow</span>
    </div>
  );
};