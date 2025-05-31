import { useEffect, useState } from "react";
import { LanguageService } from "../services/lenguages";
import type { LanguageType } from "../types/language";

const languageService = new LanguageService();

export const useLanguages = () => {
    const [languages, setLanguages] = useState<LanguageType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await languageService.getLanguages();
                setLanguages(response);
            } catch (error) {
                console.error("Error fetching languages:", error);
                setError("No se pudo cargar la lista de idiomas");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    return { languages, isLoading, error };
};
