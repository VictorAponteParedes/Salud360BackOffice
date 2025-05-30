import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { logoHospital } from "../../../assets/images";
import { Hospital } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("vaponte520@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/", { replace: true });
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
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
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${logoHospital})`,
        }}
      ></div>

      {/* Card de login */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden bg-white relative z-10">
        {/* Columna izquierda con ícono Lucide */}
        <div
          className="hidden md:flex flex-1 bg-blue-50 items-center justify-center p-14"
          style={{
            background: "linear-gradient(135deg, #d0e7ff 0%, #a3c7ff 100%)",
          }}
        >
          <Hospital className="w-48 h-48 text-blue-600" />{" "}
        </div>

        {/* Columna derecha con formulario */}
        <div className="flex-1 p-16 bg-white">
          <h2 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
            Iniciar sesión
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded mb-8 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-600 mb-3"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-5 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500 transition"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-base font-medium text-gray-600 mb-3"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-full px-5 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-500 transition"
                placeholder="●●●●●●●●"
                required
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-blue-600 transition"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cargando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
