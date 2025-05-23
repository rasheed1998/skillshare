'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axios from '../../../../lib/axios';

export default function CreateSkillForm({ token }: { token: string }) {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Create Skill</h1>

      <Formik
        initialValues={{
          experience: '',
          nature: 'online',
          hourlyRate: '',
          categoryIds: [],
        }}
        validationSchema={Yup.object({
          experience: Yup.string().required('Required'),
          nature: Yup.string().oneOf(['online', 'onsite']).required(),
          hourlyRate: Yup.number().min(1).required('Required'),
          categoryIds: Yup.array().min(1).required('At least one category is required'),
        })}
        onSubmit={async (values, actions) => {
          try {
            console.log('token',token)
            await axios.post(
              '/skills',
              {
                ...values,
                hourlyRate: Number(values.hourlyRate),
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            router.push('/dashboard');
          } catch (err) {
            alert('Failed to create skill');
            console.error(err);
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-4">
            <Field name="experience" placeholder="Experience" className="input" />
            <ErrorMessage name="experience" component="div" className="text-red-500 text-sm" />

            <Field as="select" name="nature" className="input">
              <option value="online">Online</option>
              <option value="onsite">Onsite</option>
            </Field>

            <Field name="hourlyRate" placeholder="Hourly Rate" className="input" />
            <ErrorMessage name="hourlyRate" component="div" className="text-red-500 text-sm" />

            <div className="block font-medium">Categories</div>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: 1, name: 'Plumbing' }, { id: 2, name: 'Electrical' }, { id: 3, name: 'Cleaning' }].map(cat => (
                <label key={cat.id} className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="categoryIds"
                    value={String(cat.id)}
                    checked={values.categoryIds.includes(cat.id)}
                    onChange={(e: any) => {
                      const id = parseInt(e.target.value);
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setFieldValue('categoryIds', [...values.categoryIds, id]);
                      } else {
                        setFieldValue('categoryIds', values.categoryIds.filter((v: number) => v !== id));
                      }
                    }}
                  />
                  {cat.name}
                </label>
              ))}
            </div>
            <ErrorMessage name="categoryIds" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isSubmitting ? 'Submitting...' : 'Create Skill'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
