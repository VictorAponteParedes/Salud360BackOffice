import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../components/form/TextInput";
import { ImageInput } from "../../components/form/ImageInput";
import { SingleSelectInput } from "../../components/form/SingleSelectInput";
import { FlaskConical, ArrowLeft, UserCircle, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { MessageToast } from "../../components/MessageToast";
import { translate } from "../../lang";
import type { AnalysisFormData } from "../../types/analysis";
import { useAnalysis } from "../../hooks/useAnalysis";
import { Panel } from "primereact/panel";
import { usePatient } from "../../hooks/usePatient";

export default function AnalysisCreate() {
  const methods = useForm<AnalysisFormData>();
  const navigate = useNavigate();
  const { patients = [] } = usePatient();
  const { createAnalysis } = useAnalysis();

  const patientOptions = patients
    .filter((patient) => !!patient.id)
    .map((patient) => ({
      label: `${patient.firstName} ${patient.lastName}`,
      value: patient.id as string,
    }));
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: AnalysisFormData) => {
    try {
      const file = data.fileUrl?.[0] || undefined;
      console.log("data analysis", data.patientId);

      const dataToSend = {
        ...data,
        patientId: data.patientId as string,
      };
      await createAnalysis(dataToSend, file);

      setMessage({
        type: "success",
        title: translate("analysis.message.success.title"),
        description: translate("analysis.message.success.description"),
      });

      setTimeout(() => {
        // navigate(-1);
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: translate("analysis.message.error.title"),
        description:
          error.message || translate("analysis.message.error.description"),
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
              <h1 className="text-2xl font-bold text-gray-800">
                {translate("analysis.title")}
              </h1>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover flex items-center gap-2"
            >
              <Edit3 size={18} />
              <span>{translate("analysis.button.submit")}</span>
            </button>
          </div>

          {/* Panel: Información del análisis */}
          <Panel
            header={
              <div className="flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FlaskConical className="text-indigo-600" size={18} />
                </div>
                <span className="font-semibold text-gray-800">
                  {translate("analysis.fields.info.label")}
                </span>
              </div>
            }
            toggleable
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                name="name"
                label={translate("analysis.fields.name.label")}
                placeholder={translate("analysis.fields.name.placeholder")}
              />
              <TextInput
                name="description"
                label={translate("analysis.fields.description.label")}
                placeholder={translate(
                  "analysis.fields.description.placeholder"
                )}
              />
              <TextInput
                name="results"
                label={translate("analysis.fields.result.label")}
                placeholder={translate("analysis.fields.result.placeholder")}
              />
              <TextInput
                name="labName"
                label={translate("analysis.fields.labName.label")}
                placeholder={translate("analysis.fields.labName.placeholder")}
              />
              <TextInput
                name="analysisDate"
                label={translate("analysis.fields.analysisDate.label")}
                type="date"
              />
            </div>
          </Panel>

          {/* Panel: Información del paciente */}
          <Panel
            header={
              <div className="flex items-center gap-2">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <UserCircle className="text-teal-600" size={18} />
                </div>
                <span className="font-semibold text-gray-800">
                  {translate("analysis.fields.patient.label")}
                </span>
              </div>
            }
            toggleable
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SingleSelectInput
                name="patientId"
                label={translate("analysis.fields.patient.label")}
                options={patientOptions}
                placeholder={translate("analysis.fields.patient.placeholder")}
              />

              <ImageInput
                name="profileImage"
                label={translate("registerDoctor.fields.photo.label")}
                control={methods.control}
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
