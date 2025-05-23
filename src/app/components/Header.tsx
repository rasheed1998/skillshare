'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function Header() {
  const [open, setOpen] = useState('');
  const { auth, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = (key: string) => setOpen(open === key ? '' : key);
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  const handleClose = () => setOpen('');

  // ✅ Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!auth) {
    return (
      <header className="w-full p-4 bg-blue-600 text-white shadow">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-lg font-bold">SkillShare</span>
          <div>
            <Link href="/login" className="mr-4 underline hover:text-gray-300">Login</Link>
            <Link href="/signup" className="underline hover:text-gray-300">Signup</Link>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="w-full p-4 bg-blue-600 text-white shadow">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center" ref={dropdownRef}>
          <span className="mr-5 text-lg font-bold">SkillShare</span>
          <div className="flex gap-6">
            <div className="relative">
              <button onClick={() => toggle('tasks')}>Tasks ▾</button>
              {open === 'tasks' && (
                <ul className="absolute bg-white text-black p-2 rounded shadow space-y-2 z-10 w-[160px]">
                  {/* <li><Link href="/tasks/create" onClick={handleClose}>Create Task</Link></li>
                  <li><Link href="/tasks/update" onClick={handleClose}>Update Task</Link></li>
                  <li><Link href="/tasks/progress" onClick={handleClose}>Update Progress</Link></li>
                  <li><Link href="/tasks/complete" onClick={handleClose}>Mark Complete</Link></li>
                  <li><Link href="/tasks/review-completion" onClick={handleClose}>Review Completion</Link></li> */}
                </ul>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggle('offers')}>Offers ▾</button>
              {open === 'offers' && (
                <ul className="absolute bg-white text-black p-2 rounded shadow space-y-2 z-10 w-[140px]">
                  {/* <li><Link href="/offers/create" onClick={handleClose}>Make Offer</Link></li>
                  <li><Link href="/offers/respond" onClick={handleClose}>Respond to Offer</Link></li> */}
                </ul>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggle('skills')}>Skills ▾</button>
              {open === 'skills' && (
                <ul className="absolute bg-white text-black p-2 rounded shadow space-y-2 z-10 w-[110px]">
                  <li><Link href="/skills/create" onClick={handleClose}>Create Skill</Link></li>
                  <li><Link href="/skills/update" onClick={handleClose}>Update Skill</Link></li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="hover:underline text-sm bg-red-500 px-3 py-1 rounded shadow"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
    