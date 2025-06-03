// src/screens/AppointmentList.tsx
import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, Plus, Calendar as CalendarIcon, Clock, User, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useAppointment } from "../../hooks/useAppointment";
import { AppointmentStatus } from "../../helpers";
import { AppointmentStatusEnum } from "../../enums";
import { RoutesView } from "../../routes";

// Datos de prueba para citas (simulando respuesta de API)
const mockAppointments = [
  {
    id: 1,
    patientName: "Pedro Fernández",
    doctorName: "Dra. María López",
    date: "2025-06-26",
    time: "09:30",
    reason: "Consulta de seguimiento",
    status: AppointmentStatusEnum.CONFIRMADA,
  },
  {
    id: 2,
    patientName: "María González",
    doctorName: "Dr. Carlos Ruiz",
    date: "2025-06-26",
    time: "11:00",
    reason: "Examen anual",
    status: AppointmentStatusEnum.PENDIENTE,
  },
  {
    id: 3,
    patientName: "Juan Pérez",
    doctorName: "Dra. Ana Martínez",
    date: "2025-06-27",
    time: "14:30",
    reason: "Dolor abdominal",
    status: AppointmentStatusEnum.CANCELADA,
  },
  {
    id: 4,
    patientName: "Ana López",
    doctorName: "Dr. Javier Gómez",
    date: "2025-06-28",
    time: "10:15",
    reason: "Control postoperatorio",
    status: AppointmentStatusEnum.COMPLETADA,
  },
  {
    id: 5,
    patientName: "Carlos Ruiz",
    doctorName: "Dra. Laura Díaz",
    date: "2025-06-29",
    time: "16:45",
    reason: "Resultados de análisis",
    status: AppointmentStatusEnum.CONFIRMADA,
  },
];

const AppointmentCard = ({ appointment }: { appointment: typeof mockAppointments[0] }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/appointments/${appointment.id}`)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{appointment.reason}</h3>
          
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{appointment.patientName}</span>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Stethoscope className="w-4 h-4" />
            <span>{appointment.doctorName}</span>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{appointment.time}</span>
            </div>
          </div>
        </div>
        <AppointmentStatus status={appointment.status} />
      </div>
    </motion.div>
  );
};

export default function AppointmentList() {
  const navigate = useNavigate();
  // En una implementación real usarías el hook useAppointment
  // const { appointments = [], isLoading, error } = useAppointment();
  
  // Usando datos mock mientras se integra con backend
  const appointments = mockAppointments;
  const isLoading = false;
  const error = null;

  const handleCreateNewAppointment = () => {
    navigate(RoutesView.appointmentCreate);
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
            Gestión de Citas Médicas
          </h1>
        </div>

        <button
          onClick={handleCreateNewAppointment}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nueva Cita
        </button>
      </div>

      <p className="mb-6 text-gray-700">
        Administra todas las citas médicas programadas
      </p>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar citas por paciente, médico o motivo..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="">Todos los estados</option>
            <option value="confirmed">Confirmadas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
            <option value="canceled">Canceladas</option>
          </select>
          
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="">Todos los doctores</option>
            <option value="1">Dra. María López</option>
            <option value="2">Dr. Carlos Ruiz</option>
            <option value="3">Dra. Ana Martínez</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Lista de Citas Programadas
          </h2>
          <p className="text-sm text-gray-600">
            {appointments.length} citas encontradas
          </p>
        </div>

        {/* Lista de citas */}
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
            <CalendarIcon className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg font-semibold text-center">
              No hay citas programadas en este momento.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
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
          <AppointmentStatus status={AppointmentStatusEnum.CONFIRMADA} />
          <AppointmentStatus status={AppointmentStatusEnum.PENDIENTE} />
          <AppointmentStatus status={AppointmentStatusEnum.COMPLETADA} />
          <AppointmentStatus status={AppointmentStatusEnum.CANCELADA} />
        </div>
      </div>
    </motion.div>
  );
}