import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { SubscriptionLayout } from '../layouts/SubscriptionLayout';
import GymMembersList from '../pages/member/Gymmemberslist';
import LiveChatPage from '../pages/chat/LiveChatPage';
import SubscriptionPage from '../pages/subscription/SubscriptionPage';
import SettingsPage from '../pages/settings/SettingsPage';
import { PostPage } from '../pages/post/PostPage';
import Dashboard from '../pages/dashboard/Dashboard';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route
        path="subscription-list"
        element={
          <SubscriptionLayout>
            <SubscriptionPage />
          </SubscriptionLayout>
        }
      />
      <Route
        path="/*"
        element={
          <MainLayout>
            <Routes>
              <Route path="post" element={<PostPage />} />
              <Route path="memberlist" element={<GymMembersList />} />
              <Route path="livechat" element={<LiveChatPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};
