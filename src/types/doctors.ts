// src/types/doctor.ts
export interface DoctorFormData {
  firstName: string;
  lastName: string;
  rating: number;
  reviews: number;
  status: "available" | "unavailable" | "on_leave";
  schedule?: string;
  experience?: string;
  description?: string;
  specialties?: string[];
  languages?: string[]; 
}
