// src/screens/CreateDoctor.tsx
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
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

//Hooks
import { usePatient } from "../../hooks/usePatient";
import { useLanguages } from "../../hooks/useLanguage";
import { useSpecialty } from "../../hooks/useSpecialty";
import { useHospital } from "../../hooks/useHospital";

//Types
import type { LanguageType } from "../../types/language";
import type { SpecialtiesType } from "../../types/specialties";
import type { HospitalType } from "../../types/hospital";
import { ScheduleInputRow } from "../../components/form/ScheduleInputArray";

export default function CreateDoctor() {
  const doctorService = new DoctorService();
  const { patients } = usePatient();
  const { languages } = useLanguages();
  const { specialties } = useSpecialty();
  const { hospitals } = useHospital();
  const methods = useForm({
    defaultValues: {
      patientIds: [],
      languageIds: [],
      specialtyIds: [],
      hospitalId: [],
      scheduleDtos: [],
    },
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "scheduleDtos",
  });

  const patientOptions = patients
    .filter((patient) => !!patient.id)
    .map((patient) => ({
      label: `${patient.firstName} ${patient.lastName}`,
      value: patient.id as string,
    }));

  const languagesOptions = languages
    .filter((language: LanguageType) => !!language.id)
    .map((language: LanguageType) => ({
      label: language.name,
      value: language.id,
    }));

  const specialtyOptions = specialties
    .filter((specialty: SpecialtiesType) => !!specialty.id)
    .map((specialty: SpecialtiesType) => ({
      label: specialty.name,
      value: specialty.id,
    }));

  const hospitalOptions = hospitals
    .filter((hospital: HospitalType) => !!hospital.id)
    .map((hospital: HospitalType) => ({
      label: hospital.name,
      value: hospital.id,
    }));

  const onSubmit = async (data: DoctorFormData) => {
    console.log("Datos enviados al backend:", JSON.stringify(data, null, 2));
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
        scheduleDtos: data.scheduleDtos?.map((schedule) => ({
          day: schedule.day,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        })),
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
                name="hospitalId"
                label={translate("registerDoctor.fields.hospital.label")}
                options={hospitalOptions}
              />

              <SelectInput
                name="patientIds"
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

              <ImageInput
                name="profileImage"
                label={translate("registerDoctor.fields.photo.label")}
                control={methods.control}
              />
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              {translate("registerDoctor.fields.schedule.label")}
            </h2>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <ScheduleInputRow
                  key={field.id}
                  index={index}
                  remove={remove}
                />
              ))}
              <button
                type="button"
                onClick={() => append({ day: "", startTime: "", endTime: "" })}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                {translate("registerDoctor.fields.schedule.add")}
              </button>
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
                name="specialtyIds"
                label={translate("registerDoctor.fields.specialties.label")}
                options={specialtyOptions}
              />
              <SelectInput
                name="languageIds"
                label={translate("registerDoctor.fields.languages.label")}
                options={languagesOptions}
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
