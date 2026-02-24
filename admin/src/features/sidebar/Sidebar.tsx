import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlusCircle, FileText, MessageSquare, CreditCard, Settings, User } from 'lucide-react';
import { Logo } from '../../components/common';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home', path: '/admin' },
  { id: 'create', icon: <PlusCircle className="w-5 h-5" />, label: 'Create', path: '/admin/memberlist' },
  { id: 'posts', icon: <FileText className="w-5 h-5" />, label: 'Posts', path: '/admin/post' },
  { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', path: '/admin/livechat' },
  { id: 'payments', icon: <CreditCard className="w-5 h-5" />, label: 'Payments', path: '/admin/subscription-list' },
];

const bottomNavItems: NavItem[] = [
  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
  { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile', path: '/profile' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          fixed lg:sticky top-0 left-0 h-screen  z-50
          transition-all duration-300 ease-in-out flex flex-col py-6
          ${isMobile ? 'w-64 bg-white' : 'w-40 items-center'}
          ${!isOpen && isMobile ? '-translate-x-full' : 'translate-x-0'}
        `}
      >

<Logo/>



        {/* Top Navigation Items */}
        <div className={`flex flex-col gap-3 flex-1 ${isMobile ? 'px-4' : ''}`}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                if (isMobile) onClose();
              }}
              className={`
              cursor-pointer   flex items-center gap-3 transition-all rounded-full shadow-md
                ${isMobile 
                  ? 'w-full px-4 py-3 justify-start' 
                  : 'w-12 h-12 justify-center'
                }
                ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-900 hover:bg-primary hover:text-white'
                }
              `}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              {isMobile && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          )})}
        </div>

        {/* Bottom Navigation Items */}
        <div className={`flex flex-col gap-3 ${isMobile ? 'px-4' : 'md:mt-2'}`}>
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                if (isMobile) onClose();
              }}
              className={`
               cursor-pointer flex items-center gap-3 bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all rounded-full shadow-md
                ${isMobile 
                  ? ' w-full px-4 py-3 justify-start' 
                  : 'w-12 h-12 justify-center'
                } ${
                  isActive
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-900 hover:bg-primary hover:text-white'
                }
              `}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
              {isMobile && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          )})}
        </div>
      </aside>
    </>
  );
};
