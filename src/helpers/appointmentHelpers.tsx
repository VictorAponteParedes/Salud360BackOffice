import { AppointmentStatusEnum } from "../enums";
import type { AppointmentStatusType } from "../types/appointment";

// helpers/appointmentHelpers.ts
const statusTranslations: Record<AppointmentStatusEnum, string> = {
  [AppointmentStatusEnum.CONFIRMADA]: "Confirmada",
  [AppointmentStatusEnum.PENDIENTE]: "Pendiente",
  [AppointmentStatusEnum.COMPLETADA]: "Completada",
  [AppointmentStatusEnum.CANCELADA]: "Cancelada",
};

const statusStyles = {
  [AppointmentStatusEnum.CONFIRMADA]: "bg-green-100 text-green-800",
  [AppointmentStatusEnum.PENDIENTE]: "bg-yellow-100 text-yellow-800",
  [AppointmentStatusEnum.COMPLETADA]: "bg-blue-100 text-blue-800",
  [AppointmentStatusEnum.CANCELADA]: "bg-red-100 text-red-800",
};

export const AppointmentStatus = ({ status }: AppointmentStatusType) => {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[status]}`}
    >
      {statusTranslations[status]}
    </span>
  );
};