import React, { useEffect, useState } from "react";
import type { DoctorFormData } from "../../types/doctors";
import { Languages, User } from "lucide-react";
import useShowPerfilImagen from "../../hooks/useShowPerfilImge";

export const DoctorCard = ({
  id,
  firstName,
  lastName,
  description,
  rating,
  reviews,
  status,
  languages = [],
  profileImage,
  onViewDetails,
}: DoctorFormData) => {
  // Usa el hook para obtener la URL si no tienes filename directo
  const { profileImageUri, loadingImage } = useShowPerfilImagen({ id });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {loadingImage ? (
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
        ) : profileImageUri ? (
          <img
            src={profileImageUri}
            alt={`Foto de ${firstName} ${lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {firstName} {lastName}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">Consulta</p>
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            {"★".repeat(Math.round(Number(rating)))}
            <span className="text-gray-600 ml-1">({reviews} reseñas)</span>
          </div>
          {languages.length > 0 && (
            <div className="flex gap-2 mt-2 items-center">
              <Languages className="w-4 h-4 text-gray-500" />
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            {
              available: "bg-green-100 text-green-700",
              unavailable: "bg-red-100 text-red-700",
              on_leave: "bg-yellow-100 text-yellow-700",
            }[status]
          }`}
        >
          {status === "available"
            ? "Disponible"
            : status === "unavailable"
            ? "No disponible"
            : "En permiso"}
        </span>
        <button
          onClick={onViewDetails}
          className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary-hover"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};
