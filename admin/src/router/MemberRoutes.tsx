import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const MemberRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="post" element={<div>Member Post Page</div>} />
      </Routes>
    </MainLayout>
  );
};
