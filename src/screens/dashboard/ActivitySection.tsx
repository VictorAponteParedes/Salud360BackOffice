import { CheckCircle, Calendar, AlertCircle, Clock } from "lucide-react";

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
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm w-full md:w-1/2">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad Reciente</h2>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start space-x-3">
            <div className="mt-1">{activity.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">
                {activity.author} • {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
