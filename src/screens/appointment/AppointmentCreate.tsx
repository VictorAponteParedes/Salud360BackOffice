// src/screens/AppointmentForm.tsx
import { FormProvider, useForm } from "react-hook-form";
import { SelectInput } from "../../components/form/SelectInput";
import { DateInput } from "../../components/form/DateInput";
import { TimeInput } from "../../components/form/TimeInput";
import { TextAreaInput } from "../../components/form/TextAreaInput";
import { User, Calendar, Stethoscope, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageToast } from "../../components/MessageToast";

// Datos de prueba
const mockPatients = [
  { id: 1, name: "Pedro Fernández" },
  { id: 2, name: "María González" },
  { id: 3, name: "Juan Pérez" },
  { id: 4, name: "Ana López" },
  { id: 5, name: "Carlos Ruiz" },
];

const mockDoctors = [
  { id: 1, name: "Dra. María López", specialty: "Cardiología" },
  { id: 2, name: "Dr. Carlos Ruiz", specialty: "Pediatría" },
  { id: 3, name: "Dra. Ana Martínez", specialty: "Dermatología" },
  { id: 4, name: "Dr. Javier Gómez", specialty: "Ortopedia" },
  { id: 5, name: "Dra. Laura Díaz", specialty: "Neurología" },
];

type AppointmentFormData = {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  notes: string;
};

export default function AppointmentForm() {
  const methods = useForm<AppointmentFormData>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      console.log("Creando cita:", data);
      // Aquí iría la llamada al servicio para guardar la cita
      
      // Simulamos un retraso de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: "success",
        title: "Cita creada",
        description: "La cita médica se ha programado correctamente",
      });
      
      setTimeout(() => {
        navigate("/appointments");
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: "Error al crear cita",
        description: error.message || "Ocurrió un error al programar la cita",
      });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
         <motion.form
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
              Nueva Cita Médica
            </h1>
          </div>

          {/* Sección de selección de paciente */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Datos del Paciente
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                name="patientId"
                label="Seleccionar paciente"
                options={mockPatients.map(patient => ({
                  label: patient.name,
                  value: patient.id.toString(),
                }))}
                placeholder="Buscar paciente..."
                isSearchable
                icon={<User className="w-4 h-4 text-gray-400" />}
                required
              />
            </div>
          </section>

          {/* Sección de selección de médico */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-green-600" />
              Datos del Médico
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                name="doctorId"
                label="Seleccionar médico"
                options={mockDoctors.map(doctor => ({
                  label: `${doctor.name} (${doctor.specialty})`,
                  value: doctor.id.toString(),
                }))}
                placeholder="Buscar médico..."
                isSearchable
                icon={<Stethoscope className="w-4 h-4 text-gray-400" />}
                required
              />
            </div>
          </section>

          {/* Sección de fecha y hora */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Fecha y Hora
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput
                name="date"
                label="Fecha de la cita"
                defaultValue={new Date().toISOString().split('T')[0]}
                required
              />
              <TimeInput
                name="time"
                label="Hora de la cita"
                defaultValue="09:00"
                required
              />
            </div>
          </section>

          {/* Sección de motivo */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Motivo de la Consulta
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextAreaInput
                name="reason"
                label="Motivo principal"
                placeholder="Describa el motivo de la consulta..."
                rows={3}
                required
              />
            </div>
          </section>

          {/* Sección de notas adicionales */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Notas Adicionales
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextAreaInput
                name="notes"
                label="Observaciones"
                placeholder="Agregue cualquier información adicional..."
                rows={2}
              />
            </div>
          </section>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
            >
              Programar Cita
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