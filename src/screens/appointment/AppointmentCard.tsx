// src/screens/AppointmentCard.tsx
import { motion } from "framer-motion";
import { UserIcon, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { AppointmentFormData } from "../../types/appointment";
// import { AppointmentStatus } from "../../helpers";
import { API_BASE_URL } from "../../constants";

interface Props {
    appointment: AppointmentFormData;
}

export const AppointmentCard = ({ appointment }: Props) => {
    const navigate = useNavigate();

    const imageUrl = appointment.doctor.profileImage?.path
        ? `${API_BASE_URL}/${appointment.doctor.profileImage?.path}`
        : '/default-profile.png';

    const goToDetails = () => {
        navigate(`/appointments/${appointment.id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200"
        >
            <div className="flex items-start gap-4">
                {/* Imagen del paciente */}
                {appointment.doctor.profileImage?.path ? (
                    <img
                        src={imageUrl}
                        alt={`Foto de ${appointment.patient.firstName} ${appointment.patient.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                    </div>
                )}

                {/* Información de la cita */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-800">
                            {appointment.patient.firstName} {appointment.patient.lastName}
                        </h3>
                        {/* <AppointmentStatus status={appointment.status} /> */}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Fecha y Hora</p>
                        <p className="text-sm text-gray-600">
                            {appointment.appointmentDate} - {appointment.appointmentTime}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Profesional</p>
                        <p className="text-sm text-gray-600">{appointment.doctor.firstName} {appointment.doctor.lastName}</p>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            onClick={goToDetails}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-md px-3 py-1 flex items-center gap-1"
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
