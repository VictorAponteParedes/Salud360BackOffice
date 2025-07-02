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
  Globe,
  LocateIcon,
  Users,
  Stethoscope,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useHospital } from "../../hooks/useHospital";
import { HospitalService } from "../../services/hospital";

const hospitalService = new HospitalService();

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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

          {/* Panel: Información General */}
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
              <div>
                <p>
                <Building2 className="inline-block mr-2" size={16} />
                <strong>Nombre:</strong> {hospital.name}
                </p>
                                <p>
                <MapPin className="inline-block mr-2" size={16} />
                <strong>Estado:</strong> {hospital.state}
                </p>

                <p>
                  <Globe className="inline-block mr-2" size={16} />
                  <strong>Sitio Web:</strong> {hospital.website || "No definido"}
                </p>
              </div>
            </div>
          </Panel>

          {/* Panel: Ubicación y contacto */}
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
          >
            <p>
              <MapPin className="inline-block mr-2" size={16} />
              <strong>Dirección:</strong> {hospital.address}
            </p>
            <p>
            <Globe className="inline-block mr-2" size={16} />
            <strong>País:</strong> {hospital.country}
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

          <Panel
              header={
                <div className="flex items-center gap-2">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Users className="text-red-500" size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Relacionados
                  </span>
                </div>
              }
              toggleable
              className="w-full"
            >
              <p>
                <Users className="inline-block mr-2" size={16} />
                <strong>Pacientes:</strong> {hospital.patients?.length ?? 0}
              </p>
              <p>
                <Stethoscope className="inline-block mr-2" size={16} />
                <strong>Doctores:</strong> {hospital.doctors?.length ?? 0}
              </p>
            </Panel>

          {/* Panel: Mapa ubicación */}
          {(hospital.latitude && hospital.longitude) && (
            <Panel
              header={
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <LocateIcon className="text-indigo-600" size={18} />
                  </div>
                  <span className="font-semibold text-gray-800">
                    Mapa de Ubicación
                  </span>
                </div>
              }
              toggleable
            >
              <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
                <MapContainer
                center={[+hospital.latitude, +hospital.longitude]}
                zoom={15}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                dragging={true}
                style={{ height: "100%", width: "100%" }}
                >

                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[+hospital.latitude, +hospital.longitude]}>
                    <Popup>
                      {hospital.name} <br />
                      {hospital.address}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Panel>
          )}

          {/* Panel: Seguridad */}
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
