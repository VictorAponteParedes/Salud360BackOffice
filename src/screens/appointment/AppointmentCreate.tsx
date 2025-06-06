import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/form/TextInput";
import { SingleSelectInput } from "../../components/form/SingleSelectInput";
import { ArrowLeft, CalendarCheck, UserCircle, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang";
import { Panel } from "primereact/panel";
import { useDoctor } from "../../hooks/useDoctor";
import { usePatient } from "../../hooks/usePatient";
import { useAppointment } from "../../hooks/useAppointment";
import type { AppointmentFormData } from "../../types/appointment";

export default function AppointmentCreate() {
  const methods = useForm<AppointmentFormData>();
  const navigate = useNavigate();
  const { doctors = [] } = useDoctor();
  const { patients = [] } = usePatient();
  const { createAppointment } = useAppointment();

  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const doctorOptions = doctors.map((doctor) => ({
    label: `${doctor.firstName} ${doctor.lastName}`,
    value: doctor.id,
  }));

  const patientOptions = patients.map((patient) => ({
    label: `${patient.firstName} ${patient.lastName}`,
    value: patient.id,
  }));

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const payload = {
        ...data,
        patientId: data.patientId,
        doctorId: data.doctorId,
      };

      await createAppointment(payload);

      setMessage({
        type: "success",
        title: "Cita creada exitosamente",
        description: "La cita médica se ha creado correctamente.",
      });

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: "Error al crear cita",
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Crear cita médica</h1>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <CalendarCheck size={18} />
              <span>Guardar cita</span>
            </button>
          </div>

          {/* Panel: Información de la cita */}
          <Panel
            header={
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CalendarCheck className="text-blue-600" size={18} />
                </div>
                <span className="font-semibold text-gray-800">Datos de la cita</span>
              </div>
            }
            toggleable
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="appointmentDate"
                label="Fecha de la cita"
                type="date"
              />

              <TextInput
                name="appointmentTime"
                label="Hora de la cita"
                type="time"
              />

              <TextInput
                name="reason"
                label="Motivo de la cita"
                placeholder="Ej. chequeo general"
              />
              <TextInput
                name="notes"
                label="Notas adicionales"
                placeholder="Agregar observaciones si es necesario"
              />
            </div>
          </Panel>

          {/* Panel: Información del paciente */}
          <Panel
            header={
              <div className="flex items-center gap-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <UserCircle className="text-green-600" size={18} />
                </div>
                <span className="font-semibold text-gray-800">Paciente</span>
              </div>
            }
            toggleable
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SingleSelectInput
                name="patientId"
                label="Seleccionar paciente"
                options={patientOptions}
                placeholder="Buscar paciente"
              />
            </div>
          </Panel>

          {/* Panel: Información del doctor */}
          <Panel
            header={
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Stethoscope className="text-purple-600" size={18} />
                </div>
                <span className="font-semibold text-gray-800">Doctor</span>
              </div>
            }
            toggleable
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SingleSelectInput
                name="doctorId"
                label="Seleccionar doctor"
                options={doctorOptions}
                placeholder="Buscar doctor"
              />
            </div>
          </Panel>
        </motion.form>
      </FormProvider>

      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
    </>
  );
}
