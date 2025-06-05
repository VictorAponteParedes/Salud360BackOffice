// src/services/analysis.ts
import axios from "axios";
import type { AnalysisFormData } from "../types/analysis";
import { API_BASE_URL } from "../constants";

export default class AnalysisService {
  async createAnalysis(data: AnalysisFormData) {
    try{
        const response = await axios.post(`${API_BASE_URL}/analysis`, data);
        return response.data;
    } catch (err: any) {
        console.log(err);
        throw err;
    }
  }

  async getAllAnalyses() {
    try{
      const response = await axios.get(`${API_BASE_URL}/analysis`);
      return response.data;
  } catch (err: any) {
      console.log(err);
      throw err;
  }
  }

  async getAnalysisById(id: string) {
    return axios.get(`/analysis/${id}`);
  }

  async updateAnalysis(id: string, data: Partial<AnalysisFormData>) {
    return axios.put(`/analysis/${id}`, data);
  }

  async deleteAnalysis(id: string) {
    return axios.delete(`/analysis/${id}`);
  }
}
