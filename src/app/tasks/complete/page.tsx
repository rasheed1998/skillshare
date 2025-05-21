'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function MarkComplete() {
  const { auth } = useAuth();
  const [taskId, setTaskId] = useState('');

  if (auth?.role !== 'individual') return <p className="text-center mt-8">Only users can mark tasks as completed.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/tasks/${taskId}/complete`);
    alert('Task marked as completed');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Mark Task as Completed</h2>
      <input name="taskId" onChange={e => setTaskId(e.target.value)} placeholder="Task ID" required className="input" />
      <button type="submit" className="btn">Complete Task</button>
    </form>
  );
}