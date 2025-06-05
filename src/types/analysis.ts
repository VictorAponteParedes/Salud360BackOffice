import type{ PatientFormData } from "./auth";

export interface AnalysisFormData {
    id: string;
    name: string;
    description?: string;
    labName?: string;
    fileUrl?: FileList;
    analysisDate: string; 
    results?: string;
    createdAt?: string;
    updatedAt?: string;
    patient?: PatientFormData;
    patientId: string;
    status: string;
  }
  