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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
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
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to={RoutesView.patients}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Users className="w-5 h-5" /> Pacientes
              </Link>
              <Link
                to={RoutesView.doctors}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <User className="w-5 h-5" /> Doctores
              </Link>
              <Link
                to={RoutesView.hospitals}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Hospital className="w-5 h-5" /> Hospitales
              </Link>
              <Link
                to={RoutesView.appointments}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" /> Citas
              </Link>
              <Link
                to={RoutesView.analysis}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
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
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Shield className="w-5 h-5" /> Usuarios y Roles
              </Link>
              <Link
                to={RoutesView.notifications}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Bell className="w-5 h-5" /> Notificaciones
              </Link>
              <Link
                to={RoutesView.reports}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <BarChart2 className="w-5 h-5" /> Reportes
              </Link>
              <Link
                to={RoutesView.settings}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Settings className="w-5 h-5" /> Configuración
              </Link>
            </nav>
          </div>
        </div>

        {/* Logout abajo */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-red-600 hover:bg-blue-50 hover:text-red-400 transition-all duration-200"
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
