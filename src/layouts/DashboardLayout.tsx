// src/layouts/DashboardLayout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  Hospital,
  Calendar,
  FileText,
  Shield,
  Bell,
  BarChart2,
  Settings,
  HeartPulse,
  LogOut,
} from "lucide-react";
import { RoutesView } from "../routes";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const handleLogout = () => {
    console.log("Logout clickeado");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary p-6 shadow-sm sticky top-0 h-screen flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HeartPulse className="text-blue-600 w-6 h-6" />
              <span className="text-xl font-bold">Salud360</span>
            </div>
            <p className="text-sm text-gray-500">Sistema Médico</p>
          </div>

          {/* Sección: Gestión Principal */}
          <div className="mt-8">
            <h3 className="text-xs text-gray-500 uppercase mb-3">
              Gestión principal
            </h3>
            <nav className="flex flex-col gap-4">
              <Link
                to={RoutesView.dashboard}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to={RoutesView.patients}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Users className="w-5 h-5" /> Pacientes
              </Link>
              <Link
                to={RoutesView.doctors}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <User className="w-5 h-5" /> Doctores
              </Link>
              <Link
                to={RoutesView.hospitals}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Hospital className="w-5 h-5" /> Hospitales
              </Link>
              <Link
                to={RoutesView.appointments}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Calendar className="w-5 h-5" /> Citas
              </Link>
              <Link
                to={RoutesView.analysis}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <FileText className="w-5 h-5" /> Análisis Clínicos
              </Link>
            </nav>
          </div>

          {/* Sección: Sistema */}
          <div className="mt-8">
            <h3 className="text-xs text-gray-500 uppercase mb-3">Sistema</h3>
            <nav className="flex flex-col gap-4">
              <Link
                to={RoutesView.usersRoles}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Shield className="w-5 h-5" /> Usuarios y Roles
              </Link>
              <Link
                to={RoutesView.notifications}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Bell className="w-5 h-5" /> Notificaciones
              </Link>
              <Link
                to={RoutesView.reports}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <BarChart2 className="w-5 h-5" /> Reportes
              </Link>
              <Link
                to={RoutesView.settings}
                className="flex items-center gap-2 text-white hover:text-blue-600"
              >
                <Settings className="w-5 h-5" /> Configuración
              </Link>
            </nav>
          </div>
        </div>

        {/* Logout abajo */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
