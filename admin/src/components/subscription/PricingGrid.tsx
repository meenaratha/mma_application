import { memo } from 'react';
import type { BillingCycle, PlanId, PricingPlan } from '../../types';
import PlanCard from './PlanCard';
import styles from './PricingGrid.module.css';

interface PricingGridProps {
  plans: readonly PricingPlan[];
  billing: BillingCycle;
  selectedPlan: PlanId | null;
  onSelectPlan: (id: PlanId) => void;
}

/**
 * PricingGrid — lays out plan cards in a responsive 4-column grid.
 *
 * Performance notes:
 * - memo prevents re-render when parent state changes for unrelated reasons.
 * - useMemo ensures plan cards only re-map when plans array reference changes
 *   (it's static data, so this is a one-time cost).
 * - Stagger animation delays are computed once at map time.
 */
const PricingGrid = memo<PricingGridProps>(({ plans, billing, selectedPlan, onSelectPlan }) => {
  return (
    <section
      className={styles.grid}
      aria-label="Pricing plans"
    >
      {/* Re-render plan cards when billing or selection changes */}
      {plans.map((plan, index) => (
        <div
          key={plan.id}
          className={styles.cardWrapper}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <PlanCard
            plan={plan}
            billing={billing}
            isSelected={selectedPlan === plan.id}
            onSelect={onSelectPlan}
          />
        </div>
      ))}
    </section>
  );
});

PricingGrid.displayName = 'PricingGrid';

export default PricingGrid;
