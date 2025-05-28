// src/layouts/DashboardLayout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Salud360</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="hover:bg-blue-700 rounded px-3 py-2">
              Inicio
            </Link>
            <Link
              to="/patients"
              className="hover:bg-blue-700 rounded px-3 py-2"
            >
              Pacientes
            </Link>
            <Link to="/doctors" className="hover:bg-blue-700 rounded px-3 py-2">
              Doctores
            </Link>
            {/* Más links si lo deseas */}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => console.log("Logout")}
          className="mt-4 flex items-center gap-2 hover:bg-blue-700 rounded px-3 py-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </aside>

      {/* Main content (scrollable) */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
