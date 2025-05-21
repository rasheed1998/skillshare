'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import axios from '../../../lib/axios';

export default function Login() {
  const authContext = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authContext) return;

    try {
      const res = await axios.post('/auth/login', { email, password });
      authContext.login(res.data); // ✅ Safe access after null check
      router.push('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="input" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="input" />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}