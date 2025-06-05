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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { RoutesView } from "../routes/route";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translate } from "../lang";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCatalogsOpen, setIsCatalogsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(RoutesView.login);
  };

  const toggleCatalogs = () => {
    setIsCatalogsOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-20" : "w-64"
        } bg-primary p-6 shadow-sm sticky top-0 h-screen flex flex-col justify-between transition-all duration-300`}
      >
        {/* Botón de toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {!isSidebarCollapsed ? (
          <div>
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HeartPulse className="text-blue-600 w-6 h-6" />
                <span className="text-xl font-bold">
                  {translate("layout.titleName")}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {translate("layout.items.sistemMedics")}
              </p>
            </div>

            {/* Sección: Gestión Principal */}
            <div className="mt-8">
              <h3 className="text-xs text-gray-500 uppercase mb-3">
                {translate("layout.title")}
              </h3>
              <nav className="flex flex-col gap-4">
                <Link
                  to={RoutesView.dashboard}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <LayoutDashboard className="w-5 h-5" />{" "}
                  {translate("layout.items.dashboard")}
                </Link>
                <Link
                  to={RoutesView.patients}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Users className="w-5 h-5" />{" "}
                  {translate("layout.items.patients")}
                </Link>
                <Link
                  to={RoutesView.doctors}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  {translate("layout.items.doctors")}
                </Link>
                <Link
                  to={RoutesView.hospitals}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Hospital className="w-5 h-5" />{" "}
                  {translate("layout.items.hospitals")}
                </Link>
                <Link
                  to={RoutesView.appointmentList}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Calendar className="w-5 h-5" />{" "}
                  {translate("layout.items.appointments")}
                </Link>
                <Link
                  to={RoutesView.analysisList}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <FileText className="w-5 h-5" />{" "}
                  {translate("layout.items.analytics")}
                </Link>
              </nav>
            </div>

            {/* Sección: Catálogos */}
            <div className="mt-8">
              <h3 className="text-xs text-gray-500 uppercase mb-3">
                {translate("layout.items.catalogs.title")}
              </h3>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={toggleCatalogs}
                  className="flex items-center justify-between text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />{" "}
                    {translate("layout.items.catalogs.title")}
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
                        <Languages className="w-5 h-5" />{" "}
                        {translate("layout.items.catalogs.languages")}
                      </Link>
                      <Link
                        to={RoutesView.specialties}
                        className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                      >
                        <Stethoscope className="w-5 h-5" />{" "}
                        {translate("layout.items.catalogs.specialties")}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </nav>
            </div>

            {/* Sección: Sistema */}
            <div className="mt-8">
              <h3 className="text-xs text-gray-500 uppercase mb-3">
                {translate("layout.items.sistems")}
              </h3>
              <nav className="flex flex-col gap-4">
                <Link
                  to={RoutesView.usersRoles}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Shield className="w-5 h-5" />{" "}
                  {translate("layout.items.userAndRoles")}
                </Link>
                <Link
                  to={RoutesView.notifications}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Bell className="w-5 h-5" />{" "}
                  {translate("layout.items.notifications")}
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <BarChart2 className="w-5 h-5" />{" "}
                  {translate("layout.items.reports")}
                </Link>
                <Link
                  to={RoutesView.settings}
                  className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  <Settings className="w-5 h-5" />{" "}
                  {translate("layout.items.settings")}
                </Link>
              </nav>
            </div>

            {/* Logout abajo */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white px-3 py-2 rounded-md border-l-4 border-transparent hover:border-red-600 hover:bg-blue-50 hover:text-red-400 transition-all duration-200 mt-8"
            >
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between h-full">
            {/* Logo colapsado */}
            <div className="flex flex-col items-center gap-8">
              <HeartPulse className="text-blue-600 w-6 h-6" />

              {/* Iconos principales colapsados */}
              <nav className="flex flex-col items-center gap-6">
                <Link
                  to={RoutesView.dashboard}
                  className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  title={translate("layout.items.dashboard")}
                >
                  <LayoutDashboard className="w-5 h-5" />
                </Link>
                <Link
                  to={RoutesView.patients}
                  className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  title={translate("layout.items.patients")}
                >
                  <Users className="w-5 h-5" />
                </Link>
                <Link
                  to={RoutesView.doctors}
                  className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  title={translate("layout.items.doctors")}
                >
                  <User className="w-5 h-5" />
                </Link>
                <Link
                  to={RoutesView.hospitals}
                  className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  title={translate("items.hospitals")}
                >
                  <Hospital className="w-5 h-5" />
                </Link>
                <Link
                  to={RoutesView.appointmentList}
                  className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  title={translate("layout.items.appointments")}
                >
                  <Calendar className="w-5 h-5" />
                </Link>
              </nav>
            </div>

            {/* Iconos inferiores colapsados */}
            <div className="flex flex-col items-center gap-6">
              <Link
                to={RoutesView.settings}
                className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                title={translate("layout.items.settings")}
              >
                <Settings className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-white p-2 rounded-md hover:bg-blue-50 hover:text-red-400 transition-all"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 bg-gray-100 p-6 overflow-y-auto ${
          isSidebarCollapsed ? "ml-1" : "ml-1"
        } transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  );
}