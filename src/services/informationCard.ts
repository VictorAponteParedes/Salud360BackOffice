import axios from "axios";
import { API_BASE_URL } from "../constants";
import type { InformationCardFormData } from "../types/InformationCardFormData";
import { uploadApi } from "./patient";

export default class InformationCardService {
    async create(data: FormData) {
        try {
            const response = await axios.post(`${API_BASE_URL}/information-cards`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }

    async getAll() {
        try {
            const response = await axios.get(`${API_BASE_URL}/information-cards`);
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }

    async getById(id: string) {
        try {
            const response = await axios.get(`${API_BASE_URL}/information-cards/${id}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }

    async update(id: string, data: Partial<InformationCardFormData>) {
        try {
            const response = await axios.put(`${API_BASE_URL}/information-cards/${id}`, data);
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
        }
    }

    async delete(id: string) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/information-cards/${id}`);
            return response.data;
        } catch (err: any) {
            console.error(err);
            throw err;
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
}
