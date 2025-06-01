import { useEffect, useState } from "react";
import { HospitalService } from "../services/hospital";
import type { HospitalType } from "../types/hospital";

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
            } catch (error) {
                console.error("Error fetching hospitals:", error);
                setError("No se pudo cargar la lista de hospitales");
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