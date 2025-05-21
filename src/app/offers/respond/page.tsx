'use client';
import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import axios from '../../../../lib/axios';

export default function RespondToOffer() {
  const { auth } = useAuth();
  const [offerId, setOfferId] = useState('');
  const [action, setAction] = useState<'accepted' | 'rejected'>('accepted');

  if (auth?.role !== 'individual') return <p className="text-center mt-8">Only users can respond to offers.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/offers/${offerId}`, { status: action });
    alert(`Offer ${action}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <h2 className="text-2xl font-semibold">Respond to Offer</h2>
      <input value={offerId} onChange={e => setOfferId(e.target.value)} placeholder="Offer ID" required className="input" />
      <select value={action} onChange={e => setAction(e.target.value as 'accepted' | 'rejected')} className="input">
        <option value="accepted">Accept</option>
        <option value="rejected">Reject</option>
      </select>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
}