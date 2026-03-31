import { Routes, Route } from 'react-router-dom';
import Login from '../features/auth/Login';
import Dashboard from '../features/dashboard/Dashboard';
import Users from '../features/users/Users';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}