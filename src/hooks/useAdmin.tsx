import { useEffect, useState } from "react";
import AdminServices from "../services/admin";
import { translateError } from "../helpers/translateError";
import { useAuth } from "../context/AuthContext";
import type { PatientFormData } from "../types/auth";

const adminService = new AdminServices();

export const useAdminUser = (id?: string) => {
    const { token } = useAuth();

    const [userAdmin, setUserAdmin] = useState<PatientFormData | null>(null);
    const [usersAdmin, setUsersAdmin] = useState<PatientFormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const data = await adminService.getAdminUserById(id);
                setUserAdmin(data);
            } catch (error: unknown) {
                const errMessage =
                    error instanceof Error ? translateError(error.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    useEffect(() => {
        if (id || !token) return;

        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const data = await adminService.getAdminUsers(token);
                setUsersAdmin(data);
            } catch (error: unknown) {
                const errMessage =
                    error instanceof Error ? translateError(error.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [id, token]);

    return { userAdmin, usersAdmin, isLoading, error };
};
