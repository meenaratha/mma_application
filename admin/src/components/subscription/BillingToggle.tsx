import { memo } from 'react';
import styles from './BillingToggle.module.css';

interface BillingToggleProps {
  billing: 'monthly' | 'yearly';
  onToggle: () => void;
  yearlyDiscount: number;
}

/**
 * BillingToggle — monthly/yearly billing cycle switcher.
 * Memoised: only re-renders when `billing` prop changes.
 * Uses a native <button role="switch"> for full accessibility.
 */
const BillingToggle = memo<BillingToggleProps>(({ billing, onToggle, yearlyDiscount }) => {
  const isYearly = billing === 'yearly';

  return (
    <div className={styles.wrapper} role="group" aria-label="Billing cycle">
      <span className={`${styles.label} ${!isYearly ? styles.labelActive : ''}`}>
        Monthly
      </span>

      <button
        role="switch"
        aria-checked={isYearly}
        aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} billing`}
        onClick={onToggle}
        className={`${styles.track} ${isYearly ? styles.trackOn : styles.trackOff}`}
      >
        <span className={`${styles.thumb} ${isYearly ? styles.thumbOn : ''}`} />
      </button>

      <span className={`${styles.label} ${isYearly ? styles.labelActive : ''}`}>
        Yearly
      </span>

      {yearlyDiscount > 0 && (
        <span className={styles.badge} aria-label={`Save ${yearlyDiscount}% with yearly billing`}>
          {yearlyDiscount}% OFF
        </span>
      )}
    </div>
  );
});

BillingToggle.displayName = 'BillingToggle';

export default BillingToggle;
