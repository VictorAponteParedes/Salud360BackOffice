// src/routes/AppRoutes.tsx
import { Outlet, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';

export default function AppRoutes() {
    const isAuthenticated = true

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    );
}
