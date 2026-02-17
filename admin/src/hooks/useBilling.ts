import { useState, useCallback } from 'react';
import type { BillingCycle } from '../types';

interface UseBillingReturn {
  billing: BillingCycle;
  isYearly: boolean;
  toggle: () => void;
}

/**
 * Encapsulates billing-cycle toggle state.
 * Memoised toggle prevents unnecessary child re-renders.
 */
export function useBilling(initial: BillingCycle = 'monthly'): UseBillingReturn {
  const [billing, setBilling] = useState<BillingCycle>(initial);

  const toggle = useCallback(() => {
    setBilling((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
  }, []);

  return { billing, isYearly: billing === 'yearly', toggle };
}
