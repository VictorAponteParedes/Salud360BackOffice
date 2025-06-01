import { API_BASE_URL } from "../constants";
import axios from "axios";
import type { HospitalType } from "../types/hospital";

export class HospitalService {

    async getHospitals(): Promise<HospitalType[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/hospitals`);
            return response.data;
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            throw error;
        }
    }

    async createHospital(hospitalData: Omit<HospitalType, 'id'>): Promise<HospitalType> {
        try {
            const response = await axios.post(`${API_BASE_URL}/hospitals`, hospitalData);
            return response.data;
        } catch (error) {
            console.error("Error creating hospital:", error);
            throw error;
        }
    }

}