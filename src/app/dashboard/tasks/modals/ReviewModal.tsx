'use client';
import axios from '../../../../../lib/axios';

export default function ReviewModal({ task, onClose, onSuccess }: any) {
  const handleReview = async (decision: 'accepted' | 'rejected') => {
    try {
      await axios.put(`/tasks/${task.id}/review-completion`, { status: decision });
      onSuccess();
    } catch (err) {
      alert('Review failed');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Accept or Reject Task Completion?</h2>
        <div className="flex justify-between">
          <button onClick={() => handleReview('rejected')} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
          <button onClick={() => handleReview('accepted')} className="bg-green-600 text-white px-4 py-2 rounded">Accept</button>
        </div>
      </div>
    </div>
  );
}