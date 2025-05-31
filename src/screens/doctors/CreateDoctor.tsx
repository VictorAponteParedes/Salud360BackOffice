// src/screens/CreateDoctor.tsx
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, User, Stethoscope, Star } from "lucide-react";
import { MessageToast } from "../../components/MessageToast";
import type { DoctorFormData } from "../../types/doctors";
import { translate } from "../../lang";
import { ImageInput } from "../../components/form/ImageInput";
import { DoctorService } from "../../services/doctor";
import { usePatient } from "../../hooks/usePatient";

export default function CreateDoctor() {
  const doctorService = new DoctorService();
  const { patients } = usePatient();
  const methods = useForm({
    defaultValues: {
      patientId: [],
    },
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const patientOptions = patients
    .filter((patient) => !!patient.id)
    .map((patient) => ({
      label: `${patient.firstName} ${patient.lastName}`,
      value: patient.id as string,
    }));

  const onSubmit = async (data: DoctorFormData) => {
    try {
      const formData = new FormData();

      if (data.profileImage) {
        formData.append("file", data.profileImage);
      }

      let imageId = null;
      if (formData.has("file")) {
        const uploadResponse = await doctorService.uploadImage(formData);
        imageId = uploadResponse.id;
        console.log("Imagen subida:", uploadResponse);
      }

      const doctorData = {
        ...data,
        profileImageId: imageId,
      };

      console.log("Registrando doctor:", doctorData);
      await doctorService.createDoctor(doctorData);

      setMessage({
        type: "success",
        title: translate("registerDoctor.message.success.title"),
        description: translate("registerDoctor.message.success.description"),
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: translate("registerDoctor.message.error.title"),
        description:
          error.message ||
          translate("registerDoctor.message.error.description"),
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
              {translate("registerDoctor.title")}
            </h1>
          </div>

          {/* Información básica */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              {translate("registerDoctor.fields.titleBasicInfo")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="firstName"
                label={translate("registerDoctor.fields.firstName.label")}
                placeholder={translate(
                  "registerDoctor.fields.firstName.placeholder"
                )}
              />
              <TextInput
                name="lastName"
                label={translate("registerDoctor.fields.lastName.label")}
                placeholder={translate(
                  "registerDoctor.fields.lastName.placeholder"
                )}
              />
              <TextInput
                name="rating"
                label={translate("registerDoctor.fields.rating.label")}
                type="number"
                placeholder={translate(
                  "registerDoctor.fields.rating.placeholder"
                )}
              />
              <TextInput
                name="reviews"
                label={translate("registerDoctor.fields.reviews.label")}
                type="number"
                placeholder={translate(
                  "registerDoctor.fields.reviews.placeholder"
                )}
              />
              <SelectInput
                name="hospital"
                label={translate("registerDoctor.fields.hospital.label")}
                options={[
                  {
                    label: translate(
                      "registerDoctor.fields.hospital.options.hospital1"
                    ),
                    value: "hospital1",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.hospital.options.hospital2"
                    ),
                    value: "hospital2",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.hospital.options.hospital3"
                    ),
                    value: "hospital3",
                  },
                ]}
              />


              <SelectInput
                name="patientId"
                label="Paciente"
                options={patientOptions}
              />

              <SelectInput
                name="status"
                label={translate("registerDoctor.fields.status.label")}
                options={[
                  {
                    label: translate(
                      "registerDoctor.fields.status.options.available"
                    ),
                    value: "available",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.status.options.unavailable"
                    ),
                    value: "unavailable",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.status.options.on_leave"
                    ),
                    value: "on_leave",
                  },
                ]}
              />
              <TextInput
                name="schedule"
                label={translate("registerDoctor.fields.schedule.label")}
                placeholder={translate(
                  "registerDoctor.fields.schedule.placeholder"
                )}
              />
              <ImageInput
                name="profileImage"
                label={translate("registerDoctor.fields.photo.label")}
                control={methods.control}
              />
            </div>
          </section>

          {/* Experiencia y descripción */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {translate("registerDoctor.fields.titleExperienceDescription")}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextInput
                name="experience"
                label={translate("registerDoctor.fields.experience.label")}
                placeholder={translate(
                  "registerDoctor.fields.experience.placeholder"
                )}
              />
              <TextInput
                name="description"
                label={translate("registerDoctor.fields.description.label")}
                placeholder={translate(
                  "registerDoctor.fields.description.placeholder"
                )}
              />
            </div>
          </section>

          {/* Especialidades y lenguajes */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-red-600" />
              {translate("registerDoctor.fields.titleSpecialtiesLanguages")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                name="specialties"
                label={translate("registerDoctor.fields.specialties.label")}
                options={[
                  {
                    label: translate(
                      "registerDoctor.fields.specialties.options.cardiology"
                    ),
                    value: "cardiology",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.specialties.options.pediatrics"
                    ),
                    value: "pediatrics",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.specialties.options.neurology"
                    ),
                    value: "neurology",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.specialties.options.dermatology"
                    ),
                    value: "dermatology",
                  },
                ]}
              />
              <SelectInput
                name="languages"
                label={translate("registerDoctor.fields.languages.label")}
                options={[
                  {
                    label: translate(
                      "registerDoctor.fields.languages.options.es"
                    ),
                    value: "es",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.languages.options.en"
                    ),
                    value: "en",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.languages.options.fr"
                    ),
                    value: "fr",
                  },
                  {
                    label: translate(
                      "registerDoctor.fields.languages.options.pt"
                    ),
                    value: "pt",
                  },
                ]}
              />
            </div>
          </section>

          {/* Botón */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
            >
              {translate("registerDoctor.button.submit")}
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
