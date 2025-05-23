'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../../../../lib/axios';
import { useAuth } from '../../../../../contexts/AuthContext';

export default function CreateTaskModal({ onClose, onSuccess }: any) {
  const { auth } = useAuth();

  if (auth?.role !== 'user') {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Task</h2>
        <Formik
          initialValues={{
            name: '',
            description: '',
            startDate: '',
            hours: 1,
            rate: 10,
            currency: 'USD',
            categoryIds: [], // multi-select to be implemented later
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            startDate: Yup.date().required('Required'),
            hours: Yup.number().min(1).required(),
            rate: Yup.number().min(1).required(),
            currency: Yup.string().required(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('/tasks', values, {
                withCredentials: true,
              });
              onSuccess();
            } catch (err) {
              alert('Failed to create task');
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="name" placeholder="Task Name" className="input" />
              <ErrorMessage name="name" component="div" className="text-sm text-red-500" />

              <Field name="description" placeholder="Description" className="input" />
              <ErrorMessage name="description" component="div" className="text-sm text-red-500" />

              <Field type="date" name="startDate" className="input" />
              <Field type="number" name="hours" placeholder="Hours" className="input" />
              <Field type="number" name="rate" placeholder="Rate" className="input" />

              <Field as="select" name="currency" className="input">
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="SGD">SGD</option>
                <option value="INR">INR</option>
              </Field>

              <div className="flex justify-between">
                <button type="button" onClick={onClose} className="text-gray-600">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
