import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ArrowLeft, PlusCircle } from "lucide-react";

const mockPatients = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "García",
    dateBirth: "1990-04-12",
  },
  {
    id: 2,
    firstName: "Carlos",
    lastName: "Mendoza",
    dateBirth: "1985-08-21",
  },
  {
    id: 3,
    firstName: "Lucía",
    lastName: "Pérez",
    dateBirth: "2000-01-09",
  },
];

export default function ListPatients() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Lista de Pacientes</h1>
        </div>
        <button
          onClick={() => navigate("/patients/create")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Nuevo Paciente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <User className="w-5 h-5" />
              <h2 className="text-lg font-semibold text-gray-700">
                {patient.firstName} {patient.lastName}
              </h2>
            </div>
            <p className="text-sm text-gray-600">
              Fecha de nacimiento:{" "}
              <span className="font-medium">{patient.dateBirth}</span>
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
