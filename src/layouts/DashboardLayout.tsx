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
  Languages,
  Stethoscope,
  ChevronDown,
} from "lucide-react";
import { RoutesView } from "../routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCatalogsOpen, setIsCatalogsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const toggleCatalogs = () => {
    setIsCatalogsOpen((prev) => !prev);
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
                to={RoutesView.appointmentList}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" /> Citas
              </Link>
              <Link
                to={RoutesView.analysisList}
                className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <FileText className="w-5 h-5" /> Análisis Clínicos
              </Link>
            </nav>
          </div>

          {/* Sección: Catálogos */}
          <div className="mt-8">
            <h3 className="text-xs text-gray-500 uppercase mb-3">Catálogos</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={toggleCatalogs}
                className="flex items-center justify-between text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" /> Catálogos
                </div>
                <motion.div
                  animate={{ rotate: isCatalogsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isCatalogsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex flex-col gap-2 pl-6"
                  >
                    <Link
                      to={RoutesView.languages}
                      className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      <Languages className="w-5 h-5" /> Idiomas
                    </Link>
                    <Link
                      to={RoutesView.specialties}
                      className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      <Stethoscope className="w-5 h-5" /> Especialidades
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
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
                to="#"
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
