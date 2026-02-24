import { useState, useCallback } from 'react';
import type { SettingsSection } from '../types';

interface UseActiveSectionReturn {
  activeSection: SettingsSection;
  setActiveSection: (section: SettingsSection) => void;
}

/**
 * Tracks the currently active settings section.
 * Isolated to prevent form re-renders on nav changes.
 */
export function useActiveSection(initial: SettingsSection = 'general'): UseActiveSectionReturn {
  const [activeSection, setActiveSectionState] = useState<SettingsSection>(initial);

  const setActiveSection = useCallback((section: SettingsSection) => {
    setActiveSectionState(section);
  }, []);

  return { activeSection, setActiveSection };
}
