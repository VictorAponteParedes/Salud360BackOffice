import type { PatientFormDataType } from "./patient";
import type { DoctorFormData } from "./doctors";


export interface HospitalImage {
    id: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    path: string;
}

export interface HospitalType {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone?: string;
    email?: string;
    website?: string;
    status: boolean;
    latitude?: number | null;
    longitude?: number | null;
    hospitalImage?: HospitalImage;
    hospitalImageId?: string;
    doctors?: DoctorFormData[];
    patients?: PatientFormDataType[];
}