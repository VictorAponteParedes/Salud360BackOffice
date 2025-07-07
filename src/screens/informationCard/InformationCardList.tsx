import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Plus, FileText } from "lucide-react";
import { RoutesView } from "../../routes/route";
import { useInformationCards } from "../../hooks/useInformationCards";
import { InformationCard } from "./InformationCard";
import { ErrorMessage } from "../../components/ErrorMessage";

export default function InformationCardList() {
    const navigate = useNavigate();
    const { cards = [], isLoading, error } = useInformationCards();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const safeCards = cards || [];
        return safeCards.filter((card) =>
            card.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, cards]);


    if (error) {
        return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow space-y-6"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Tarjetas Informativas</h1>
                </div>
                <button
                    onClick={() => navigate(RoutesView.informationCardCreate)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5" />
                    Nueva tarjeta
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="space-y-4 pt-4 border-t">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-56 text-gray-500 bg-gray-50 rounded-lg">
                        <FileText className="w-12 h-12 mb-4" />
                        <p className="text-lg font-semibold">No se encontraron tarjetas informativas.</p>
                    </div>
                ) : (
                    filtered.map((card) => <InformationCard key={card.id} card={card} />)
                )}
            </div>
        </motion.div>
    );
}
