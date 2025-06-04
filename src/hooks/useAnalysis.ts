// src/hooks/useAnalysis.ts
import { useState } from "react";
import AnalysisService from "../services/analysis";
import type { AnalysisFormData } from "../types/analysis";

export function useAnalysis() {
  const analysisService = new AnalysisService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createAnalysis = async (data: AnalysisFormData) => {
    setLoading(true);
    try {
      const response = await analysisService.createAnalysis(data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creando análisis");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAnalysis,
    loading,
    error,
  };
}
