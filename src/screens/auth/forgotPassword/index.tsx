import { useForm, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { TextInput } from "../../../components/form/TextInput";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageToast } from "../../../components/MessageToast";
import { RoutesView } from "../../../routes/route";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPassword() {
  const methods = useForm<ForgotPasswordForm>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const onSubmit = async (data: ForgotPasswordForm) => {
  try {
    console.log("Enviando email de recuperación a:", data.email);

    setMessage({
      type: "success",
      title: "Correo enviado",
      description:
        "Hemos enviado un código de verificación para restablecer tu contraseña.",
    });

    setTimeout(() => {
      navigate(RoutesView.verifyCode);
    }, 2000);
  } catch (error) {
    setMessage({
      type: "error",
      title: "Error",
      description: "No se pudo enviar el correo de recuperación.",
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
          <div className="flex items-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Recuperar contraseña
            </h1>
          </div>

          <section className="space-y-4">
            <TextInput
              name="email"
              label="Correo electrónico"
              placeholder="ejemplo@correo.com"
              type="email"
            />
          </section>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
            >
              Enviar codigo
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
