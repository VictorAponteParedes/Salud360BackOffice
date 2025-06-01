import type { DoctorFormData } from "../../types/doctors";
import { Languages, User } from "lucide-react";
import useShowPerfilImagen from "../../hooks/useShowPerfilImge";
import { useNavigate } from "react-router-dom";

interface Props {
  doctor: DoctorFormData;
}

export const DoctorCard = ({ doctor }: Props) => {
  const navigate = useNavigate();
  const { profileImageUri, loadingImage } = useShowPerfilImagen(doctor.id);

  const goToDetails = () => {
    navigate(`/doctors/${doctor.id}`);
  };

  // Versión corregida
  const ratingNumber = Math.min(5, Math.max(0, Math.round(Number(doctor.rating) || 0)));
  const status = doctor.status || 'unavailable';

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      onClick={goToDetails}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Imagen de perfil */}
        <div className="relative">
          {loadingImage ? (
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
          ) : profileImageUri ? (
            <img
              src={profileImageUri}
              alt={`Foto de ${doctor.firstName} ${doctor.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}

          {/* Indicador de estado */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${status === 'available' ? 'bg-green-500' :
            status === 'unavailable' ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
        </div>

        {/* Información del doctor */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">
            Dr. {doctor.firstName} {doctor.lastName}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-1">
            {doctor.experience || doctor.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            {"★".repeat(ratingNumber)}
            {"☆".repeat(5 - ratingNumber)}
            <span className="text-gray-600 ml-1">
              ({doctor.reviews || 0} reseñas)
            </span>
          </div>

          {/* Idiomas */}
          {(doctor.languages || []).length > 0 && (
            <div className="flex gap-2 mt-2 items-center flex-wrap">
              <Languages className="w-4 h-4 text-gray-500 flex-shrink-0" />
              {(doctor.languages || []).map((lang) => (
                <span
                  key={lang.id}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                >
                  {lang.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Estado y botón */}
      <div className="flex flex-col items-end gap-2 ml-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'available' ? 'bg-green-100 text-green-700' :
            status === 'unavailable' ? 'bg-red-100 text-red-700' :
              'bg-yellow-100 text-yellow-700'
            }`}
        >
          {status === "available"
            ? "Disponible"
            : status === "unavailable"
              ? "No disponible"
              : "En permiso"}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToDetails();
          }}
          className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-hover transition-colors"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};