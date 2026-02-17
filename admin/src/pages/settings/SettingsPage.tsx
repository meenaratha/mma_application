import { useState, memo } from 'react';
import { Settings } from 'lucide-react';
import SettingsNav from '../../components/settings/SettingsNav';
import GeneralSettingsForm from '../../components/settings/GeneralSettingsForm';
import { NAV_ITEMS } from '../../data/settings';
import type { SettingsSection } from '../../types';
import styles from './SettingsPage.module.css';

const SettingsPage = memo(() => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettingsForm />;
      default:
        return (
          <div className={styles.placeholder}>
            <Settings className={styles.placeholderIcon} />
            <p>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</p>
          </div>
        );
    }
  };

  const getTitle = () => {
    const item = NAV_ITEMS.find((i) => i.id === activeSection);
    return item ? item.label : 'Settings';
  };

  return (
    <div className={styles.page}>
      <SettingsNav items={NAV_ITEMS} activeSection={activeSection} onSelect={setActiveSection} />
      
      <main className={styles.content}>
        <header className={styles.contentHeader}>
          <h2 className={styles.contentTitle}>{getTitle()}</h2>
        </header>
        
        <div className={styles.panel}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
});

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;