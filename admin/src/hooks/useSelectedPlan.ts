import { useState, useCallback } from 'react';
import type { PlanId } from '../types';

interface UseSelectedPlanReturn {
  selectedPlan: PlanId | null;
  selectPlan: (id: PlanId) => void;
  clearSelection: () => void;
}

/**
 * Tracks which pricing plan the user has selected.
 * Isolated so plan selection never triggers billing re-renders.
 */
export function useSelectedPlan(initial: PlanId | null = null): UseSelectedPlanReturn {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(initial);

  const selectPlan = useCallback((id: PlanId) => {
    setSelectedPlan(id);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPlan(null);
  }, []);

  return { selectedPlan, selectPlan, clearSelection };
}
