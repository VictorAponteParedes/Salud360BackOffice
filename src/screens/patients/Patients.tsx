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
import { translate } from "../../lang";

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
        formData.append("file", data.profileImage.file);
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
        title: translate("registerPatient.message.success.title"),
        description: translate("registerPatient.message.success.description"),
      });
      setTimeout(() => {
        navigate("patients/list");
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: translate("registerPatient.message.error.title"),
        description:
          error.message ||
          translate("registerPatient.message.error.description"),
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
          transition={{ duration: 1, ease: "easeOut" }}
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
              {translate("registerPatient.title")}
            </h1>
          </div>

          {/* Grid de 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Información Personal */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {translate("registerPatient.fields.titlePersonalInfo")}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <ImageInput
                  name="photo"
                  label={translate("registerPatient.fields.photo.label")}
                  control={methods.control}
                />
                <TextInput
                  name="firstName"
                  label={translate("registerPatient.fields.firstName.label")}
                  placeholder={translate(
                    "registerPatient.fields.firstName.placeholder"
                  )}
                />
                <TextInput
                  name="lastName"
                  label={translate("registerPatient.fields.lastName.label")}
                  placeholder={translate(
                    "registerPatient.fields.lastName.placeholder"
                  )}
                />
                <TextInput
                  name="dateBirth"
                  label={translate("registerPatient.fields.birthDate.label")}
                  placeholder={translate(
                    "registerPatient.fields.birthDate.placeholder"
                  )}
                  type="date"
                />
              </div>
            </section>

            {/* Card: Información de contacto */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                {translate("registerPatient.fields.titleContactInfo")}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <TextInput
                  name="email"
                  label={translate("registerPatient.fields.email.label")}
                  placeholder={translate(
                    "registerPatient.fields.email.placeholder"
                  )}
                  type="email"
                />
                <TextInput
                  name="phone"
                  label={translate("registerPatient.fields.phone.label")}
                  placeholder={translate(
                    "registerPatient.fields.phone.placeholder"
                  )}
                />
                <TextInput
                  name="address"
                  label={translate("registerPatient.fields.address.label")}
                  placeholder={translate(
                    "registerPatient.fields.address.placeholder"
                  )}
                />
                <TextInput
                  name="contactEmergency"
                  label={translate(
                    "registerPatient.fields.contactEmergency.label"
                  )}
                  placeholder={translate(
                    "registerPatient.fields.contactEmergency.placeholder"
                  )}
                />
              </div>
            </section>

            {/* Card: Información médica */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-600" />
                {translate("registerPatient.fields.titleMedicalInfo")}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <TextInput
                  name="documentNumber"
                  label={translate(
                    "registerPatient.fields.documentNumber.label"
                  )}
                  placeholder={translate(
                    "registerPatient.fields.documentNumber.placeholder"
                  )}
                />
                <SelectInput
                  name="bloodType"
                  label={translate("registerPatient.fields.bloodType.label")}
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
                  placeholder={translate(
                    "registerPatient.fields.bloodType.placeholder"
                  )}
                />
                <TextInput
                  name="allergies"
                  label={translate("registerPatient.fields.allergies.label")}
                  placeholder={translate(
                    "registerPatient.fields.allergies.placeholder"
                  )}
                />
              </div>
            </section>

            {/* Card: Seguridad */}
            <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-600" />
                {translate("registerPatient.fields.titleSecurity")}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <PasswordInput
                  name="password"
                  placeholder={translate(
                    "registerPatient.fields.password.placeholder"
                  )}
                  label={translate("registerPatient.fields.password.label")}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <PasswordInput
                  name="confirmPassword"
                  label={translate(
                    "registerPatient.fields.confirmPassword.label"
                  )}
                  placeholder={translate(
                    "registerPatient.fields.confirmPassword.placeholder"
                  )}
                />
              </div>
            </section>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {translate("registerPatient.button.submit")}
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
