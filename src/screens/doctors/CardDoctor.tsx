import { motion } from "framer-motion";
import { Languages, User, Star } from "lucide-react";
import useShowPerfilImagen from "../../hooks/useShowPerfilImge";
import { useNavigate } from "react-router-dom";
import type { DoctorFormData } from "../../types/doctors";

interface Props {
  doctor: DoctorFormData;
}

export const DoctorCard = ({ doctor }: Props) => {
  const navigate = useNavigate();
  const { profileImageUri, loadingImage } = useShowPerfilImagen(doctor.id);

  const goToDetails = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  const status = doctor.status || 'unavailable';

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    unavailable: 'bg-red-400 text-white',
    on_leave: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200 cursor-pointer"
      onClick={goToDetails}
    >
      <div className="flex items-start gap-4">
        {/* Imagen de perfil */}
        <div className="relative">
          {loadingImage ? (
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          ) : profileImageUri ? (
            <img
              src={profileImageUri}
              alt={`Foto de ${doctor.firstName} ${doctor.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
          )}
          {/* Indicador de estado */}
          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${statusColors[status]?.split(' ')[0]}`} />
        </div>

        {/* Información del doctor en columnas */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Columna 1: Nombre y estado */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800">
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
                {status === "available" ? "Disponible" :
                  status === "unavailable" ? "No disponible" : "En permiso"}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs text-gray-600">
                  {doctor.rating} ({doctor.reviews || 0})
                </span>
              </div>
            </div>
          </div>

          {/* Columna 2: Especialidades */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Especialidades</p>
            <div className="flex flex-wrap gap-1">
              {doctor.specialties.slice(0, 2).map((specialty) => (
                <span
                  key={specialty.id}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {specialty.name}
                </span>
              ))}
              {doctor.specialties.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  +{doctor.specialties.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Columna 3: Experiencia/Descripción */}
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Experiencia</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {doctor.experience || doctor.description || "No especificado"}
            </p>
          </div>

          {/* Columna 4: Acciones */}
          <div className="flex items-center justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToDetails();
              }}
              className="text-primary hover:text-primary-dark text-sm font-medium border border-primary rounded-md px-3 py-1 flex items-center gap-1"
            >
              <span>Ver Detalle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Idiomas (si existen) - Fila adicional */}
      {(doctor.languages || []).length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <Languages className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {(doctor.languages || []).map((lang) => (
              <span
                key={lang.id}
                className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
              >
                {lang.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};