// src/screens/InformationCardCreate.tsx
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";

import { ImageInput } from "../../components/form/ImageInput";
import { TextInput } from "../../components/form/TextInput";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang";
import InformationCardService from "../../services/informationCard";
import type { InformationCardFormData } from "../../types/InformationCardFormData";

export default function InformationCardCreate() {
    const methods = useForm<InformationCardFormData>();
    const navigate = useNavigate();
    const service = new InformationCardService();

    const [message, setMessage] = useState<null | {
        type: "success" | "error";
        title: string;
        description: string;
    }>(null);

    const onSubmit = async (data: InformationCardFormData) => {
        try {
            // Primero subir la imagen si existe
            let imageId = null;
            if (data.serviceImage) {
                const imageFormData = new FormData();
                imageFormData.append('file', data.serviceImage);

                const uploadResponse = await service.uploadImage(imageFormData);
                imageId = uploadResponse.id;
                console.log("Imagen subida:", uploadResponse);
            }

            // Luego crear la tarjeta
            const cardData = {
                ...data,
                serviceImageId: imageId, // Envía el ID de la imagen
            };

            // Elimina la propiedad serviceImage del objeto si existe
            delete cardData.serviceImage;

            await service.create(cardData);

            setMessage({
                type: "success",
                title: "Tarjeta informativa creada",
                description: "La tarjeta fue registrada correctamente.",
            });

            setTimeout(() => navigate(-1), 2000);
        } catch (error: any) {
            setMessage({
                type: "error",
                title: "Error al crear tarjeta",
                description: error.message || "Ocurrió un error inesperado.",
            });
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <motion.form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <button type="button" onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Crear Tarjeta Informativa
                        </h1>
                    </div>

                    <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Datos de la tarjeta
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                name="title"
                                label="Título"
                                placeholder="Ingrese un título informativo"
                            />
                            <TextInput
                                name="screen"
                                label="Pantalla destino (opcional)"
                                placeholder="Ej: services, covid-info, etc."
                            />
                            <ImageInput
                                name="serviceImage"
                                label="Imagen"
                                control={methods.control}
                            />
                            <TextInput
                                name="description"
                                label="Descripción"
                                placeholder="Escriba una breve descripción"
                            />
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
                        >
                            Guardar
                        </button>
                    </div>
                </motion.form>
            </FormProvider>

            {message && (
                <MessageToast {...message} onClose={() => setMessage(null)} />
            )}
        </>
    );
}
