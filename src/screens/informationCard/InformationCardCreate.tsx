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
import { SingleSelectInput } from "../../components/form/SingleSelectInput";
import appRoutes from "../../helpers/appRoutes";
import { InformationCardPreview } from "../../components/InformationCardPreview";
import { useTheme } from "../../context/ThemeContext";

export default function InformationCardCreate() {
  const methods = useForm<InformationCardFormData>();
  const navigate = useNavigate();
  const service = new InformationCardService();
  const { isDark } = useTheme();

  const { watch } = methods;

  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: InformationCardFormData) => {
    try {
      let imageId = null;

      if (data.serviceImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", data.serviceImage);

        const uploadResponse = await service.uploadImage(imageFormData);
        imageId = uploadResponse.id;
        console.log("Imagen subida:", uploadResponse);
      }

      const cardData = {
        ...data,
        serviceImageId: imageId,
      };

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

  const serviceImage = watch("serviceImage");
  const previewImage =
    serviceImage instanceof File
      ? URL.createObjectURL(serviceImage)
      : undefined;

  return (
    <>
      <FormProvider {...methods}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-8 rounded-xl shadow-lg ${
              isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-800"
                }
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1
                className={
                  isDark
                    ? "text-2xl font-bold text-white"
                    : "text-2xl font-bold text-gray-800"
                }
              >
                Crear Tarjeta Informativa
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview a la izquierda */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <InformationCardPreview
                  title={watch("title")}
                  description={watch("description")}
                  imageUrl={previewImage}
                />
              </motion.div>

              {/* Formulario a la derecha */}
              <motion.form
                onSubmit={methods.handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Sección de datos */}
                <section
                  className={
                    isDark
                      ? "bg-gray-700 p-6 rounded-lg"
                      : "bg-gray-50 p-6 rounded-lg shadow-sm"
                  }
                >
                  <h2
                    className={`text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2 ${
                      isDark
                        ? "text-white border-gray-600"
                        : "text-gray-700 border-gray-200"
                    }`}
                  >
                    <FileText className="w-5 h-5 text-blue-600" />
                    Datos de la tarjeta
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      name="title"
                      label="Título"
                      placeholder="Ingrese un título informativo"
                      isDark={isDark}
                    />
                    <SingleSelectInput
                      name="screen"
                      label="Pantalla destino (opcional)"
                      options={[
                        { label: "Inicio", value: appRoutes.HOME },
                        {
                          label: "Perfil del Paciente",
                          value: appRoutes.PROFILE,
                        },
                        {
                          label: "Marcar una cita médico",
                          value: appRoutes.QUOTES,
                        },
                        {
                          label: "Olvido de clave",
                          value: appRoutes.FORGOT_PASSWORD,
                        },
                      ]}
                      isDark={isDark}
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
                      isDark={isDark}
                    />
                  </div>
                </section>

                {/* Botón de envío */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
                  >
                    Guardar
                  </button>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </FormProvider>

      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
    </>
  );
}