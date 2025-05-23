'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import RespondOfferModal from './modals/RespondOfferModal';

export default function OfferTable({ offers, onReload }: any) {
  const [selected, setSelected] = useState(null);
  const { auth } = useAuth();

 

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Task</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Proposed Rate</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {offers.map((offer: any) => (
            <tr key={offer.id}>
              <td className="px-4 py-2">{offer.task?.name || 'N/A'}</td>
              <td className="px-4 py-2 text-center">{offer.status}</td>
              <td className="px-4 py-2 text-center">{offer.proposedRate}</td>
              <td className="px-4 py-2 text-center">
                {offer.status === 'pending' && (
                  <button
                    onClick={() => setSelected(offer)}
                    className="text-blue-600"
                  >
                    Respond
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <RespondOfferModal
          offer={selected}
          onClose={() => setSelected(null)}
          onSuccess={onReload}
        />
      )}
    </div>
  );
}
