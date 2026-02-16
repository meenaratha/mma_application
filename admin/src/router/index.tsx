import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from './AdminRoutes';
import { MemberRoutes } from './MemberRoutes';
import { UserRoutes } from './UserRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/member/*" element={<MemberRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />

      {/* default */}
      <Route path="*" element={<Navigate to="/user/post" />} />
    </Routes>
  );
};
