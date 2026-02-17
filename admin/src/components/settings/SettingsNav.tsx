import { memo } from 'react';

import styles from './SettingsNav.module.css';
import type { NavItem, SettingsSection } from '../../types';

interface SettingsNavProps {
  items: readonly NavItem[];
  activeSection: SettingsSection;
  onSelect: (id: SettingsSection) => void;
}

const ICON_MAP: Record<string, string> = {
  settings: '⚙', fitness_center: '🏋', person_add: '👤',
  group: '👥', fingerprint: '🔐', sports_gymnastics: '🤸',
  credit_card: '💳', notifications: '🔔', analytics: '📊',
  local_offer: '🏷', tune: '🎛', help_outline: '❓',
};

/**
 * SettingsNav — sidebar navigation list.
 * Memoised: only re-renders when activeSection changes.
 */
const SettingsNav = memo<SettingsNavProps>(({ items, activeSection, onSelect }) => (
  <nav className={styles.nav} aria-label="Settings sections">
    <div className={styles.title}>Management Settings</div>
    <ul className={styles.list} role="list">
      {items.map((item) => (
        <li key={item.id}>
          <button
            className={`${styles.item} ${activeSection === item.id ? styles.active : ''}`}
            onClick={() => onSelect(item.id)}
            aria-current={activeSection === item.id ? 'page' : undefined}
            aria-label={item.label}
          >
            <span className={styles.icon} aria-hidden="true">
              {ICON_MAP[item.icon] ?? '•'}
            </span>
            <span className={styles.label}>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </nav>
));

SettingsNav.displayName = 'SettingsNav';
export default SettingsNav;
