import { API_BASE_URL } from "../constants";
import axios from "axios";
import type { HospitalType } from "../types/hospital";
import { uploadApi } from "./patient";

export class HospitalService {

    async getHospitals(): Promise<HospitalType[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/hospitals`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            throw error;
        }
    }

    async getHospitalById(id: string): Promise<HospitalType> {
     try {
        const response = await axios.get(`${API_BASE_URL}/hospitals/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching hospital with ID ${id}:`, error);
        throw error;
    }
    }

    async createHospital(hospitalData: Omit<HospitalType, 'id'>): Promise<HospitalType> {
        try {
            const response = await axios.post(`${API_BASE_URL}/hospitals`, hospitalData);
            return response.data.data;
        } catch (error) {
            console.error("Error creating hospital:", error);
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

    returnUrlImage(hospital: HospitalType): string {
        return hospital?.hospitalImage?.path
            ? hospital.hospitalImage.path.startsWith("http")
                ? hospital.hospitalImage.path
                : `${API_BASE_URL}/${hospital.hospitalImage.path}`
            : "/default-avatar.png";
    }

}