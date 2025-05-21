'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function CreateTask() {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    category: '',
    name: '',
    description: '',
    startDate: '',
    hours: '',
    rate: '',
    currency: 'USD',
  });

  if (auth?.role !== 'individual') return <p className="text-center mt-8">Only users can create tasks.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/tasks', {
      ...form,
      userId: auth.userId,
      hours: Number(form.hours),
      rate: Number(form.rate),
    });
    alert('tesk created successfully')

  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Create Task</h2>
      <input name="category" onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" required className="input" />
      <input name="name" onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Task Name" required className="input" />
      <input name="description" onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" required className="input" />
      <input type="date" name="startDate" onChange={e => setForm({ ...form, startDate: e.target.value })} required className="input" />
      <input name="hours" onChange={e => setForm({ ...form, hours: e.target.value })} placeholder="Working Hours" required className="input" />
      <input name="rate" onChange={e => setForm({ ...form, rate: e.target.value })} placeholder="Hourly Rate" required className="input" />
      <select name="currency" onChange={e => setForm({ ...form, currency: e.target.value })} className="input">
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="SGD">SGD</option>
        <option value="INR">INR</option>
      </select>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
