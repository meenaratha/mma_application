import React, { useEffect } from 'react';
import { Header } from '../features/navigation';
import { useResponsive, useSidebar } from '../hooks';
import { Sidebar } from '../features/sidebar';
import backgroudCoin from '../assets/icon/backgroudcoin.png';
import coins from '../assets/icon/coins.png';
import cup from '../assets/icon/cup.png';
import message from '../assets/icon/messageicon.png';

interface SubscriptionLayoutProps {
  children: React.ReactNode;
}

export const SubscriptionLayout: React.FC<SubscriptionLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();
  const { isOpen, toggle, close } = useSidebar();
  const sidebarOpen = !isMobile || isOpen;

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
      className="relative flex h-full overflow-x-hidden"
      style={{
        background:
          'linear-gradient(120deg, #FFF8D9 0%, #F3FFFB 45%, #E9FFF5 100%)',
      }}
    >
      {/* Background visuals (subscription-style) */}
      <img
        src={backgroudCoin}
        alt=""
        className="pointer-events-none absolute -top-6 -right-4 hidden h-32 w-32 opacity-85 md:block"
        aria-hidden="true"
      />
      <img
        src={message}
        alt=""
        className="pointer-events-none absolute right-6 top-1/2 hidden h-24 w-24 -translate-y-1/2 opacity-85 md:block"
        aria-hidden="true"
      />
      <img
        src={cup}
        alt=""
        className="pointer-events-none absolute bottom-10 left-14 hidden h-24 w-24 opacity-90 md:block"
        aria-hidden="true"
      />
      <img
        src={coins}
        alt=""
        className="pointer-events-none absolute left-1/2 top-20 hidden h-20 w-20 -translate-x-1/2 opacity-60 md:block"
        aria-hidden="true"
      />

      <Sidebar isOpen={sidebarOpen} onClose={close} isMobile={isMobile} />

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
