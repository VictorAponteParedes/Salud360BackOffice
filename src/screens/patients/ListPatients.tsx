// src/screens/PatientList.tsx
import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { patients } from "../../mocks/patients";
import { PatientCard } from "./PatiendCard";
import { PatientStatus } from "../../helpers";
import { PatientStatusEnum } from "../../enums";

export default function PatientList() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Pacientes</h1>
      </div>

      <p className="mb-6 text-gray-700">Administra la información de todos los pacientes</p>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar pacientes por nombre, ID o email..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Lista de Pacientes</h2>
          <p className="text-sm text-gray-600">{patients.length} pacientes registrados</p>
        </div>

        {/* Lista de pacientes */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>

      {/* Posibles estados para referencia */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Estados disponibles:</h3>
        <div className="flex flex-wrap gap-2">
          <PatientStatus status={PatientStatusEnum.ACTIVO} />
          <PatientStatus status={PatientStatusEnum.CRITICO} />
          <PatientStatus status={PatientStatusEnum.SEGUIMIENTO} />
          <PatientStatus status={PatientStatusEnum.INACTIVO} />
          <PatientStatus status={PatientStatusEnum.PENDIENTE} />
        </div>
      </div>
    </motion.div>
  );
}