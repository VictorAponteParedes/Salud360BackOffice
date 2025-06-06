import { useEffect, useState } from "react";
import { AppointmentService } from "../services/appointment";
import type { AppointmentFormData } from "../types/appointment";
import { translateError } from "../helpers/translateError";

const appointmentService = new AppointmentService();

export const useAppointment = (id?: string) => {
    const [appointment, setAppointment] = useState<AppointmentFormData | null>(null);
    const [appointments, setAppointments] = useState<AppointmentFormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Obtener cita por ID
    useEffect(() => {
        if (!id) return;

        const fetchAppointment = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await appointmentService.getById(id);
                setAppointment(data);
            } catch (err: unknown) {
                const errMessage = err instanceof Error ? translateError(err.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);

    // Obtener lista de citas
    useEffect(() => {
        if (id) return;

        const fetchAppointments = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await appointmentService.getAll();
                setAppointments(response);
            } catch (err: unknown) {
                const errMessage = err instanceof Error ? translateError(err.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [id]);

    // Método para crear una cita, si quieres dejarlo aquí
    const createAppointment = async (appointmentData: AppointmentFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await appointmentService.createAppointment(appointmentData);
            return response;
        } catch (err: unknown) {
            const errMessage = err instanceof Error ? translateError(err.message) : "Error desconocido";
            setError(errMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        appointment,
        appointments,
        createAppointment,
        isLoading,
        error,
    };
};
