import { useEffect, useState } from "react";
import PatientServices from "../services/patient";
import type { PatientFormData } from "../types/auth";
import { translateError } from "../helpers/translateError";

const patientService = new PatientServices();

export const usePatient = (id?: string) => {
  const [patient, setPatient] = useState<PatientFormData | null>(null);
  const [patients, setPatients] = useState<PatientFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener paciente por ID
  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const data = await patientService.getPatientById(id);
        setPatient(data);
      } catch (error: unknown) {
        const errMessage =
          error instanceof Error
            ? translateError(error.message)
            : "Error desconocido";
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  // Obtener lista de pacientes
  useEffect(() => {
    if (id) return;

    const fetchPatients = async () => {
      try {
        const response = await patientService.getPatients();
        setPatients(response);
      } catch (error: unknown) {
        const errMessage =
          error instanceof Error
            ? translateError(error.message)
            : "Error desconocido";
        setError(errMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [id]);

  return { patient, patients, isLoading, error };
};
