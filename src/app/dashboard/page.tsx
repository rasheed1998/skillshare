'use client';

import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const authContext = useAuth();

  if (!authContext?.auth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Not authenticated. Please login.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome, {authContext.auth.role}</p>
    </div>
  );
}