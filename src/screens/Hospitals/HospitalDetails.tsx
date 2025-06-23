import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Panel } from "primereact/panel";
import {
  ArrowLeft,
  Edit3,
  MapPin,
  Phone,
  Mail,
  Shield,
  Building2,
} from "lucide-react";
import { useHospital } from "../../hooks/useHospital";
import { HospitalService } from "../../services/hospital";

const hospitalService = new HospitalService();

const HospitalDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { hospital, isLoading } = useHospital(id);

  const imageUrl = hospital
    ? hospitalService.returnUrlImage(hospital)
    : "/default-hospital.png";

  return (
    <>
      {isLoading ? (
        <div className="text-center text-gray-600">Cargando...</div>
      ) : hospital ? (
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
              <h1 className="text-2xl font-bold text-gray-800">
                Detalle de Hospital
              </h1>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover flex items-center gap-2">
              <Edit3 size={18} />
              <span>Editar hospital</span>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {/* Información General */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="text-gray-500" size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Información General
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <div className="flex items-center gap-4">
                {hospital.hospitalImage?.path ? (
                  <img
                    src={imageUrl}
                    alt={`Imagen de ${hospital.name}`}
                    className="w-32 h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.currentTarget.src = "/default-hospital.png";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center">
                    <Building2 className="text-gray-500" size={48} />
                  </div>
                )}
                {/* <div>
                  <p>
                    <strong>Nombre:</strong> {hospital.name}
                  </p>
                  <p>
                    <strong>Especialidades:</strong> {hospital.}
                  </p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    {hospital.isActive ? "Activo" : "Inactivo"}
                  </p>
                </div> */}
              </div>
            </Panel>

            {/* Ubicación y Contacto */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPin className="text-green-500" size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Ubicación y Contacto
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <p>
                <MapPin className="inline-block mr-2" size={16} />
                <strong>Dirección:</strong> {hospital.address}
              </p>
              <p>
                <Phone className="inline-block mr-2" size={16} />
                <strong>Teléfono:</strong> {hospital.phone}
              </p>
              <p>
                <Mail className="inline-block mr-2" size={16} />
                <strong>Correo:</strong> {hospital.email}
              </p>
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
                  <p className="font-semibold text-gray-800">
                    Información protegida
                  </p>
                  <p className="text-gray-600 text-sm">
                    Este hospital tiene sus datos asegurados conforme a las
                    políticas de seguridad del sistema.
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-red-500">
          No se encontró el hospital
        </div>
      )}
    </>
  );
};

export default HospitalDetails;
