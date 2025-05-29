import { User } from "lucide-react";

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
  room: string;
  rating: number;
  reviews: number;
  status: "available" | "unavailable" | "on_leave";
  languages: string[];
  image?: string;
  onViewDetails: () => void;
}

export const DoctorCard = ({
  name,
  specialty,
  room,
  rating,
  reviews,
  status,
  languages,
  image,
  onViewDetails,
}: DoctorCardProps) => {
  const statusColor = {
    available: "bg-green-100 text-green-700",
    unavailable: "bg-red-100 text-red-700",
    on_leave: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      {/* Foto o ícono */}
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={`Foto de ${name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        )}
        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
          <p className="text-sm text-gray-500">Consulta {room}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            {"★".repeat(Math.round(rating))}{" "}
            <span className="text-gray-600 ml-1">({reviews} reseñas)</span>
          </div>
          <div className="flex gap-2 mt-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Estado y botón */}
      <div className="flex flex-col items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
        >
          {status === "available"
            ? "Disponible"
            : status === "unavailable"
            ? "No disponible"
            : "En permiso"}
        </span>
        <button
          onClick={onViewDetails}
          className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};
