import { PatientStatusEnum } from "../enums";
import { LOCAL_IP } from "../constants";
import { AnalysisStatusEnum } from "../enums";
import type { PatientStatusProps } from "../types/patient";

export const PatientStatus = ({ status }: PatientStatusProps) => {
  let statusClass = "";

  switch (status) {
    case PatientStatusEnum.ACTIVO:
      statusClass = "bg-green-100 text-green-800";
      break;
    case PatientStatusEnum.CRITICO:
      statusClass = "bg-red-100 text-red-800";
      break;
    case PatientStatusEnum.SEGUIMIENTO:
      statusClass = "bg-blue-100 text-blue-800";
      break;
    case PatientStatusEnum.PENDIENTE:
      statusClass = "bg-yellow-100 text-yellow-800";
      break;
    case PatientStatusEnum.INACTIVO:
    default:
      statusClass = "bg-gray-100 text-gray-800";
      break;
  }

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
      {status}
    </span>
  );
};

export const fixUrl = (url: string) => {
  if (!url) return url;
  if (url.includes("localhost")) {
    return url.replace("localhost", LOCAL_IP);
  }
  return url;
};

export const AnalysisStatus = ({ status }: { status: AnalysisStatusEnum }) => {
  const statusStyles = {
    [AnalysisStatusEnum.COMPLETADO]: "bg-green-100 text-green-800",
    [AnalysisStatusEnum.PENDIENTE]: "bg-yellow-100 text-yellow-800",
    [AnalysisStatusEnum.ANORMAL]: "bg-orange-100 text-orange-800",
    [AnalysisStatusEnum.CRITICO]: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};
