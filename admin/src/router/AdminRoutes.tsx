import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import GymMembersList from '../pages/member/Gymmemberslist';
import LiveChatPage from '../pages/chat/LiveChatPage';
import SubscriptionPage from '../pages/subscription/SubscriptionPage';
import SettingsPage from '../pages/settings/SettingsPage';

export const AdminRoutes = () => {
  return (
    <MainLayout>
      <Routes>
         
          <Route path="memberlist" element={<GymMembersList />} />
          <Route path="livechat" element={<LiveChatPage />} />
              <Route path="subscription-list" element={<SubscriptionPage />} />
              <Route path="settings" element={<SettingsPage/>} />
      </Routes>
    </MainLayout>
  );
};
