import type { DoctorFormData } from "./doctors";

export interface SpecialtiesType {
    id: string;
    name: string;
    description: string;
    doctors?: DoctorFormData[];
}