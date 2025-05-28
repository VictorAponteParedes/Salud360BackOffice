import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <motion.form
      onSubmit={methods.handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bienvenido a la Aplicación
      </h1>
    </motion.form>
  );
}
