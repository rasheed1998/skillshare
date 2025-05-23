'use client';
import { Formik, Form, Field } from 'formik';
import axios from '../../../../../lib/axios';

export default function UpdateTaskModal({ task, onClose, onSuccess }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Task</h2>
        <Formik
          initialValues={{
            name: task.name,
            description: task.description,
            startDate: task.startDate.split('T')[0],
            hours: task.hours,
            rate: task.rate,
            currency: task.currency,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.put(`/tasks/${task.id}`, values);
              onSuccess();
            } catch (err) {
              alert('Update failed');
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="name" placeholder="Task Name" className="input" />
              <Field name="description" placeholder="Description" className="input" />
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
                <button onClick={onClose} type="button" className="text-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
