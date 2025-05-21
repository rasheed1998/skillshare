'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function ReviewCompletion() {
  const { auth } = useAuth();
  const [taskId, setTaskId] = useState('');
  const [action, setAction] = useState<'accepted' | 'rejected'>('accepted');

  if (auth?.role !== 'individual') return <p className="text-center mt-8">Only users can confirm task completion.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/tasks/${taskId}/review-completion`, { status: action });
    alert(`Task completion ${action}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Review Task Completion</h2>
      <input value={taskId} onChange={e => setTaskId(e.target.value)} placeholder="Task ID" required className="input" />
      <select value={action} onChange={e => setAction(e.target.value as 'accepted' | 'rejected')} className="input">
        <option value="accepted">Accept Completion</option>
        <option value="rejected">Reject Completion</option>
      </select>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}