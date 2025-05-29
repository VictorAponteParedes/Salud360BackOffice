// src/components/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorPage() {
    const error = useRouteError();

    // Determinar el tipo de error
    let errorMessage = "Ocurrió un error inesperado";
    let errorStatus = 500;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message || errorMessage;
        errorStatus = error.status;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    // Mensajes personalizados por código de error
    const errorMessages: Record<number, string> = {
        404: "La página que buscas no existe",
        401: "No tienes permiso para acceder a esta página",
        403: "Acceso prohibido",
        500: "Error interno del servidor",
    };

    const defaultMessage = errorMessages[errorStatus] || errorMessage;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
        >
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-4 rounded-full">
                        <AlertCircle className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                <h1 className="text-5xl font-bold text-gray-800 mb-2">{errorStatus}</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    {errorStatus === 404 ? "Página no encontrada" : "¡Algo salió mal!"}
                </h2>

                <p className="text-gray-600 mb-6">{defaultMessage}</p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Home className="w-5 h-5" />
                    Volver al inicio
                </Link>

                {/* Detalles del error solo en desarrollo (usando import.meta.env de Vite) */}
                {import.meta.env.DEV && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
                        <h3 className="font-medium text-gray-800 mb-2">Detalles del error:</h3>
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                            {JSON.stringify(error, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </motion.div>
    );
}