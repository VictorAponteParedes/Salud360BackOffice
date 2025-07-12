import axios from "axios";
import type { PatientFormData } from "../types/auth";
import { API_BASE_URL } from "../constants";


export const uploadApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

class AdminServices {

    async getAdminUsers(token: string): Promise<PatientFormData[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/admins`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al obtener pacientes:", error);
            throw error;
        }
    }

    async getAdminUserById(patientId: string): Promise<PatientFormData | null> {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${patientId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener paciente:', error);
            throw error;
        }
    }

}
export default AdminServices;