// src/screens/Patients.tsx
import { FormProvider, useForm } from "react-hook-form";
import { PasswordInput } from "../../components/form/PasswordInput";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import { ImageInput } from "../../components/form/ImageInput";
import { User, Phone, ShieldCheck, Stethoscope, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PatientServices from "../../services/patient";
import type { PatientFormData } from "../../types/auth";
import { useState } from "react";
import { MessageToast } from "../../components/MessageToast";

export default function Patients() {
  const methods = useForm<PatientFormData>();
  const navigate = useNavigate();
  const patientService = new PatientServices();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: PatientFormData) => {
    try {
      const formData = new FormData();

      if (data.profileImage?.file) {
        formData.append("file", data.profileImage.file); // Asegúrate que esté en ese formato
      }

      let imageId = null;
      if (formData.has("file")) {
        const uploadResponse = await patientService.uploadImage(formData);
        imageId = uploadResponse.id;
        console.log("Imagen subida:", uploadResponse);
      }

      const userData = {
        ...data,
        profileImageId: imageId,
      };

      console.log("Registrando usuario:", userData);
      await patientService.createPatient(userData);

      // Mostrar mensaje personalizado
      setMessage({
        type: "success",
        title: "Paciente registrado",
        description: "El paciente fue creado exitosamente.",
      });
      setTimeout(() => {
        navigate("patients/list");
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: "Error",
        description: error.message || "No se pudo registrar el paciente.",
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Registro de Paciente
            </h1>
          </div>

          {/* Grid de 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Información Personal */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Información personal
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <ImageInput
                  name="photo"
                  label="Foto de perfil"
                  control={methods.control}
                />
                <TextInput name="firstName" label="Nombre" />
                <TextInput name="lastName" label="Apellido" />
                <TextInput
                  name="dateBirth"
                  label="Fecha de nacimiento"
                  type="date"
                />
              </div>
            </section>

            {/* Card: Información de contacto */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Información de contacto
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <TextInput name="email" label="Correo electrónico" type="email" />
                <TextInput name="phone" label="Teléfono" />
                <TextInput name="address" label="Dirección" />
                <TextInput
                  name="contactEmergency"
                  label="Contacto de emergencia"
                />
              </div>
            </section>

            {/* Card: Información médica */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-600" />
                Información médica
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <TextInput name="documentNumber" label="DNI / Documento" />
                <SelectInput
                  name="bloodType"
                  label="Tipo de sangre"
                  options={[
                    { label: "A+", value: "A+" },
                    { label: "A-", value: "A-" },
                    { label: "B+", value: "B+" },
                    { label: "B-", value: "B-" },
                    { label: "O+", value: "O+" },
                    { label: "O-", value: "O-" },
                    { label: "AB+", value: "AB+" },
                    { label: "AB-", value: "AB-" },
                  ]}
                />
                <TextInput name="allergies" label="Alergias" />
              </div>
            </section>

            {/* Card: Seguridad */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-600" />
                Seguridad
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <PasswordInput name="password" label="Contraseña" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <PasswordInput name="confirmPassword" label="Confirmar Contraseña" />
              </div>
            </section>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Registrar paciente
            </button>
          </div>
        </motion.form>
      </FormProvider>
      {message && (
        <MessageToast
          {...message}
          onClose={() => setMessage(null)}
        />
      )}
    </>
  );
}
