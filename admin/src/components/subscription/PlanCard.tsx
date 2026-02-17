import { memo, useCallback } from 'react';
import type { PlanCardProps } from '../../types';
import { getDisplayPrice } from '../../utils/pricing';
import FeatureRow from './FeatureRow';
import styles from './PlanCard.module.css';

/**
 * PlanCard — renders one pricing tier.
 *
 * Performance notes:
 * - Wrapped in memo(): only re-renders when billing cycle or isSelected changes.
 * - onSelect is useCallback'd at the parent so its reference is stable.
 * - Feature list items come from static data — FeatureRow never re-renders.
 * - No inline object creation inside JSX (styles defined in CSS Modules).
 */
const PlanCard = memo<PlanCardProps>(({ plan, billing, isSelected, onSelect }) => {
  const price = getDisplayPrice(plan, billing);

  const handleSelect = useCallback(() => {
    onSelect(plan.id);
  }, [onSelect, plan.id]);

  return (
    <article
      className={`
        ${styles.card}
        ${plan.isPopular ? styles.popular : ''}
        ${isSelected ? styles.selected : ''}
      `}
      aria-label={`${plan.name} plan, ${price} per month`}
    >
      {/* Popular badge */}
      {plan.isPopular && (
        <div className={styles.popularBadge} aria-label="Popular plan">
          Popular Plan
        </div>
      )}

      {/* Plan name */}
      <div className={styles.planHeader}>
        <h3 className={styles.planName}>{plan.name}</h3>
      </div>

      {/* Price */}
      <div className={styles.priceBlock}>
        <span className={styles.priceAmount}>{price}</span>
        <div className={styles.priceMeta}>
          <span className={styles.pricePer}>user / mo</span>
          {billing === 'yearly' && plan.monthlyPrice > 0 && (
            <span className={styles.priceOriginal}>${plan.monthlyPrice}</span>
          )}
        </div>
      </div>

      {/* User limit */}
      <p className={styles.userLimit}>
        <span className={styles.userCount}>{plan.userLimit}</span> User Active
      </p>

      {/* CTA Button */}
      <button
        className={`${styles.cta} ${isSelected ? styles.ctaSelected : ''}`}
        onClick={handleSelect}
        aria-pressed={isSelected}
        aria-label={`${isSelected ? 'Selected:' : 'Select'} ${plan.name} plan`}
      >
        {isSelected ? '✓ Selected' : plan.ctaLabel}
      </button>

      {/* Description */}
      <p className={styles.description}>{plan.description}</p>

      {/* Features divider */}
      <div className={styles.featuresDivider}>
        <span>All features options</span>
      </div>

      {/* Feature list */}
      <ul className={styles.featureList} aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <FeatureRow key={feature.label} feature={feature} />
        ))}
      </ul>
    </article>
  );
});

PlanCard.displayName = 'PlanCard';

export default PlanCard;
