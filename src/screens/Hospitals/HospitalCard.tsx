import { motion } from "framer-motion";
import { MapPin, Globe, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { HospitalType } from "../../types/hospital";
import { API_BASE_URL } from "../../constants";

interface Props {
    hospital: HospitalType;
}

export const HospitalCard = ({ hospital }: Props) => {
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/hospitals/${hospital.id}`);
    };

    const imageUrl = hospital.hospitaImage?.path
        ? `${API_BASE_URL}/${hospital.hospitaImage.path}`
        : '/default-hospital.png';

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200 cursor-pointer"
            onClick={goToDetails}
        >
            <div className="flex items-start gap-4">
                {/* Imagen del hospital */}
                <div className="relative">
                    <img
                        src={imageUrl}
                        alt={`Imagen de ${hospital.name}`}
                        className="w-20 h-20 rounded-md object-cover"
                    />
                </div>

                {/* Información principal */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Columna 1: Nombre y estado */}
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                            <Building size={16} /> {hospital.name}
                        </h3>
                        <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${hospital.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                            {hospital.status ? "Activo" : "Inactivo"}
                        </span>
                    </div>

                    {/* Columna 2: Ubicación */}
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Dirección</p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {hospital.address}, {hospital.city}, {hospital.state}
                        </p>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Contacto</p>
                        <p className="text-sm text-gray-600">{hospital.phone || "No especificado"}</p>
                        <p className="text-sm text-gray-600">{hospital.email || "Sin correo"}</p>
                    </div>

                    {/* Columna 4: Sitio web y acción */}
                    <div className="flex flex-col items-end justify-between">
                        {hospital.website && (
                            <a
                                href={hospital.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                            >
                                <Globe size={14} /> Web
                            </a>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDetails();
                            }}
                            className="text-primary hover:text-primary-dark text-sm border border-primary rounded-md px-3 py-1 mt-2"
                        >
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>

            {/* Coordenadas - fila inferior */}
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-gray-400" />
                Latitud: {hospital.latitude ?? "-"}, Longitud: {hospital.longitude ?? "-"}
            </div>
        </motion.div>
    );
};
