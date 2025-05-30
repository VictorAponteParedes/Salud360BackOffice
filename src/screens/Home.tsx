import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader";
import { StatCard } from "./dashboard/StatCard";
import AlertsSection from "./dashboard/AlertsSection";
import { WeeklyActivityChart } from "./dashboard/WeeklyActivityChart";
import ActivitySection from "./dashboard/ActivitySection";

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
      <div className="p-6 space-y-6">
        <DashboardHeader />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Pacientes"
            value="2,847"
            difference="+12%"
            isPositive
          />
          <StatCard
            title="Doctores Activos"
            value="156"
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
            value="23"
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
