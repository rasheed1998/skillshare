'use client';
import axios from '../../../../../lib/axios';

export default function CompleteModal({ task, onClose, onSuccess }: any) {
  const handleComplete = async () => {
    try {
      await axios.put(`/tasks/${task.id}/complete`);
      onSuccess();
    } catch (err) {
      alert('Failed to mark complete');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Mark task as completed?</h2>
        <div className="flex justify-between">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={handleComplete} className="bg-green-600 text-white px-4 py-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
}