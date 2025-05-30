import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import PatientServices from "../../services/patient";
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
import { useNavigate, useParams } from "react-router-dom";
import { usePatient } from "../../hooks/usePatient";

const PatientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { patient, isLoading } = usePatient(id);

  return (
    <>
      {isLoading ? (
        <div className="text-center text-gray-600">Cargando...</div>
      ) : patient ? (
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
                Detalle de Pacientes
              </h1>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover flex items-center gap-2">
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
                  <span className="font-semibold text-gray-800">
                    Información Personal
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <div className="flex items-center gap-4">
                <img
                  src={patient.photo?.preview || "/default-avatar.png"}
                  alt="Foto del paciente"
                  className="w-24 h-24 object-cover rounded-full"
                />
                <div>
                  <p>
                    <strong>Nombre(s):</strong> {patient.firstName}
                  </p>
                  <p>
                    <strong>Apellido(s):</strong> {patient.lastName}
                  </p>
                  <p>
                    <strong>Fecha de nacimiento:</strong> {patient.dateBirth}
                  </p>
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
                  <span className="font-semibold text-gray-800">
                    Información de Contacto
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <p>
                <Mail className="inline-block mr-2" size={16} />{" "}
                <strong>Correo:</strong> {patient.email}
              </p>
              <p>
                <Phone className="inline-block mr-2" size={16} />{" "}
                <strong>Teléfono:</strong> {patient.phone}
              </p>
              <p>
                <MapPin className="inline-block mr-2" size={16} />{" "}
                <strong>Dirección:</strong> {patient.address}
              </p>
              <p>
                <strong>Contacto emergencia:</strong> {patient.contactEmergency}
              </p>
            </Panel>

            {/* Información Médica */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Droplet className="text-red-500" size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Información Médica
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <p>
                <strong>Número de documento:</strong> {patient.documentNumber}
              </p>
              <p>
                <strong>Tipo de sangre:</strong>{" "}
                <Tag value={patient.bloodType} severity="danger" />
              </p>
              <p>
                <strong>Alergias:</strong>
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {patient.allergies ? (
                  patient.allergies
                    .split(",")
                    .map((a, index) => (
                      <Tag key={index} value={a.trim()} severity="warning" />
                    ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Sin alergias registradas
                  </p>
                )}
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
                  <p className="font-semibold text-gray-800">
                    Contraseña protegida
                  </p>
                  <p className="text-gray-600 text-sm">
                    La información de acceso está protegida por seguridad
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-red-500">
          No se encontró el paciente
        </div>
      )}
    </>
  );
};

export default PatientDetails;
