import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { logoHospital, logo } from "../../../assets/images";
import { RoutesView } from "../../../routes/route";
import { TextInput } from "../../../components/form/TextInput";
import { MessageToast } from "../../../components/MessageToast";
import { translate } from "../../../lang";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const success = await login(data.email, data.password);
      if (success) {
        setMessage({
          type: "success",
          title: translate("Login.messageSuccess.title"),
          description: translate("Login.messageSuccess.subtitle"),
        });

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } else {
        setMessage({
          type: "error",
          title: translate("Login.messageError.title"),
          description: translate("Login.messageError.subtitle"),
        });
      }
    } catch (err) {
      setMessage(null);
      setError("Ocurrió un error durante el login");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen flex items-center justify-center font-poppins bg-gradient-to-r from-blue-100 to-white overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center blur-sm scale-110"
          style={{
            backgroundImage: `url(${logoHospital})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(125% 125% at 50% 90%, rgba(255, 255, 255, 0.7) 30%, rgba(103, 163, 201, 0.6) 100%)`,
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-white relative z-10">
        <div
          className="hidden md:flex flex-1 bg-blue-50 items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #d0e7ff 0%, #a3c7ff 100%)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
            style={{ borderRadius: "0 0 0 12px" }}
          />
        </div>

        <div className="flex-1 p-16 bg-white">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
            {translate("Login.title")}
          </h2>
          <p className="mb-8 text-center text-gray-600">
            {translate("Login.subtitle")}
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded mb-6 text-center">
              {error}
            </div>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <TextInput
                name="email"
                label={translate("Login.emailLabel")}
                type="email"
                placeholder={translate("Login.emailPlaceholder")}
              />

              <TextInput
                name="password"
                label={translate("Login.passwordLabel")}
                type="password"
                placeholder={translate("Login.passwordPlaceholder")}
              />

              <div className="text-right">
                <a
                  href={RoutesView.forgotPassword}
                  className="text-sm text-gray-400 hover:text-blue-600 transition"
                >
                  {translate("Login.forgotPassword")}
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? translate("Login.loading")
                  : translate("Login.buttonSubmit")}
              </button>
            </form>
          </FormProvider>
          {message && (
            <MessageToast {...message} onClose={() => setMessage(null)} />
          )}
        </div>
      </div>
    </motion.div>
  );
}