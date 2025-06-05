// helpers/translateError.ts
export function translateError(message: string): string {
    const map: Record<string, string> = {
      "Network Error": "Error de red. Verifica tu conexión.",
      "Request failed with status code 404": "No se encontró el recurso solicitado.",
      "Request failed with status code 500": "Error interno del servidor.",
      "Failed to fetch": "No se pudo conectar con el servidor.",
      "timeout of 5000ms exceeded": "La solicitud tardó demasiado en responder.",
    };
  
    return map[message] || "Ocurrió un error inesperado.";
  }
  