'use client';
import { useState, useEffect } from 'react';
import MakeOfferModal from './modals/MakeOfferModal';
import { useAuth } from '../../../../contexts/AuthContext';
import OfferTable from './OfferTable';

export default function OffersDashboardPage() {
  const { auth } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [offers, setOffers] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;

    const fetchOffers = async () => {
      try {
        let endpoint = '';
        if (auth.role === 'user') {
          endpoint = '/offers/task'; // You may need to adjust backend to support user-based fetch
        } else if (auth.role === 'provider') {
          endpoint = '/offers/provider/' + auth.userId;
        } else {
          setError('Only users or providers can view offers.');
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch offers');
        const data = await res.json();
        setOffers(data);
        setError('');
      } catch (err) {
        setError('Error loading offers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [auth, reload]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Offers</h1>
        {auth?.role === 'provider' && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Make Offer
          </button>
        )}
      </div>

      <OfferTable offers={offers} onReload={() => setReload(!reload)} />

      {showCreate && auth?.role === 'provider' && (
        <MakeOfferModal
          onClose={() => setShowCreate(false)}
          onSuccess={() => {
            setShowCreate(false);
            setReload(!reload);
          }}
        />
      )}
    </div>
  );
}
