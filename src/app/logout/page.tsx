'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
    };
    logout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-700">
      Logging you out...
    </div>
  );
}
