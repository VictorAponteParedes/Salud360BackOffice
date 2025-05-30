// hooks/usePatient.ts
import { useEffect, useState } from "react";
import PatientServices from "../services/patient";
import type { PatientFormData } from "../types/auth";

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
      } catch (error) {
        console.error("Error fetching patient:", error);
        setError("No se pudo cargar el paciente");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  // Obtener lista de pacientes
  useEffect(() => {
    if (id) return; // evita doble carga si se pasa un id

    const fetchPatients = async () => {
      try {
        const response = await patientService.getPatients();
        setPatients(response);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("No se pudo cargar la lista de pacientes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [id]);

  return { patient, patients, isLoading, error };
};
