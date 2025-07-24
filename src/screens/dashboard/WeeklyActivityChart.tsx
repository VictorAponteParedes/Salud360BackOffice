import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const data = [
  { name: "Lun", citas: 12, analisis: 8 },
  { name: "Mar", citas: 18, analisis: 12 },
  { name: "Mié", citas: 15, analisis: 10 },
  { name: "Jue", citas: 22, analisis: 14 },
  { name: "Vie", citas: 19, analisis: 12 },
  { name: "Sáb", citas: 10, analisis: 6 },
  { name: "Dom", citas: 5, analisis: 3 },
];

export const WeeklyActivityChart = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl p-4 shadow-sm ${
        isDark ? "bg-gray-700" : "bg-white"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        Actividad Semanal
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke={isDark ? "#e5e7eb" : "#6b7280"} />
          <YAxis stroke={isDark ? "#e5e7eb" : "#6b7280"} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#374151" : "#ffffff",
              borderColor: isDark ? "#4b5563" : "#e5e7eb",
              borderRadius: "0.5rem",
            }}
            itemStyle={{
              color: isDark ? "#f3f4f6" : "#111827",
            }}
          />
          <Line
            type="monotone"
            dataKey="citas"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="analisis"
            stroke="#82ca9d"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
