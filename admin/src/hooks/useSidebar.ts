import { useState, useCallback, useEffect } from 'react';
import { useResponsive } from './useResponsive';

interface UseSidebarReturn {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useSidebar = (): UseSidebarReturn => {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    toggle,
    close,
    open,
  };
};