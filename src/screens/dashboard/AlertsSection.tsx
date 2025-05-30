type Alert = {
  color: 'red' | 'yellow' | 'blue';
  message: string;
  time: string;
};

const alerts: Alert[] = [
  { color: 'red', message: '3 pacientes con resultados críticos requieren atención inmediata', time: 'Hace 5 min' },
  { color: 'yellow', message: 'Dr. García tiene la agenda completa para esta semana', time: 'Hace 15 min' },
  { color: 'blue', message: 'Nuevo equipo de análisis instalado en Hospital Central', time: 'Hace 1 hora' },
];

const colorMap = {
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
};

const AlertsSection = () => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-600">⚠️</span>
        <h3 className="text-md font-semibold text-gray-800">Alertas Rápidas</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">Notificaciones importantes que requieren atención</p>

      <ul className="space-y-3">
        {alerts.map((alert, idx) => (
          <li key={idx} className="flex items-center gap-3 bg-gray-50 rounded-md p-3">
            <span className={`w-3 h-3 rounded-full ${colorMap[alert.color]}`}></span>
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">{alert.message}</span>
              <span className="text-xs text-gray-400">{alert.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsSection;
