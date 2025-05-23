'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthData {
  userId: number;
  role: string;
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
    const role = Cookies.get('role');
    const userId = Cookies.get('userId');

    if (role && userId) {
      setAuth({ userId: Number(userId), role });
    }
  }, []);

  const login = (data: AuthData) => {
    // Access token is handled via secure HttpOnly cookie by the backend
    Cookies.set('role', data.role, { secure: process.env.NODE_ENV === 'production' });
    Cookies.set('userId', String(data.userId), { secure: process.env.NODE_ENV === 'production' });
    setAuth(data);
  };

  const logout = () => {
    Cookies.remove('role');
    Cookies.remove('userId');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
