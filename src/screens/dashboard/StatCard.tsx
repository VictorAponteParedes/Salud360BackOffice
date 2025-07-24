import { useTheme } from "../../context/ThemeContext";

type StatCardProps = {
  title: string;
  value: any;
  icon?: React.ReactNode;
  difference: string;
  isPositive?: boolean;
};

export const StatCard = ({
  title,
  value,
  icon,
  difference,
  isPositive,
}: StatCardProps) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`rounded-xl p-4 shadow-sm w-full ${
        isDark ? "bg-gray-700" : "bg-white"
      }`}
    >
      <div
        className={`flex items-center justify-between text-sm mb-1 ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <span>{title}</span>
        {icon}
      </div>
      <div
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-sm mt-1 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "▲" : "▼"} {difference}
      </div>
    </div>
  );
};
