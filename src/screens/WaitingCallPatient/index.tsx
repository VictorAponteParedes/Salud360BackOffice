// src/screens/PatientCallScreen.tsx
import { motion } from "framer-motion";
import { User, Stethoscope, DoorOpen } from "lucide-react";

export default function PatientCallScreen() {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen w-full flex flex-col items-center justify-center p-8  via-blue-100 to-white"
      >
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-700 mb-4">
            Siguiente Paciente
          </h1>
          <div className="w-32 h-1 bg-[#67a3c9] mx-auto rounded-full" />
        </div>

        {/* Tarjeta central */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 md:p-16 lg:p-20 max-w-4xl w-full text-center border border-white/20"
        >
          {/* Nombre del paciente */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#67a3c9]/20 p-4 rounded-full">
                <User className="w-12 h-12 text-[#67a3c9]" />
              </div>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-800 mb-2">
              María González
            </h2>
            <p className="text-2xl md:text-3xl text-slate-600 font-light">
              Por favor diríjase a la sala
            </p>
          </div>

          {/* Doctor y sala */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Doctor */}
            <div className="flex flex-col items-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-4">
                <Stethoscope className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">
                Doctor
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">
                Dr. Rodríguez
              </p>
            </div>

            {/* Sala */}
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <DoorOpen className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-2">
                Consultorio
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">
                Sala 205
              </p>
            </div>
          </div>

          {/* Mensaje inferior */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xl md:text-2xl text-slate-600 font-light">
              Gracias por su paciencia
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-lg text-slate-600/80">
            Hospital San Rafael • Atención de Calidad
          </p>
        </div>
      </motion.div>
    );
}
