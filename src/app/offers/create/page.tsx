'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function CreateOffer() {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    taskId: '',
    proposedRate: '',
  });

  if (auth?.role !== 'company') return <p className="text-center mt-8">Only providers can make offers.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/offers', {
      providerId: auth.userId,
      taskId: Number(form.taskId),
      proposedRate: Number(form.proposedRate),
    });
    alert('Offer submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Make an Offer</h2>
      <input name="taskId" onChange={e => setForm({ ...form, taskId: e.target.value })} placeholder="Task ID" required className="input" />
      <input name="proposedRate" onChange={e => setForm({ ...form, proposedRate: e.target.value })} placeholder="Proposed Rate" required className="input" />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
