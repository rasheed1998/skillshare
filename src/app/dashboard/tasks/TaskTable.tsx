'use client';
import { useState } from 'react';
import UpdateTaskModal from './modals/UpdateTaskModal';
import ProgressModal from './modals/ProgressModal';
import { useAuth } from '../../../../contexts/AuthContext';
import CompleteModal from './modals/CompleteModal';
import ReviewModal from './modals/ReviewModal';

export default function TaskTable({ tasks, onReload }: any) {
  const [modal, setModal] = useState({ type: '', task: null });
  const { auth } = useAuth();

  const handleAction = (type: string, task: any) => {
    if (!type) return;
    setModal({ type, task });
  };

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Hours</th>
            <th className="px-4 py-2 text-center">Rate</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {tasks.map((task: any) => (
            <tr key={task.id}>
              <td className="px-4 py-2">{task.name}</td>
              <td className="px-4 py-2 text-center">{task.status}</td>
              <td className="px-4 py-2 text-center">{task.hours}</td>
              <td className="px-4 py-2 text-center">{task.rate}</td>
              <td className="px-4 py-2 text-center">
                <select
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                  defaultValue=""
                  onChange={(e) => handleAction(e.target.value, task)}
                >
                  <option value="" disabled>
                    -- Select Action --
                  </option>

                  {/* Only users can update, complete, and review */}
                  {auth?.role === 'user' && (
                    <>
                      <option value="update">Update</option>
                      <option value="complete">Mark Complete</option>
                      <option value="review">Review Completion</option>
                    </>
                  )}

                  {/* Only providers can update progress if accepted */}
                  {auth?.role === 'company' && task.status === 'accepted' && (
                    <option value="progress">Update Progress</option>
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal.type === 'update' && (
        <UpdateTaskModal
          task={modal.task}
          onClose={() => setModal({ type: '', task: null })}
          onSuccess={onReload}
        />
      )}
      {modal.type === 'progress' && (
        <ProgressModal
          task={modal.task}
          onClose={() => setModal({ type: '', task: null })}
          onSuccess={onReload}
        />
      )}
      {modal.type === 'complete' && (
        <CompleteModal
          task={modal.task}
          onClose={() => setModal({ type: '', task: null })}
          onSuccess={onReload}
        />
      )}
      {modal.type === 'review' && (
        <ReviewModal
          task={modal.task}
          onClose={() => setModal({ type: '', task: null })}
          onSuccess={onReload}
        />
      )}
    </div>
  );
}
