import { motion } from "framer-motion";
import { Search, ArrowLeft, Plus, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DoctorCard } from "./CardDoctor";
import { useState } from "react";
import { RoutesView } from "../../routes";
import { useDoctor } from "../../hooks/useDoctor";


export default function DoctorList() {
  const { doctors = [], error, isLoading } = useDoctor();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  // const filteredDoctors = (doctors ?? []).filter((doc) => {
  //   const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
  //   const matchesSpecialty =
  //     specialtyFilter === "all" || doc.specialties.includes(specialtyFilter);
  //   return matchesStatus && matchesSpecialty;
  // });

  const handleCreateNewDoctor = () => {
    navigate(RoutesView.createDoctor);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <span className="text-red-700">×</span>
          </button>
        </div>
      </div>
    );
  }

  // const uniqueSpecialties = Array.from(
  //   new Set(doctors.flatMap((d) => d.specialties))
  // );

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Doctores
          </h1>
        </div>

        <button
          onClick={handleCreateNewDoctor}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-5 h-5" />
          Crear Nuevo Doctor
        </button>
      </div>

      <p className="mb-6 text-gray-700">
        Administra la información de todos los doctores
      </p>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar doctores por nombre, especialidad o estado..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Filtro por estado */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">Todos los estados</option>
          <option value="available">Disponible</option>
          <option value="unavailable">No disponible</option>
          <option value="on_leave">En permiso</option>
        </select>

        {/* Filtro por especialidad */}
        {/* <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">Todas las especialidades</option>
          {uniqueSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select> */}
      </div>

      {/* Lista */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Lista de Doctores
          </h2>
          <p className="text-sm text-gray-600">
            {doctors.length} doctores encontrados
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-600 py-12">
            <UserX className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-lg font-semibold">
              No hay doctores registrados en este momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}
