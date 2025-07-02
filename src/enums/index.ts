export const PatientStatusEnum = {
  ACTIVO: "activo",
  CRITICO: "critico",
  SEGUIMIENTO: "seguimiento",
  INACTIVO: "inactivo",
  PENDIENTE: "pendiente",
} as const;

export const AnalysisStatusEnum = {
  COMPLETADO: "Completado",
  PENDIENTE: "Pendiente",
  ANORMAL: "Anormal",
  CRITICO: "Crítico",
} as const;


export const AppointmentStatusEnum = {
  CONFIRMADA: "CONFIRM",
  PENDIENTE: "PENDING",
  COMPLETADA: "APPROVED",
  CANCELADA: "REJECTED",
} as const;

export const InformationCardStatusEnum = {
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
} as const;