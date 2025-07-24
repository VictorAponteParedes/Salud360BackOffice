// src/screens/PatientList.tsx
import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, Plus, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PatientCard } from "./PatiendCard";
import { PatientStatus } from "../../helpers";
import { PatientStatusEnum } from "../../enums";
import { usePatient } from "../../hooks/usePatient";
import { RoutesView } from "../../routes/route";
import { translate } from "../../lang";
import { ErrorMessage } from "../../components/ErrorMessage";
import { useTheme } from "../../context/ThemeContext";

export default function PatientList() {
  const navigate = useNavigate();
  const { patients = [], isLoading, error } = usePatient();
  const { isDark } = useTheme();

  if (error) {
    return (
      <ErrorMessage error={error} onRetry={() => window.location.reload()} />
    );
  }

  const handleCreateNewPatient = () => {
    navigate(RoutesView.createPatient);
  };

  if (isLoading) {
    return (
      <div
        className={`max-w-6xl mx-auto p-8 flex justify-center items-center h-64 ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-6xl mx-auto p-8 rounded-xl shadow-lg space-y-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {translate("registerPatient.viewPatient.patientGestion")}
          </h1>
        </div>

        <button
          onClick={handleCreateNewPatient}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {translate("registerPatient.viewPatient.addPatient")}
        </button>
      </div>

      <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        {translate("registerPatient.viewPatient.adminPatient")}
      </p>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search
              className={`h-5 w-5 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
          </div>
          <input
            type="text"
            placeholder="Buscar pacientes por nombre, ID o email..."
            className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 ${
              isDark
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                : "bg-white border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
            } sm:text-sm`}
          />
        </div>

        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium ${
            isDark
              ? "border-gray-600 text-gray-300 hover:bg-gray-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-4 h-4" />
          {translate("registerPatient.viewPatient.filter.title")}
        </button>
      </div>

      <div
        className={`border-t pt-4 mb-4 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-lg font-semibold ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {translate("registerPatient.viewPatient.patientList")}
          </h2>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {patients.length}{" "}
            {translate("registerPatient.viewPatient.patiendRegisted")}
          </p>
        </div>

        {/* Lista de pacientes */}
        {patients.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-64 rounded-lg ${
              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-500"
            }`}
          >
            <UserX
              className={`w-12 h-12 mb-4 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <p
              className={`text-lg font-semibold text-center ${
                isDark ? "text-gray-200" : ""
              }`}
            >
              No hay pacientes registrados en este momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>

      {/* Posibles estados para referencia */}
      <div
        className={`mt-8 p-4 rounded-lg ${
          isDark ? "bg-gray-700" : "bg-gray-50"
        }`}
      >
        <h3
          className={`text-sm font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          } mb-2`}
        >
          {translate("registerPatient.viewPatient.stateAbaleble")}
        </h3>
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