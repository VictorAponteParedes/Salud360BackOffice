// src/context/AuthContext.tsx
import { createContext, useContext } from "react";
import type { ReactNode } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const login = (email: string, password: string): boolean => {
    const fixedCredentials = {
      email: 'vaponte520@gmail.com',
      password: 'Admin123'
    };

    if (email === fixedCredentials.email && password === fixedCredentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}