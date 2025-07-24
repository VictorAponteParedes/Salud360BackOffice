import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";
import { StatCard } from "./dashboard/StatCard";
import AlertsSection from "./dashboard/AlertsSection";
import { WeeklyActivityChart } from "./dashboard/WeeklyActivityChart";
import ActivitySection from "./dashboard/ActivitySection";
import { useTheme } from "../context/ThemeContext";

//Hooks
import { usePatient } from "../hooks/usePatient";
import { useDoctor } from "../hooks/useDoctor";
import { AppointmentStatusEnum, DoctorStatus } from "../enums";
import { useAppointment } from "../hooks/useAppointment";

export default function Home() {
  const methods = useForm();
  const navigate = useNavigate();
  const { patients } = usePatient();
  const { doctors } = useDoctor();
  const { appointments } = useAppointment();
  const { isDark } = useTheme();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/dashboard");
  };

  const totalPatient = patients.length ? patients.length : "0";

  const totalDoctorActive = doctors?.filter(
    (doc) => doc.status === DoctorStatus.Available
  );
  const showTotalDoctorActive = totalDoctorActive?.length
    ? totalDoctorActive.length
    : "0";

  const totalAppointmentPending = Array.isArray(appointments)
    ? appointments.filter(
        (app) => app.status === AppointmentStatusEnum.PENDIENTE
      )
    : [];

  const showTotalAppointmentPending = totalAppointmentPending.length
    ? totalAppointmentPending.length
    : "0";

  return (
    <motion.form
      onSubmit={methods.handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-6xl mx-auto p-8 rounded-xl shadow-lg space-y-6 ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="p-6 space-y-6">
        <DashboardHeader />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Pacientes"
            value={totalPatient}
            difference="+12%"
            isPositive
          />
          <StatCard
            title="Doctores Activos"
            value={showTotalDoctorActive}
            difference="+3%"
            isPositive
          />
          <StatCard
            title="Citas Hoy"
            value="89"
            difference="-5%"
            isPositive={false}
          />
          <StatCard
            title="Análisis Pendientes"
            value={showTotalAppointmentPending}
            difference="+8%"
            isPositive
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AlertsSection />
          <ActivitySection />
        </div>

        <WeeklyActivityChart />
      </div>
    </motion.form>
  );
}