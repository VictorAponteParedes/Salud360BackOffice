// src/services/auth/login.ts
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { access_token, user } = response.data;

    const allowedRoles = ["admin", "superadmin"];
    if (!allowedRoles.includes(user.role)) {
      throw new Error("No autorizado");
    }

    return { access_token, user };
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Error al intentar iniciar sesión";
    throw new Error(message);
  }
};
