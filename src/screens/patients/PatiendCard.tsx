import { motion } from "framer-motion";
import { Circle, UserIcon } from "lucide-react";
import { PatientStatus } from "../../helpers";
import type { PatientFormData } from "../../types/auth";
import { PatientStatusEnum } from "../../enums";

interface Props {
    patient: PatientFormData;
}

export const PatientCard = ({ patient }: Props) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200"
        >
            <div className="flex items-start gap-4">
                {/* Icono de usuario */}
                <div className="bg-blue-100 p-2 rounded-full">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                </div>

                {/* Información del paciente en horizontal */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-800">
                            {patient.firstName} {patient.lastName}
                        </h3>
                        <PatientStatus status={patient.status ?? PatientStatusEnum.INACTIVO} />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Contacto</p>
                        <p className="text-sm text-gray-600">{patient.phone}</p>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">Fecha de nacimiento</p>
                        <p className="text-sm text-gray-600">{patient.dateBirth}</p>
                    </div>

                    <div className="flex items-center justify-end">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-md px-3 py-1 flex items-center gap-1">
                            <Circle className="w-3 h-3" />
                            Ver Historial
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
