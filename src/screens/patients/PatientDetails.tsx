import React from "react";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Droplet,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDetails = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detalle de Pacientes</h1>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-2">
          <Edit3 size={18} />
          <span>Editar paciente</span>
        </button>
      </div>

      {/* Paneles uno debajo del otro */}
      <div className="flex flex-col gap-6">
        {/* Información Personal */}
        <Panel
          header={
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <User className="text-gray-500" size={18} />
              </div>
              <span className="font-semibold text-gray-800">Información Personal</span>
            </div>
          }
          toggleable
          className="w-full"
        >
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full" />
            <div>
              <p><strong>Nombre(s):</strong> María Elena</p>
              <p><strong>Apellido(s):</strong> González Rodríguez</p>
              <p><strong>Fecha de nacimiento:</strong> 15 de marzo, 1985</p>
            </div>
          </div>
        </Panel>

        {/* Información de Contacto */}
        <Panel
          header={
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Mail className="text-gray-500" size={18} />
              </div>
              <span className="font-semibold text-gray-800">Información de Contacto</span>
            </div>
          }
          toggleable
          className="w-full"
        >
          <p><Mail className="inline-block mr-2" size={16} /> <strong>Correo:</strong> maria.gonzalez@email.com</p>
          <p><Phone className="inline-block mr-2" size={16} /> <strong>Teléfono:</strong> +52 55 1234 5678</p>
          <p><MapPin className="inline-block mr-2" size={16} /> <strong>Dirección:</strong> Av. Reforma 123, Col. Centro, CDMX</p>
          <p><strong>Contacto emergencia:</strong> Carlos González - +52 55 9876 5432</p>
        </Panel>

        {/* Información Médica */}
        <Panel
          header={
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Droplet className="text-red-500" size={18} />
              </div>
              <span className="font-semibold text-gray-800">Información Médica</span>
            </div>
          }
          toggleable
          className="w-full"
        >
          <p><strong>CURP:</strong> GORM850315MDFNRD09</p>
          <p><strong>Tipo de sangre:</strong> <Tag value="O+" severity="danger" /></p>
          <p><strong>Alergias:</strong></p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Tag value="Penicilina" severity="warning" />
            <Tag value="Mariscos" severity="warning" />
            <Tag value="Polen" severity="warning" />
          </div>
        </Panel>

        {/* Seguridad */}
        <Panel
          header={
            <div className="flex items-center gap-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Shield className="text-purple-500" size={18} />
              </div>
              <span className="font-semibold text-gray-800">Seguridad</span>
            </div>
          }
          toggleable
          className="w-full"
        >
          <div className="bg-gray-100 p-4 rounded-lg flex items-start gap-3">
            <Shield className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-semibold text-gray-800">Contraseña protegida</p>
              <p className="text-gray-600 text-sm">
                La información de acceso está protegida por seguridad
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </motion.div>
  );
};

export default PatientDetails;
