'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface  AuthData {
  userId: number;
  role: string;
  access_token: string;
}

interface AuthContextType {
  auth: AuthData | null;
  login: (data: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) setAuth(JSON.parse(saved));
  }, []);

  const login = (data: AuthData) => {
    localStorage.setItem('auth', JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(null);
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};