// src/hooks/useAnalysis.ts
import { useEffect, useState } from "react";
import AnalysisService from "../services/analysis";
import type { AnalysisFormData } from "../types/analysis";
import { translateError } from "../helpers/translateError";

export function useAnalysis() {
  const analysisService = new AnalysisService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [analysis, setAnalysis] = useState<AnalysisFormData | null>(null);
  const [analysies, setAnalysies] = useState<AnalysisFormData[] | undefined>();

  const createAnalysis = async (data: AnalysisFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await analysisService.createAnalysis(data);
      return response.data;
    } catch (error: unknown) {
      const message = error instanceof Error 
        ? translateError(error.message)
        : "Error creando análisis";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAnalysis = async (id: string) => {
    if (!id) return null;
    
    setLoading(true);
    setError(null);
    try {
      const response = await analysisService.getAnalysisById(id);
      setAnalysis(response.data);
    } catch (error: unknown) {
      const message = error instanceof Error
        ? translateError(error.message)
        : "Error obteniendo análisis";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

 useEffect(()=>{
  const getAllAnalyses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await analysisService.getAllAnalyses();
      setAnalysies(response.data);
    } catch (error: unknown) {
      const message = error instanceof Error
        ? translateError(error.message)
        : "Error obteniendo análisis";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  getAllAnalyses()
 }, [])

  return {
    createAnalysis,
    analysies,
    analysis,
    loading,
    error,
  };
}