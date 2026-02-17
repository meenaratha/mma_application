import { memo } from 'react';
import type { FeatureRowProps } from '../../types';
import styles from './FeatureRow.module.css';

const CheckIcon = () => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    aria-hidden="true" className={styles.iconCheck}
  >
    <circle cx="8" cy="8" r="8" fill="#7C3AED" fillOpacity="0.12" />
    <path
      d="M4.5 8.5L6.5 10.5L11.5 5.5"
      stroke="#7C3AED" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none"
    aria-hidden="true" className={styles.iconCross}
  >
    <circle cx="8" cy="8" r="8" fill="#F3F4F6" />
    <path
      d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5"
      stroke="#D1D5DB" strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * FeatureRow — renders a single feature with its inclusion status.
 * Memoised: only re-renders if `feature` reference changes.
 * Since features come from static data, this effectively never re-renders.
 */
const FeatureRow = memo<FeatureRowProps>(({ feature }) => {
  const isIncluded = feature.status === 'included';

  return (
    <li
      className={`${styles.row} ${isIncluded ? styles.included : styles.excluded}`}
      aria-label={`${feature.label}: ${isIncluded ? 'included' : 'not included'}`}
    >
      {isIncluded ? <CheckIcon /> : <CrossIcon />}
      <span className={styles.label}>{feature.label}</span>
    </li>
  );
});

FeatureRow.displayName = 'FeatureRow';

export default FeatureRow;
