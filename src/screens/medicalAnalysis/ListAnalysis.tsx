// src/screens/AnalysisList.tsx
import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, Plus, FileText, Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useAnalysis } from "../../hooks/useAnalysis";
import { AnalysisStatus } from "../../helpers";
import { AnalysisStatusEnum } from "../../enums";

import { RoutesView } from "../../routes";

// Datos de prueba para análisis (simulando respuesta de API)
const mockAnalyses = [
  {
    id: 1,
    patientName: "Pedro Fernández",
    type: "Función renal",
    date: "2025-06-26",
    status: AnalysisStatusEnum.COMPLETADO,
    resultSummary: "Resultados dentro de parámetros normales"
  },
  {
    id: 2,
    patientName: "María González",
    type: "Hemograma completo",
    date: "2025-06-25",
    status: AnalysisStatusEnum.PENDIENTE,
    resultSummary: "Esperando resultados de laboratorio"
  },
  {
    id: 3,
    patientName: "Juan Pérez",
    type: "Perfil lipídico",
    date: "2025-06-24",
    status: AnalysisStatusEnum.COMPLETADO,
    resultSummary: "Colesterol LDL elevado"
  },
  {
    id: 4,
    patientName: "Ana López",
    type: "Pruebas hepáticas",
    date: "2025-06-23",
    status: AnalysisStatusEnum.ANORMAL,
    resultSummary: "Enzimas hepáticas elevadas"
  },
  {
    id: 5,
    patientName: "Carlos Ruiz",
    type: "Glucosa en sangre",
    date: "2025-06-22",
    status: AnalysisStatusEnum.COMPLETADO,
    resultSummary: "Niveles de glucosa normales"
  },
];

const AnalysisCard = ({ analysis }: { analysis: typeof mockAnalyses[0] }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    //   onClick={() => navigate(`/analysis/${analysis.id}`)}
    onClick={() => navigate(`${RoutesView.analysis}`)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{analysis.type}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{analysis.patientName}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(analysis.date).toLocaleDateString()}</span>
          </div>
        </div>
        <AnalysisStatus status={analysis.status} />
      </div>
      <p className="mt-3 text-gray-700">{analysis.resultSummary}</p>
    </motion.div>
  );
};

export default function AnalysisList() {
  const navigate = useNavigate();
  // En una implementación real usarías el hook useAnalysis
  // const { analyses = [], isLoading, error } = useAnalysis();
  
  // Usando datos mock mientras se integra con backend
  const analyses = mockAnalyses;
  const isLoading = false;
  const error = null;

  const handleCreateNewAnalysis = () => {
    navigate("/analysis/create");
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
    >
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
            Gestión de Análisis Médicos
          </h1>
        </div>

        <button
          onClick={handleCreateNewAnalysis}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nuevo Análisis
        </button>
      </div>

      <p className="mb-6 text-gray-700">
        Administra todos los análisis médicos realizados
      </p>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar análisis por paciente, tipo o fecha..."
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
          <h2 className="text-lg font-semibold text-gray-800">
            Lista de Análisis
          </h2>
          <p className="text-sm text-gray-600">
            {analyses.length} análisis registrados
          </p>
        </div>

        {/* Lista de análisis */}
        {analyses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg font-semibold text-center">
              No hay análisis registrados en este momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <AnalysisCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        )}
      </div>

      {/* Posibles estados para referencia */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Estados disponibles:
        </h3>
        <div className="flex flex-wrap gap-2">
          <AnalysisStatus status={AnalysisStatusEnum.COMPLETADO} />
          <AnalysisStatus status={AnalysisStatusEnum.PENDIENTE} />
          <AnalysisStatus status={AnalysisStatusEnum.ANORMAL} />
          <AnalysisStatus status={AnalysisStatusEnum.CRITICO} />
        </div>
      </div>
    </motion.div>
  );
}