import { useEffect, useState } from "react";
import { HospitalService } from "../services/hospital";
import type { HospitalType } from "../types/hospital";
import { translateError } from "../helpers/translateError";
const hospitalService = new HospitalService();

export const useHospital = () => {
    const [hospitals, setHospitals] = useState<HospitalType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Fetch all hospitals
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
              const response = await hospitalService.getHospitals();
              setHospitals(response);
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

        fetchHospitals();
    }, []);

    // Function to create a new hospital
    const createHospital = async (hospitalData: Omit<HospitalType, 'id'>) => {
        setIsCreating(true);
        try {
            const newHospital = await hospitalService.createHospital(hospitalData);
            setHospitals(prev => [...prev, newHospital]); // Optimistic update
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
        isLoading,
        error,
        createHospital,
        isCreating
    };
};