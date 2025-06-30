import { useEffect, useState } from "react";
import InformationCardService from "../services/informationCard";
import type { InformationCardFormData } from "../types/InformationCardFormData";
import { translateError } from "../helpers/translateError";

const informationCardService = new InformationCardService();

export const useInformationCards = (id?: string) => {
    const [card, setCard] = useState<InformationCardFormData | null>(null);
    const [cards, setCards] = useState<InformationCardFormData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchCard = async () => {
            try {
                const response = await informationCardService.getById(id);
                setCard(response.data || []);
            } catch (error: unknown) {
                const errMessage =
                    error instanceof Error ? translateError(error.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCard();
    }, [id]);

    useEffect(() => {
        if (id) return;

        const fetchCards = async () => {
            try {
                const response = await informationCardService.getAll();
                setCards(response.data || []);
            } catch (error: unknown) {
                const errMessage =
                    error instanceof Error ? translateError(error.message) : "Error desconocido";
                setError(errMessage);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCards();
    }, [id]);

    return { card, cards, isLoading, error };
};
