import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { PostPage } from '../pages/post/PostPage';

export const UserRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="post" element={<PostPage />} />
      </Routes>
    </MainLayout>
  );
};
