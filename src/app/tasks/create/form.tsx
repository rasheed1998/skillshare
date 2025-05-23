'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from '../../../../lib/axios';

interface Category {
  id: number;
  name: string;
}

interface CreateTaskFormProps {
  categories: Category[];
  token: string;
}

export default function CreateTaskForm({ categories, token }: CreateTaskFormProps) {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

      <Formik
        initialValues={{
          name: '',
          description: '',
          startDate: '',
          hours: 1,
          rate: 10,
          currency: 'USD',
          categoryIds: [] as string[], // Formik will treat checkboxes as string[]
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          description: Yup.string().required('Required'),
          startDate: Yup.date().required('Required'),
          hours: Yup.number().min(1, 'Must be at least 1 hour').required('Required'),
          rate: Yup.number().min(1, 'Must be at least 1').required('Required'),
          currency: Yup.string().oneOf(['USD', 'AUD', 'SGD', 'INR']).required('Required'),
          categoryIds: Yup.array().min(1, 'Select at least one category').required('Required'),
        })}
        onSubmit={async (values, actions) => {
          try {
            const payload = {
              ...values,
              categoryIds: values.categoryIds.map((id) => Number(id)), // convert to numbers
            };

            await axios.post('/tasks', payload, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            router.push('/dashboard');
          } catch (err) {
            console.error(err);
            alert('Error creating task');
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field name="name" type="text" placeholder="Task Name" className="input" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="description" type="text" placeholder="Description" className="input" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="startDate" type="date" className="input" />
              <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="hours" type="number" placeholder="Hours" className="input" />
              <ErrorMessage name="hours" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="rate" type="number" placeholder="Rate" className="input" />
              <ErrorMessage name="rate" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field as="select" name="currency" className="input">
                <option value="USD">USD</option>
                <option value="AUD">AUD</option>
                <option value="SGD">SGD</option>
                <option value="INR">INR</option>
              </Field>
              <ErrorMessage name="currency" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      name="categoryIds"
                      value={String(cat.id)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
              <ErrorMessage name="categoryIds" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? 'Submitting...' : 'Create Task'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
