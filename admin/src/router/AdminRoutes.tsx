import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

export const AdminRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="post" element={<div>Admin Post Page</div>} />
      </Routes>
    </MainLayout>
  );
};
