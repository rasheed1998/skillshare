'use client';
import { useState } from 'react';

import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function CreateSkill() {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    category: '',
    experience: '',
    nature: 'online',
    hourlyRate: ''
  });

  if (auth?.role !== 'company') return <p className="text-center mt-8">Only providers can create skills.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    try {
      await axios.post('/skills', {
        ...formData,
        providerId: auth.userId,
        hourlyRate: Number(formData.hourlyRate),
      });
  
      alert('Skill created successfully');
      setFormData({ category: '', experience: '', nature: 'online', hourlyRate: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create skill');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Create Skill</h2>
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Skill Category" required className="input" />
        <input name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" required className="input" />
        <select name="nature" value={formData.nature} onChange={handleChange} className="input">
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
        </select>
        <input name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} placeholder="Hourly Rate" required className="input" />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}
