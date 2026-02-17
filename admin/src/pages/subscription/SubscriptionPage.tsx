import { useCallback, memo } from 'react';
import { PLANS, YEARLY_DISCOUNT_PERCENT } from '../../data/plans';
import { useBilling } from '../../hooks/useBilling';
import { useSelectedPlan } from '../../hooks/useSelectedPlan';
import PageHeader from '../../components/subscription/PageHeader';
import BillingToggle from '../../components/subscription/BillingToggle';
import PricingGrid from '../../components/subscription/PricingGrid';
import styles from './SubscriptionPage.module.css';
/**
 * SubscriptionPage — root page component.
 *
 * State architecture:
 * ┌─────────────────────────────────────────────────────┐
 * │  SubscriptionPage                                    │
 * │  ├── billing (useBilling)  ─── BillingToggle        │
 * │  └── selectedPlan          ─── PricingGrid          │
 * │                                 └── PlanCard ×4     │
 * │                                      └── FeatureRow │
 * └─────────────────────────────────────────────────────┘
 *
 * Re-render isolation:
 * - PageHeader: never re-renders (no reactive props)
 * - BillingToggle: re-renders only when billing changes
 * - PricingGrid: re-renders only when billing or selectedPlan changes
 * - PlanCard: re-renders only when its own billing/isSelected props change
 * - FeatureRow: never re-renders (static feature data)
 */
const SubscriptionPage = memo(() => {
  const { billing, toggle: toggleBilling } = useBilling();
  const { selectedPlan, selectPlan } = useSelectedPlan();

  /** Stable reference — useCallback prevents PricingGrid from re-rendering */
  const handleCreateNew = useCallback(() => {
    alert('Create a new plan – hook this up to your router or modal!');
  }, []);

  return (
    <main className={styles.page}>
      {/* Background mesh gradient */}
      <div className={styles.bgMesh} aria-hidden="true" />

      <div className={styles.container}>
        {/* Hero header */}
        <PageHeader onCreateNew={handleCreateNew} />

        {/* Billing toggle */}
        <div className={styles.toggleRow}>
          <BillingToggle
            billing={billing}
            onToggle={toggleBilling}
            yearlyDiscount={YEARLY_DISCOUNT_PERCENT}
          />
        </div>

        {/* Pricing cards */}
        <PricingGrid
          plans={PLANS}
          billing={billing}
          selectedPlan={selectedPlan}
          onSelectPlan={selectPlan}
        />

        {/* Footer note */}
        <p className={styles.footerNote}>
          * Free custom domain included for the first year with annual billing.
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </main>
  );
});

SubscriptionPage.displayName = 'SubscriptionPage';

export default SubscriptionPage;
