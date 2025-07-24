import { motion } from "framer-motion";
import { Circle, User, UserIcon } from "lucide-react";
import { PatientStatus } from "../../helpers";
import type { PatientFormData } from "../../types/auth";
import { PatientStatusEnum } from "../../enums";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  patient: PatientFormData;
}

export const PatientCard = ({ patient }: Props) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const imageUrl = patient.profileImage?.path
    ? `${API_BASE_URL}/${patient.profileImage.path}`
    : "/default-profile.png";

  const goToDetails = () => {
    navigate(`/patients/${patient.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`p-4 rounded-lg shadow-sm mb-4 border ${
        isDark
          ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } transition-colors duration-200`}
    >
      <div className="flex items-start gap-4">
        {/* Icono de usuario */}
        {patient.profileImage?.path ? (
          <img
            src={imageUrl}
            alt={`Foto de ${patient.firstName} ${patient.lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDark ? "bg-gray-600" : "bg-gray-100"
            }`}
          >
            <UserIcon
              className={`w-5 h-5 ${
                isDark ? "text-gray-300" : "text-gray-400"
              }`}
            />
          </div>
        )}

        {/* Información del paciente en horizontal */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <h3
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              {patient.firstName} {patient.lastName}
            </h3>
            <PatientStatus
              status={patient.status ?? PatientStatusEnum.INACTIVO}
            />
          </div>

          <div className="space-y-1">
            <p
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Contacto
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {patient.phone}
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {patient.email}
            </p>
          </div>

          <div className="space-y-1">
            <p
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Fecha de nacimiento
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {patient.dateBirth}
            </p>
          </div>

          <div className="flex items-center justify-end">
            <button
              onClick={goToDetails}
              className={`text-sm font-medium rounded-md px-3 py-1 flex items-center gap-1 border ${
                isDark
                  ? "text-blue-400 hover:text-blue-300 border-blue-500 hover:border-blue-400"
                  : "text-blue-600 hover:text-blue-800 border-blue-200 hover:border-blue-300"
              } transition-colors`}
            >
              <Circle className="w-3 h-3" />
              Ver Detalle
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};