import React from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../../components/common';
import { Avatar } from '../../components/ui/Avatar';

interface HeaderProps {
  onMenuClick: () => void;
  isMobile: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobile }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-20">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          )}
          <Logo />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700">Admin User</span>
              <span className="text-xs text-gray-500">admin@example.com</span>
            </div>
            <Avatar
              size="md"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin User"
              fallback="AU"
            />
          </div>
        </div>
      </div>
    </header>
  );
};