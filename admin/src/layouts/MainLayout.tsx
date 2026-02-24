import React, { useEffect } from 'react';
import { useResponsive, useSidebar } from '../hooks';
import { Sidebar } from '../features/sidebar';
import { Header } from '../features/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isMobile } = useResponsive();
  const { isOpen, toggle, close } = useSidebar();

  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

  return (
    <div
      className="flex h-full "
      style={{
        background:
          'radial-gradient(82.71% 82.71% at 50% 50%, #EDFFFC 0%, #FDFFFE 100%)',
      }}
    >

      {/* Sidebar - always visible on desktop, toggle on mobile */}
      <Sidebar isOpen={isOpen} onClose={close} isMobile={isMobile} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 py-4 px-2">
        {/* Header - Only show on mobile */}
        {isMobile && <Header onMenuClick={toggle} isMobile={isMobile} />}

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
