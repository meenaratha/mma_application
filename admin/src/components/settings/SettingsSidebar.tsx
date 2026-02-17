import { memo } from 'react';
import { User, Bell, Lock, Globe, CreditCard, HelpCircle } from 'lucide-react';
import styles from './SettingsSidebar.module.css';

export type SettingsTab = 'profile' | 'notifications' | 'security' | 'billing' | 'integrations' | 'help';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onSelect: (tab: SettingsTab) => void;
}

const ITEMS: { id: SettingsTab; label: string; icon: any }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

const SettingsSidebar = memo<SettingsSidebarProps>(({ activeTab, onSelect }) => {
  return (
    <aside className={styles.sidebar}>
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon className={styles.icon} />
            {item.label}
          </button>
        );
      })}
    </aside>
  );
});

SettingsSidebar.displayName = 'SettingsSidebar';

export default SettingsSidebar;