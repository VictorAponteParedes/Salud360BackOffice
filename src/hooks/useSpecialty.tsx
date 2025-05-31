import { useEffect, useState } from "react";
import { SpecialtyService } from "../services/specialty";
import type { SpecialtiesType } from "../types/specialties";

const specialtyService = new SpecialtyService();

export const useSpecialty = () => {
    const [specialties, setSpecialties] = useState<SpecialtiesType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSpecialtys = async () => {
            try {
                const response = await specialtyService.getSpecialties();
                setSpecialties(response);
            } catch (error) {
                console.error("Error fetching Specialtys:", error);
                setError("No se pudo cargar la lista de especialidades");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpecialtys();
    }, []);

    return { specialties, isLoading, error };
};