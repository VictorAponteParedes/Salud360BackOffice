import { motion } from "framer-motion";
import { Circle, UserIcon } from "lucide-react";
import { PatientStatus } from "../../helpers";
import type { PatientFormData } from "../../types/auth";
import { PatientStatusEnum } from "../../enums";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import { translate } from "../../lang";

interface Props {
    adminUser: PatientFormData;
}

export const AdminUserCard = ({ adminUser }: Props) => {
    const navigate = useNavigate();

    const imageUrl = adminUser.profileImage?.path
        ? `${API_BASE_URL}/${adminUser.profileImage.path}`
        : '/default-profile.png';

    const goToDetails = () => {
        navigate(`/patients/${adminUser.id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-200"
        >
            <div className="flex items-start gap-4">
                {/* Icono de usuario */}
                {adminUser.profileImage?.path ? (
                    <img
                        src={imageUrl}
                        alt={`Foto de ${adminUser.firstName} ${adminUser.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-gray-400" />
                    </div>
                )}

                {/* Información del usuario en horizontal */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-800">
                            {adminUser.firstName} {adminUser.lastName}
                        </h3>
                        <PatientStatus
                            status={adminUser.status ?? PatientStatusEnum.INACTIVO}
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                            {translate("AdminUser.contact")}
                        </p>
                        <p className="text-sm text-gray-600">{adminUser.phone}</p>
                        <p className="text-sm text-gray-600">{adminUser.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                            {translate("AdminUser.birthDate")}
                        </p>
                        <p className="text-sm text-gray-600">{adminUser.dateBirth}</p>
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            onClick={goToDetails}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium border border-blue-200 rounded-md px-3 py-1 flex items-center gap-1"
                        >
                            <Circle className="w-3 h-3" />
                            {translate("AdminUser.viewDetails")}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
