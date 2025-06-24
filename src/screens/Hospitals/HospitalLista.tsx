import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, Plus, Hospital } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHospital } from "../../hooks/useHospital";
import { RoutesView } from "../../routes/route";
import { translate } from "../../lang";
import { ErrorMessage } from "../../components/ErrorMessage";
import { HospitalCard } from "./HospitalCard";
import { useState, useMemo } from "react";

export default function HospitalList() {
    const navigate = useNavigate();
    const { hospitals = [], isLoading, error } = useHospital();
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        city: "",
        state: "",
        name: ""
    });

    const filteredHospitals = useMemo(() => {
        return hospitals.filter(hospital => {
            // Filtro por término de búsqueda general
            const matchesSearchTerm =
                searchTerm === "" ||
                hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hospital.state.toLowerCase().includes(searchTerm.toLowerCase());

            // Filtros individuales
            const matchesName =
                filters.name === "" ||
                hospital.name.toLowerCase().includes(filters.name.toLowerCase());

            const matchesCity =
                filters.city === "" ||
                hospital.city.toLowerCase().includes(filters.city.toLowerCase());

            const matchesState =
                filters.state === "" ||
                hospital.state.toLowerCase().includes(filters.state.toLowerCase());

            return matchesSearchTerm && matchesName && matchesCity && matchesState;
        });
    }, [hospitals, searchTerm, filters]);

    const handleCreateNewHospital = () => {
        navigate(RoutesView.hospitals);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setSearchTerm("");
        setFilters({
            city: "",
            state: "",
            name: ""
        });
    };

    if (error) {
        return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
    }

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto p-8 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {translate("registerHospital.list.title")}
                    </h1>
                </div>

                <button
                    onClick={handleCreateNewHospital}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    {translate("registerHospital.list.buttonAdd")}
                </button>
            </div>

            <p className="mb-6 text-gray-700">
                {translate("registerHospital.list.description")}
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar hospitales por nombre, ciudad o estado..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="w-4 h-4" />
                    {translate("registerHospital.list.filter")}
                </button>
            </div>

            {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del hospital
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={filters.name}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                Ciudad
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={filters.city}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={filters.state}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}

            <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {translate("registerHospital.list.listTitle")}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {filteredHospitals.length} {translate("registerHospital.list.countRegistered")}
                    </p>
                </div>

                {filteredHospitals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                        <Hospital className="w-12 h-12 mb-4 text-gray-400" />
                        <p className="text-lg font-semibold text-center">
                            {hospitals.length === 0
                                ? "No hay hospitales registrados en este momento."
                                : "No se encontraron hospitales con los filtros aplicados."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredHospitals.map((hospital) => (
                            <HospitalCard key={hospital.id} hospital={hospital} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}