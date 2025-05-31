import { API_BASE_URL } from "../constants";
import axios from "axios";
import type { LanguageType } from "../types/language";

export class LanguageService {
    async getLanguages(): Promise<LanguageType[]> {
        try {
            const response = await axios.get(`${API_BASE_URL}/lenguages`);
            return response.data;
        } catch (error) {
            console.error("Error fetching languages:", error);
            throw error;
        }
    }

    async createLanguage(languageData: any) {
        try {
            const response = await axios.post(`${API_BASE_URL}/lenguages`, languageData);
            return response.data;
        } catch (error) {
            console.error("Error creating language:", error);
            throw error;
        }
    }
}