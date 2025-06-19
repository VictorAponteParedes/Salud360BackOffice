import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { TextInput } from "../../../components/form/TextInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageToast } from "../../../components/MessageToast";
type VerifyCodeForm = {
  code: string;
};

export default function VerifyCode() {
  const methods = useForm<VerifyCodeForm>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: VerifyCodeForm) => {
    try {
      console.log("Verificando código:", data.code);

      // Simulación de validación
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: "success",
        title: "Código verificado",
        description: "Redirigiendo al login...",
      });

      setTimeout(() => navigate("/auth/login"), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        title: "Código incorrecto",
        description: "El código ingresado no es válido.",
      });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <motion.form
          onSubmit={methods.handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6 mt-16"
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Verificación de código
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Ingresa el código que te enviamos por correo.
          </p>

          <TextInput
            name="code"
            label="Código de verificación"
            placeholder="Ej: 123456"
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
            >
              Verificar
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
