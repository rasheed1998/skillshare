'use client';
import { useEffect, useState } from 'react';
import CreateSkillModal from './modals/CreateSkillModal';
import { useAuth } from '../../../../contexts/AuthContext';
import SkillTable from './SkillTable';

export default function SkillsDashboardPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [skills, setSkills] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
   

    const fetchSkills = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch skills');
        }

        const data = await res.json();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError('Error loading skills');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [auth, reload]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Skills</h1>
        {auth?.role === 'company' && (
          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Skill
          </button>
        )}
      </div>

      <SkillTable skills={skills} onReload={() => setReload(!reload)} />

      {showCreate && (
        <CreateSkillModal
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
