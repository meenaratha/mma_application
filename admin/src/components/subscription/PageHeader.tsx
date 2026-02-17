import { memo } from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  onCreateNew: () => void;
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * PageHeader — static hero section.
 * Memoised to prevent any re-render; it has no dynamic props.
 */
const PageHeader = memo<PageHeaderProps>(({ onCreateNew }) => (
  <header className={styles.header}>
    {/* Decorative blobs */}
    <div className={styles.blobTopRight} aria-hidden="true" />
    <div className={styles.blobBottomLeft} aria-hidden="true" />

    {/* Floating 3D shapes */}
    <div className={styles.shapeOrange}  aria-hidden="true" />
    <div className={styles.shapeBlue}    aria-hidden="true" />
    <div className={styles.shapePurple}  aria-hidden="true" />

    {/* Create New Plan button — top right */}
    <div className={styles.topBar}>
      <button
        className={styles.createBtn}
        onClick={onCreateNew}
        aria-label="Create a new plan"
      >
        <PlusIcon />
        Create A New Plan
      </button>
    </div>

    {/* Hero text */}
    <div className={styles.heroText}>
      <h1 className={styles.title}>
        Set up your site,<br className={styles.titleBreak} /> pick a plan later
      </h1>
      <p className={styles.subtitle}>
        Choose the plan that's right for your business. Whether you're just getting started with email
        marketing or well down the path to personalization, we're got you covered
      </p>
    </div>
  </header>
));

PageHeader.displayName = 'PageHeader';

export default PageHeader;
