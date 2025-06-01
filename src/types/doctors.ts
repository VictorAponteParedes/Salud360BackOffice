// src/types/doctor.ts
import type { SpecialtiesType } from "./specialties";
import type { LanguageType } from "./language";
import type { PatientFormDataType } from "./patient";

export interface DoctorFormData {
  id: string;
  firstName: string;
  lastName: string;
  description?: string;
  experience?: string;
  languages?: LanguageType[];
  patients: PatientFormDataType[];
  profileImage: {
    id: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
  };
  rating: string | number;
  reviews?: number;
  schedule: string;
  specialties: SpecialtiesType[];
  status: "available" | "unavailable" | "on_leave";
  onViewDetails?: () => void;
}








