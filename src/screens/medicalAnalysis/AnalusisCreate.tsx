// src/screens/MedicalAnalysis.tsx
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/form/TextInput";
import { SelectInput } from "../../components/form/SelectInput";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang";
import { TextAreaInput } from "../../components/form/TextAreaInput";
import { DateInput } from "../../components/form/DateInput";

// Datos de prueba para pacientes (simulando respuesta de API)
const mockPatients = [
  { id: 1, name: "Pedro Fernández", email: "pedro@example.com", document: "12345678" },
  { id: 2, name: "María González", email: "maria@example.com", document: "87654321" },
  { id: 3, name: "Juan Pérez", email: "juan@example.com", document: "56781234" },
  { id: 4, name: "Ana López", email: "ana@example.com", document: "43218765" },
  { id: 5, name: "Carlos Ruiz", email: "carlos@example.com", document: "98765432" },
];

// Tipos para el formulario
type AnalysisFormData = {
  patientId: string;
  analysisType: string;
  analysisDate: string;
  result: string;
  observations: string;
};

export default function MedicalAnalysis() {
  const methods = useForm<AnalysisFormData>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: AnalysisFormData) => {
    try {
      console.log("Creando análisis médico:", data);
      // Aquí iría la llamada al servicio para guardar el análisis
      
      // Simulamos un retraso de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({
        type: "success",
        title: "Análisis creado",
        description: "El análisis médico se ha registrado correctamente",
      });
      
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: "Error al crear análisis",
        description: error.message || "Ocurrió un error al guardar el análisis",
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
              Nuevo Análisis Médico
            </h1>
          </div>

          {/* Sección de selección de paciente */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Selecciona paciente
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                name="patientId"
                label="Buscar paciente por nombre, email o documento"
                options={mockPatients.map(patient => ({
                  label: `${patient.name} (${patient.document})`,
                  value: patient.id.toString(),
                }))}
                placeholder="Seleccione un paciente"
              />
            </div>
          </section>

          {/* Sección de tipo de análisis */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Tipo de análisis
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <SelectInput
                name="analysisType"
                options={[
                  { label: "Función renal", value: "renal_function" },
                  { label: "Hemograma completo", value: "complete_blood_count" },
                  { label: "Perfil lipídico", value: "lipid_profile" },
                  { label: "Pruebas hepáticas", value: "liver_tests" },
                  { label: "Glucosa en sangre", value: "blood_glucose" },
                ]}
                defaultValue="renal_function"
              />
            </div>
          </section>

          {/* Sección de fecha */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Fecha
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <DateInput
                name="analysisDate"
                label="Fecha del análisis"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </section>

          {/* Sección de resultados */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Resultado
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextAreaInput
                name="result"
                label="Detalle del resultado o interpretación del análisis"
                placeholder="Ingrese los resultados del análisis..."
                rows={4}
              />
            </div>
          </section>

          {/* Sección de observaciones */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              Observaciones
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextAreaInput
                name="observations"
                label="Observaciones adicionales"
                placeholder="Ingrese cualquier observación adicional..."
                rows={3}
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
              Guardar análisis
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