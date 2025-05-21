'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function UpdateTask() {
  const { auth } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    taskId: '',
    category: '',
    name: '',
    description: '',
    startDate: '',
    hours: '',
    rate: '',
    currency: 'USD',
  });

  if (auth?.role !== 'individual') return <p className="text-center mt-8">Only users can update tasks.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/tasks/${form.taskId}`, {
      category: form.category,
      name: form.name,
      description: form.description,
      startDate: form.startDate,
      hours: Number(form.hours),
      rate: Number(form.rate),
      currency: form.currency,
    });
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Update Task</h2>
      <input name="taskId" onChange={e => setForm({ ...form, taskId: e.target.value })} placeholder="Task ID" required className="input" />
      <input name="category" onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="input" />
      <input name="name" onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Task Name" className="input" />
      <input name="description" onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input" />
      <input type="date" name="startDate" onChange={e => setForm({ ...form, startDate: e.target.value })} className="input" />
      <input name="hours" onChange={e => setForm({ ...form, hours: e.target.value })} placeholder="Working Hours" className="input" />
      <input name="rate" onChange={e => setForm({ ...form, rate: e.target.value })} placeholder="Hourly Rate" className="input" />
      <select name="currency" onChange={e => setForm({ ...form, currency: e.target.value })} className="input">
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="SGD">SGD</option>
        <option value="INR">INR</option>
      </select>
      <button type="submit" className="btn">Update</button>
    </form>
  );
}