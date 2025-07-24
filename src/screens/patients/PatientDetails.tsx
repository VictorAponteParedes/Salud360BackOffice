import React, { useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Tag } from "primereact/tag";
import { motion } from "framer-motion";
import PatientServices from "../../services/patient";
import { MessageToast } from "../../components/MessageToast";
import {
  ArrowLeft,
  Droplet,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Shield,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatient } from "../../hooks/usePatient";
import { RoutesView } from "../../routes/route";
import { ConfirmDeleteModal } from "../../components/modals/confirm-delete-modal";
import { PatientImage } from "./components/PatientImage";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../constants";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const patientService = new PatientServices();

const PatientDetails = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const { patient, isLoading } = usePatient(id);
  const { isDark } = useTheme();
  const [message, setMessage] = useState<null | {
    type: "success" | "error";
    title: string;
    description: string;
  }>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const imageUrl = patient
    ? patientService.returnUrlImage(patient)
    : "/default-avatar.png";

  const handleDeletePatient = async () => {
    if (!id) return;
    setLoadingDelete(true);
    try {
      await patientService.deletePatient(id, token);
      setMessage({
        type: "success",
        title: "Paciente eliminado",
        description: "El paciente fue eliminado correctamente.",
      });
      setTimeout(() => {
        navigate(RoutesView.patients);
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        title: "Error al eliminar",
        description: error.message || "No se pudo eliminar el paciente.",
      });
    } finally {
      setShowDeleteModal(false);
      setLoadingDelete(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!id || !token) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}/pdf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `paciente-${id}.pdf`;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar PDF:", error);
      setMessage({
        type: "error",
        title: "Error",
        description: "No se pudo generar el PDF del paciente.",
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <div
          className={`max-w-6xl mx-auto p-8 flex justify-center items-center h-64 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : patient ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`max-w-6xl mx-auto p-8 rounded-xl shadow-lg space-y-6 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Detalle de Pacientes
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPdf}
                className={`${
                  isDark
                    ? "bg-blue-900 text-blue-200 hover:bg-blue-800"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                } px-4 py-2 rounded flex items-center gap-2`}
              >
                <Shield size={18} />
                <span>Descargar PDF</span>
              </button>

              <button
                className={`${
                  isDark
                    ? "bg-primary-dark text-white hover:bg-primary-darker"
                    : "bg-primary text-white hover:bg-primary-hover"
                } px-4 py-2 rounded flex items-center gap-2`}
              >
                <Edit3 size={18} />
                <span>Editar paciente</span>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className={`${
                  isDark
                    ? "bg-red-900 text-red-200 hover:bg-red-800"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                } px-4 py-2 rounded flex items-center gap-2`}
              >
                <Trash2 size={18} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>

          {/* Paneles uno debajo del otro */}
          <div className="flex flex-col gap-6">
            {/* Información Personal */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-purple-100"
                    }`}
                  >
                    <User
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                      size={18}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Información Personal
                  </span>
                </div>
              }
              toggleable
              className={`w-full ${
                isDark ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {patient.profileImage?.path ? (
                  <PatientImage
                    src={imageUrl}
                    alt={`Foto de ${patient.firstName} ${patient.lastName}`}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                ) : (
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      isDark ? "bg-gray-600" : "bg-gray-200"
                    }`}
                  >
                    <User
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                      size={48}
                    />
                  </div>
                )}
                <div
                  className={`${isDark ? "text-gray-200" : "text-gray-800"}`}
                >
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
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-purple-100"
                    }`}
                  >
                    <Mail
                      className={`${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                      size={18}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Información de Contacto
                  </span>
                </div>
              }
              toggleable
              className={`w-full ${
                isDark ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            >
              <div className={`${isDark ? "text-gray-200" : "text-gray-800"}`}>
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
                  <strong>Contacto emergencia:</strong>{" "}
                  {patient.contactEmergency}
                </p>
              </div>
            </Panel>

            {/* Información Médica */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-purple-100"
                    }`}
                  >
                    <Droplet className="text-red-500" size={18} />
                  </div>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Información Médica
                  </span>
                </div>
              }
              toggleable
              className={`w-full ${
                isDark ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            >
              <div className={`${isDark ? "text-gray-200" : "text-gray-800"}`}>
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
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Sin alergias registradas
                    </p>
                  )}
                </div>
              </div>
            </Panel>

            {/* Seguridad */}
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-purple-100"
                    }`}
                  >
                    <Shield
                      className={`${
                        isDark ? "text-purple-300" : "text-purple-500"
                      }`}
                      size={18}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Seguridad
                  </span>
                </div>
              }
              toggleable
              className={`w-full ${
                isDark ? "bg-gray-700 border-gray-600" : "bg-white"
              }`}
            >
              <div
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  isDark ? "bg-gray-600" : "bg-gray-100"
                }`}
              >
                <Shield
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-500"
                  } mt-1`}
                  size={18}
                />
                <div>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Contraseña protegida
                  </p>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    La información de acceso está protegida por seguridad
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </motion.div>
      ) : (
        <div
          className={`text-center ${isDark ? "text-red-300" : "text-red-500"}`}
        >
          No se encontró el paciente
        </div>
      )}
      {message && (
        <MessageToast {...message} onClose={() => setMessage(null)} />
      )}
      <ConfirmDeleteModal
        visible={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePatient}
        loading={loadingDelete}
        title="¿Eliminar paciente?"
        message="¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default PatientDetails;