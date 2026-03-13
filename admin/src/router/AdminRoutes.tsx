import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { SubscriptionLayout } from '../layouts/SubscriptionLayout';
import GymMembersList from '../pages/member/Gymmemberslist';
import LiveChatPage from '../pages/chat/LiveChatPage';
import SubscriptionPage from '../pages/subscription/SubscriptionPage';
import SettingsPage from '../pages/settings/SettingsPage';
import { PostPage } from '../pages/post/PostPage';
import Dashboard from '../pages/dashboard/Dashboard';
import CreatePostEventPage from '../pages/post/CreatePostEvent';
import CreatePlanPage from '../pages/subscription/CreatePlanPage';
import GymProfilePage from '../pages/profile/GymProfilePage';
import SettingsTabPage from '../pages/settings/SettingsTabPage';
import AddNewTrainerPage from '../pages/settings/AddNewTrainerPage';

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
              <Route path="create-post-event" element={<CreatePostEventPage />} />
              <Route path="memberlist" element={<GymMembersList />} />
              <Route path="livechat" element={<LiveChatPage />} />
              <Route path="settings" element={<SettingsTabPage />} />
              <Route path="create-subscription" element={<CreatePlanPage />} />
              <Route path="profile" element={<GymProfilePage />} />
              <Route path="add-trainer" element={<AddNewTrainerPage />} />
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};
