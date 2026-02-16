import React, { useEffect } from 'react';
import { useResponsive, useSidebar } from '../hooks';
import { Sidebar } from '../features/sidebar';
import { Header } from '../features/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();
  const { isOpen, toggle, close } = useSidebar();

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - always visible on desktop, toggle on mobile */}
      <Sidebar isOpen={isOpen} onClose={close} isMobile={isMobile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
      {/* Header - Only show on mobile */}
        {isMobile && <Header onMenuClick={toggle} isMobile={isMobile} />}

        <main className="flex-1 px-6 py-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};