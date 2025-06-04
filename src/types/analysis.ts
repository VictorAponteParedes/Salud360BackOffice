export interface AnalysisFormData {
    name: string;
    description?: string;
    analysisDate: string; // en formato YYYY-MM-DD
    results?: string;
    labName?: string;
    file?: FileList; // para carga de archivo
    patientId: string;
  }
  