'use client';
import { useState, useEffect } from 'react';
import axios from '../../../../../lib/axios';
import { useAuth } from '../../../../../contexts/AuthContext';

export default function ProgressModal({ task, onClose, onSuccess }: any) {
  const [progress, setProgress] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    // Prevent access if not provider
    if (auth?.role !== 'company') {
      alert('Unauthorized: Only providers can update progress');
      onClose();
    }
  }, [auth, onClose]);

  const handleSubmit = async () => {
    if (!progress.trim()) {
      alert('Progress update cannot be empty');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`/tasks/${task.id}/progress`, {
        progressUpdate: progress,
      }, {
        withCredentials: true,
      });
      onSuccess();
    } catch (err) {
      alert('Failed to update progress');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Update Task Progress</h2>
        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Describe current progress..."
          className="input w-full min-h-[100px]"
        />
        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
