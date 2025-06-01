import { useEffect, useState } from "react";
import { DoctorService } from "../services/doctor";
import type { DoctorFormData } from "../types/doctors";

const doctorService = new DoctorService();

export const useDoctor = (id?: string) => {
    const [doctor, setDoctor] = useState<DoctorFormData | null>(null);
    const [doctors, setDoctors] = useState<DoctorFormData[] | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchDoctor = async () => {
            try {
                const data = await doctorService.getDoctorById(id);
                setDoctor(data);
            } catch (error) {
                console.error("Error fetching doctor:", error);
                setError("No se pudo cargar el doctor");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    useEffect(() => {
        if (id) return;

        const fetchDoctors = async () => {
            try {
                const response = await doctorService.getDoctors();
                setDoctors(response);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setError("No se pudo cargar la lista de doctores");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDoctors();
    }, [id]);

    return { doctor, doctors, isLoading, error };
};
