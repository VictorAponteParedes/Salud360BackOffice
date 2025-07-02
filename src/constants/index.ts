//Para levantar en la windonws
export const LOCAL_IP = 'localhost' // Cambia esto por tu IP local si es necesario;
// export const API_BASE_URL = `http://${LOCAL_IP}:3000`
export const API_BASE_URL = import.meta.env.VITE_API_URL;