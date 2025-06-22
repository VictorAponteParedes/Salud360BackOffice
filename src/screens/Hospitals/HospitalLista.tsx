import { motion } from "framer-motion";
import { Search, ArrowLeft, Filter, Plus, Hospital } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHospital } from "../../hooks/useHospital";
import { RoutesView } from "../../routes/route";
import { translate } from "../../lang";
import { ErrorMessage } from "../../components/ErrorMessage";
import { HospitalCard } from "./HospitalCard";

export default function HospitalList() {
    const navigate = useNavigate();
    const { hospitals = [], isLoading, error } = useHospital();

    const handleCreateNewHospital = () => {
        navigate(RoutesView.hospitals);
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
                    />
                </div>

                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    {translate("registerHospital.list.filter")}
                </button>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {translate("registerHospital.list.listTitle")}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {hospitals.length} {translate("registerHospital.list.countRegistered")}
                    </p>
                </div>

                {hospitals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg">
                        <Hospital className="w-12 h-12 mb-4 text-gray-400" />
                        <p className="text-lg font-semibold text-center">
                            No hay hospitales registrados en este momento.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {hospitals.map((hospital) => (
                            <HospitalCard key={hospital.id} hospital={hospital} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
