import React from 'react';
import { Home, PlusCircle, FileText, MessageSquare, CreditCard, Settings, User } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
  { id: 'create', icon: <PlusCircle className="w-5 h-5" />, label: 'Create', isActive: true },
  { id: 'posts', icon: <FileText className="w-5 h-5" />, label: 'Posts' },
  { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
  { id: 'payments', icon: <CreditCard className="w-5 h-5" />, label: 'Payments' },
];

const bottomNavItems: NavItem[] = [
  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
  if (!isOpen && isMobile) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out flex flex-col py-6
          ${isMobile ? 'w-64' : 'w-50 items-center'}
          ${!isOpen && isMobile ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        {/* Top Navigation Items */}
        <div className={`flex flex-col gap-3 flex-1 ${isMobile ? 'px-4' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`
                flex items-center gap-3 transition-all rounded-lg
                ${isMobile 
                  ? 'w-full px-4 py-3 justify-start' 
                  : 'w-12 h-12 justify-center'
                }
                ${
                  item.isActive
                    ? 'bg-brand-purple text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              {isMobile && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Bottom Navigation Items */}
        <div className={`flex flex-col gap-3 ${isMobile ? 'px-4' : ''}`}>
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              className={`
                flex items-center gap-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all rounded-lg
                ${isMobile 
                  ? 'w-full px-4 py-3 justify-start' 
                  : 'w-12 h-12 justify-center'
                }
              `}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              {isMobile && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};