// src/routes/AppRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  console.log("AppRoutes - isAuthenticated:", isAuthenticated); // Debug

  if (!isAuthenticated) {
    console.log("No autenticado, redirigiendo a login...");
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}