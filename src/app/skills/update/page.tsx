'use client';
import { useState } from 'react';
import axios from '../../../../lib/axios';
import { useAuth } from '../../../../contexts/AuthContext';

export default function UpdateSkill() {
   const { auth } = useAuth();
  const [formData, setFormData] = useState({
    skillId: '',
    category: '',
    experience: '',
    nature: 'online',
    hourlyRate: ''
  });

  if (auth?.role !== 'company') return <p className="text-center mt-8">Only providers can update skills.</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/skills/${formData.skillId}`, {
      category: formData.category,
      experience: formData.experience,
      nature: formData.nature,
      hourlyRate: Number(formData.hourlyRate),
    });
    alert('Skill updated successfully');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Update Skill</h2>
        <input name="skillId" placeholder="Skill ID" onChange={handleChange} required className="input" />
        <input name="category" placeholder="Skill Category" onChange={handleChange} className="input" />
        <input name="experience" placeholder="Experience" onChange={handleChange} className="input" />
        <select name="nature" onChange={handleChange} className="input">
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
        </select>
        <input name="hourlyRate" placeholder="Hourly Rate" onChange={handleChange} className="input" />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}