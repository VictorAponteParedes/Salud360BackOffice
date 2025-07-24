import { motion } from "framer-motion";
import { MapPin, Globe, Building, ImageOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { HospitalType } from "../../types/hospital";
import { API_BASE_URL } from "../../constants";
import { useTheme } from "../../context/ThemeContext";

interface Props {
    hospital: HospitalType;
}

export const HospitalCard = ({ hospital }: Props) => {
    const navigate = useNavigate();
    const { isDark } = useTheme();

    const goToDetails = () => {
        navigate(`/hospitals/${hospital.id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-4 rounded-lg shadow-sm mb-4 border cursor-pointer transition-colors ${
                isDark 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={goToDetails}
        >
            <div className="flex items-start gap-4">
                {/* Contenedor de imagen/icono */}
                <div className={`relative w-20 h-20 rounded-md flex items-center justify-center ${
                    isDark ? 'bg-gray-600' : 'bg-gray-100'
                }`}>
                    {hospital.hospitalImage?.path ? (
                        <img
                            src={`${API_BASE_URL}/${hospital.hospitalImage.path}`}
                            alt={`Imagen de ${hospital.name}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <div className={`flex flex-col items-center justify-center ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            <ImageOff size={24} />
                            <span className="text-xs mt-1">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Información del hospital */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Columna 1: Nombre y estado */}
                    <div className="space-y-1">
                        <h3 className={`text-lg font-bold flex items-center gap-1 ${
                            isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                            <Building size={16} className={isDark ? 'text-gray-300' : 'text-gray-600'} /> 
                            {hospital.name}
                        </h3>
                        <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                                hospital.status 
                                    ? isDark 
                                        ? "bg-green-900 text-green-200" 
                                        : "bg-green-100 text-green-700"
                                    : isDark 
                                        ? "bg-red-900 text-red-200" 
                                        : "bg-red-100 text-red-700"
                            }`}
                        >
                            {hospital.status ? "Activo" : "Inactivo"}
                        </span>
                    </div>

                    {/* Columna 2: Ubicación */}
                    <div className="space-y-1">
                        <p className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Dirección
                        </p>
                        <p className={`text-sm line-clamp-2 ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {hospital.address}, {hospital.city}, {hospital.state}
                        </p>
                    </div>

                    {/* Columna 3: Contacto */}
                    <div className="space-y-1">
                        <p className={`text-sm font-medium ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Contacto
                        </p>
                        <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {hospital.phone || "No especificado"}
                        </p>
                        <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                            {hospital.email || "Sin correo"}
                        </p>
                    </div>

                    {/* Columna 4: Sitio web y acción */}
                    <div className="flex flex-col items-end justify-between">
                        {hospital.website && (
                            <a
                                href={hospital.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm hover:underline flex items-center gap-1 ${
                                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                                }`}
                            >
                                <Globe size={14} /> Web
                            </a>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDetails();
                            }}
                            className={`text-sm rounded-md px-3 py-1 mt-2 border ${
                                isDark
                                    ? 'text-primary-300 border-primary-400 hover:bg-gray-600 hover:text-primary-200'
                                    : 'text-primary border-primary hover:bg-primary-50'
                            }`}
                        >
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>

            {/* Coordenadas - fila inferior */}
            <div className={`mt-3 pt-3 border-t flex items-center gap-2 text-sm ${
                isDark ? 'border-gray-600 text-gray-400' : 'border-gray-100 text-gray-500'
            }`}>
                <MapPin size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                Latitud: {hospital.latitude ?? "-"}, Longitud: {hospital.longitude ?? "-"}
            </div>
        </motion.div>
    );
};