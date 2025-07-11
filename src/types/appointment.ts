
import type { AppointmentStatusEnum } from "../enums";
import type { DoctorFormData } from "./doctors";
import type { PatientFormDataType } from "./patient";

export interface AppointmentFormData {
    id: string;
    appointmentDate: string;
    reason: string;
    notes?: string;
    patientId: string;
    doctorId: string;
    patient: PatientFormDataType;
    doctor: DoctorFormData;
    status: AppointmentStatusEnum;
    appointmentTime: string;
}

export type AppointmentStatusType = {
  status: typeof AppointmentStatusEnum;
};

export interface AppointementProps {
  appointment: AppointmentFormData;
}