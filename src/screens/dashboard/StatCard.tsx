type StatCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  difference: string;
  isPositive?: boolean;
};

export const StatCard = ({ title, value, icon, difference, isPositive }: StatCardProps) => (
  <div className="bg-white rounded-xl p-4 shadow-sm w-full">
    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
      <span>{title}</span>
      {icon}
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
      {isPositive ? "▲" : "▼"} {difference}
    </div>
  </div>
);
