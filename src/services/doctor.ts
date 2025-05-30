import { API_BASE_URL } from "../constants";
import axios from "axios";
import { uploadApi } from "./patient";




export class DoctorService {
    async getDoctors() {
        try {
            const response = await axios.get(`${API_BASE_URL}/doctors`);
            return response.data;
        } catch (error) {
            console.error("Error fetching doctors:", error);
            throw error;
        }
    }

    async getDoctorById(doctorId: string) {
        try {
            const response = await axios.get(`${API_BASE_URL}/doctors/${doctorId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching doctor with ID ${doctorId}:`, error);
            throw error;
        }
    }
    async createDoctor(doctorData: any) {
        try {
            const response = await axios.post(`${API_BASE_URL}/doctors`, doctorData);
            return response.data;
        } catch (error) {
            console.error("Error creating doctor:", error);
            throw error;
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
    async getProfileImage(userId: any) {
        try {
            const response = await axios.get(`/users/${userId}/profile-image`);
            console.log("doctor perfil imagen: ", response.data.url)
            return response.data.url;
        } catch (error) {
            console.log('Error al obtener imagen de perfil', error);
            return null;
        }
    }

}