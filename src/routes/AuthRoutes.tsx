// src/routes/authRoutes.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AuthLayout() {
  const { isAuthenticated } = useAuth();
  console.log("AuthLayout - isAuthenticated:", isAuthenticated);

  if (isAuthenticated) {
    console.log("Usuario autenticado, redirigiendo a dashboard...");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
