'use client';
import { useEffect, useState } from 'react';
import CreateTaskModal from './modals/CreateTaskModal';
import TaskTable from './TaskTable';

export default function TaskDashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/tasks', {
          method: 'GET',
          credentials: 'include', // ✅ important for cookie-based auth
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError('You are not authorized. Please log in.');
          } else {
            setError(`Error: ${res.status}`);
          }
          setTasks([]);
          return;
        }

        const data = await res.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
        console.error(err);
      }
    };

    fetchTasks();
  }, [reload]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <TaskTable tasks={tasks} onReload={() => setReload(!reload)} />

      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            setReload(!reload);
          }}
        />
      )}
    </div>
  );
}
