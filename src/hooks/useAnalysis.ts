// src/hooks/useAnalysis.ts
import { useState } from "react";
import AnalysisService from "../services/analysis";
import type { AnalysisFormData } from "../types/analysis";
import { translateError } from "../helpers/translateError";

export function useAnalysis() {
  const analysisService = new AnalysisService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createAnalysis = async (data: AnalysisFormData) => {
    setLoading(true);
    try {
      const response = await analysisService.createAnalysis(data);
      return response.data;
    } catch (error: unknown) {
      error instanceof Error
        ? setError(translateError(error.message))
        : setError("Error creando análisis");
        throw error;
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
