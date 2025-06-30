import { motion } from "framer-motion";
import { FileText, ImageOff } from "lucide-react";
import { API_BASE_URL } from "../../constants";
import type { InformationCardFormData } from "../../types/InformationCardFormData";
import { InformationCardStatus } from "../../helpers/Information-card-status";

interface Props {
    card: InformationCardFormData;
}

export const InformationCard = ({ card }: Props) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 flex gap-4 cursor-default"
        >
            <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                {card.serviceImage?.path ? (
                    <img
                        src={`${API_BASE_URL}/${card.serviceImage.path}`}
                        alt="Imagen"
                        className="w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <div className="flex flex-col items-center text-gray-400">
                        <ImageOff size={24} />
                        <span className="text-xs mt-1">Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="flex-1 grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                            <FileText size={16} /> {card.title}
                        </h3>
                        <InformationCardStatus isActive={card.isActive} />
                    </div>
                    <p className="text-sm text-gray-500">{card.screen || "Pantalla no asignada"}</p>
                </div>
                <div className="col-span-2">
                    <p className="text-sm text-gray-600">{card.description || "Sin descripción"}</p>
                </div>
            </div>
        </motion.div>
    );
};
