const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Vista general del sistema médico</p>
      </div>
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
          Sistema Operativo
        </span>
        <button className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-md">
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
