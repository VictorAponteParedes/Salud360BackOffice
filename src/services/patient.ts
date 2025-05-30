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

class PatientServices {
    async getProfileImage(userId: any) {
        try {
            const response = await axios.get(`/users/${userId}/profile-image`);
            console.log("Dat perfil imagen: ", response.data.url)
            return response.data.url;
        } catch (error) {
            console.log('Error al obtener imagen de perfil', error);
            return null;
        }
    }
    async uploadImage(formDataUser: FormData) {
        console.log('Datos imagen services: ', formDataUser)
        try {
            const response = await uploadApi.post('/upload', formDataUser, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (e: any) {
            console.log('Error detallado:', e.response?.data || e.message);
            throw e;
        }
    }
    async createPatient(userData: PatientFormData) {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/users/register`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.log('Error completo al registrar:', error);

            if (axios.isAxiosError(error)) {
                console.log('Datos del error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });

                const errorMessage = error.response?.data?.message ||
                    error.response?.data?.error ||
                    'Error al registrar el usuario';
                throw new Error(errorMessage);
            }

            throw new Error(error.message || "Error desconocido al registrar el usuario");
        }
    }

    async getPatients() {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener pacientes:', error);
            throw error;
        }
    }

}

export default PatientServices