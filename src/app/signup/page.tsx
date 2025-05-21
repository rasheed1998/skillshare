'use client';
import { useState } from 'react';
import axios from '../../../lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function Signup() {
  const router = useRouter();
  const { login } = useAuth();

  const [userType, setUserType] = useState<'individual' | 'company'>('individual');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'individual',
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    taxId: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = { ...formData, userType };

      await axios.post('/auth/signup', payload);

      const loginRes = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      login(loginRes.data);

      router.push('/dashboard');
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Signup</h2>

        <div className="flex justify-center gap-4">
          <label>
            <input
              type="radio"
              value="individual"
              checked={userType === 'individual'}
              onChange={() => setUserType('individual')}
            />{' '}
            Individual
          </label>
          <label>
            <input
              type="radio"
              value="company"
              checked={userType === 'company'}
              onChange={() => setUserType('company')}
            />{' '}
            Company
          </label>
        </div>

        {userType === 'individual' ? (
          <>
            <input name="firstName" placeholder="First Name" onChange={handleChange} required className="input" />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} required className="input" />
          </>
        ) : (
          <>
            <input name="companyName" placeholder="Company Name" onChange={handleChange} required className="input" />
            <input name="taxId" placeholder="Business Tax ID" onChange={handleChange} required className="input" />
          </>
        )}

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="input" />
        <input name="phone" placeholder="Phone" onChange={handleChange} required className="input" />
        <input name="address" placeholder="Address" onChange={handleChange} className="input" />

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Signup
        </button>
      </form>
    </div>
  );
}
