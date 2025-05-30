import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Lun', citas: 12, analisis: 8 },
  { name: 'Mar', citas: 18, analisis: 12 },
  
];

export const WeeklyActivityChart = () => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Actividad Semanal</h3>
    <LineChart width={500} height={250} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="citas" stroke="#8884d8" />
      <Line type="monotone" dataKey="analisis" stroke="#82ca9d" />
    </LineChart>
  </div>
);
