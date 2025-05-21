'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function UpdateProgress() {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    taskId: '',
    progressUpdate: '',
  });

  if (auth?.role !== 'company') return <p className="text-center mt-8">Only providers can update progress.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/tasks/${form.taskId}/progress`, {
      progressUpdate: form.progressUpdate,
    });
    alert('Progress updated');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Update Task Progress</h2>
      <input name="taskId" onChange={e => setForm({ ...form, taskId: e.target.value })} placeholder="Task ID" required className="input" />
      <textarea name="progressUpdate" onChange={e => setForm({ ...form, progressUpdate: e.target.value })} placeholder="Progress Description" required className="input" />
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}
