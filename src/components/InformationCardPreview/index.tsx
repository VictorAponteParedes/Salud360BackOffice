import React from "react";

interface InformationCardPreviewProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  category?: string;
  isDark?: boolean;
}

export function InformationCardPreview({
  title = "Título de ejemplo",
  description = "Descripción breve de la tarjeta informativa.",
  imageUrl,
  category,
  isDark = false,
}: InformationCardPreviewProps) {
  return (
    <div
      className={`w-[300px] h-[600px] rounded-[2.5rem] border-4 shadow-lg overflow-hidden relative transition-all ${
        isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      {/* Imagen de fondo centrada verticalmente con overlay */}
      {imageUrl ? (
        <div className="absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 z-0">
          <img
            src={imageUrl}
            alt="Imagen de fondo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-indigo-100 opacity-60 rounded-lg" />
        </div>
      ):(
        <div className="absolute top-1/2 left-0 w-full h-40 -translate-y-1/2 z-0">
          <img
            src={imageUrl}
            // alt="Imagen de fondo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  bg-indigo-100 opacity-60 rounded-lg" />
        </div>
      )}

      {/* Contenido encima de la imagen */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        {category && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full mb-2 ${
              isDark
                ? "bg-blue-800 text-blue-200"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {category}
          </span>
        )}

        <h2
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>

        <p
          className={`text-sm mt-2 font-bold ${
           isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
