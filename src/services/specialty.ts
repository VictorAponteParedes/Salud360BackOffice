import { API_BASE_URL } from "../constants";
import axios from "axios";
import type { SpecialtiesType } from "../types/specialties";



export class SpecialtyService {

    async getSpecialties(): Promise<SpecialtiesType[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/specialties`);
            return response.data;
        } catch (error) {
            console.error("Error fetching specialty:", error);
            throw error;
        }
    }

    async createSpecialtie(specialtieData: any) {
        try {
            const response = await axios.post(`${API_BASE_URL}/specialties`, specialtieData);
            return response.data;
        } catch (error) {
            console.error("Error creating specialty:", error);
            throw error;
        }
    }


}