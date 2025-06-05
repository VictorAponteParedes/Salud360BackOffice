// components/ErrorMessage.tsx
import { RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export function ErrorMessage({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry?: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto p-8"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-red-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">¡Algo salió mal!</h2>
          <p className="text-gray-600 max-w-md">{error}</p>
          <button
            onClick={onRetry}
            className="mt-4 flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reintentar
          </button>
        </div>
      </div>
    </motion.div>
  );
}