// src/layouts/DashboardLayout.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-4 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Salud360</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:bg-blue-700 rounded px-3 py-2">
            Inicio
          </Link>
          <Link to="/patients" className="hover:bg-blue-700 rounded px-3 py-2">
            Pacientes
          </Link>
          <Link to="/doctors" className="hover:bg-blue-700 rounded px-3 py-2">
            Doctores
          </Link>
          {/* Agrega más links según tu necesidad */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
