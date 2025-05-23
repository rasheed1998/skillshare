'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from '../../../../../lib/axios';
import { useAuth } from '../../../../../contexts/AuthContext';

export default function MakeOfferModal({ onClose, onSuccess }: any) {
  const { auth } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    

    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks/provider', {
          withCredentials: true,
        });
        setTasks(res.data);
      } catch (err) {
        console.error('Failed to fetch tasks');
        setError('Could not load tasks');
      }
    };

    fetchTasks();
  }, [auth]);

  if (auth?.role !== 'company') {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Make an Offer</h2>
        <Formik
          initialValues={{
            taskId: '',
            proposedRate: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post(
                '/offers',
                {
                  taskId: parseInt(values.taskId),
                  proposedRate: parseFloat(values.proposedRate),
                },
                {
                  withCredentials: true,
                }
              );
              onSuccess();
            } catch (err) {
              alert('Error submitting offer');
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <label className="block font-medium">Select Task</label>
              <Field as="select" name="taskId" className="input w-full">
                <option value="">-- Choose a Task --</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </Field>

              <label className="block font-medium mt-2">Your Proposed Rate</label>
              <Field
                name="proposedRate"
                type="number"
                placeholder="Hourly Rate"
                className="input w-full"
              />

              <div className="flex justify-between mt-4">
                <button type="button" onClick={onClose} className="text-gray-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? 'Sending...' : 'Send Offer'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
