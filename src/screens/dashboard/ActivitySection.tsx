import { CheckCircle, Calendar, AlertCircle, Clock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const activities = [
  {
    id: 1,
    type: "success",
    icon: <CheckCircle className="text-green-500" size={20} />,
    message: "Nuevo paciente registrado",
    author: "María González",
    time: "Hace 10 min",
  },
  {
    id: 2,
    type: "info",
    icon: <Calendar className="text-blue-500" size={20} />,
    message: "Cita agendada",
    author: "Carlos Ruiz",
    time: "Hace 25 min",
  },
  {
    id: 3,
    type: "success",
    icon: <CheckCircle className="text-green-500" size={20} />,
    message: "Análisis completado",
    author: "Ana López",
    time: "Hace 45 min",
  },
  {
    id: 4,
    type: "danger",
    icon: <AlertCircle className="text-red-500" size={20} />,
    message: "Resultado crítico",
    author: "Pedro Martín",
    time: "Hace 1 hora",
  },
];

export default function ActivitySection() {
  const { isDark } = useTheme();

  return (
    <section
      className={`p-6 rounded-xl shadow-sm w-full md:w-1/2 ${
        isDark ? "bg-gray-700" : "bg-white"
      }`}
    >
      <h2
        className={`text-lg font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Actividad Reciente
      </h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-3">
            <div className="mt-1">{activity.icon}</div>
            <div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-gray-100" : "text-gray-700"
                }`}
              >
                {activity.message}
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.author} • {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}