// src/types/doctor.ts
export interface DoctorFormData {
  id: string;
  firstName: string;
  lastName: string;
  description?: string;
  experience?: string;
  languages: string[];
  patients: any[];
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
  specialties: string[];
  status: "available" | "unavailable" | "on_leave";
  onViewDetails?: () => void;
}








