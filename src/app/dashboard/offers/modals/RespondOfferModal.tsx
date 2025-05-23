'use client';
import { useAuth } from '../../../../../contexts/AuthContext';
import axios from '../../../../../lib/axios';

export default function RespondOfferModal({ offer, onClose, onSuccess }: any) {
  const { auth } = useAuth();

  if (auth?.role !== 'user') {
    onClose();
    return null;
  }

  const respond = async (status: 'accepted' | 'rejected') => {
    try {
      await axios.put(`/offers/${offer.id}`, { status }, { withCredentials: true });
      onSuccess();
    } catch (err) {
      alert('Failed to update offer');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold">Respond to Offer</h2>
        <p className="text-sm text-gray-700">
          Task: <strong>{offer.task?.name || 'Unknown Task'}</strong>
        </p>
        <p className="text-sm text-gray-700">
          Proposed Rate: <strong>{offer.proposedRate}</strong>
        </p>

        <div className="flex justify-between pt-4">
          <button
            onClick={() => respond('accepted')}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => respond('rejected')}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
          <button onClick={onClose} className="text-gray-600">Cancel</button>
        </div>
      </div>
    </div>
  );
}
