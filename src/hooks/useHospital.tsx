import { useEffect, useState } from "react";
import { HospitalService } from "../services/hospital";
import type { HospitalType } from "../types/hospital";
import { translateError } from "../helpers/translateError";
const hospitalService = new HospitalService();

export const useHospital = (id?: string) => {
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [hospital, setHospital] = useState<HospitalType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const hospitalData = await hospitalService.getHospitalById(id);
          setHospital(hospitalData);
        } else {
          const hospitalsList = await hospitalService.getHospitals();
          setHospitals(hospitalsList);
        }
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

    fetchData();
  }, [id]);

  const createHospital = async (hospitalData: Omit<HospitalType, "id">) => {
    setIsCreating(true);
    try {
      const newHospital = await hospitalService.createHospital(hospitalData);
      setHospitals((prev) => [...prev, newHospital]);
      return newHospital;
    } catch (error) {
      console.error("Error creating hospital:", error);
      setError("No se pudo crear el hospital");
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    hospitals,
    hospital,
    isLoading,
    error,
    createHospital,
    isCreating,
  };
};
